using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ModuleClassController : Controller
    {
        private readonly SchoolSystemManagementContext _context;
        private readonly AddModuleClassService _addModuleClassService;

        public ModuleClassController(SchoolSystemManagementContext context, AddModuleClassService addModuleClassService)
        {
            _context = context;
            _addModuleClassService = addModuleClassService;
        }

        [HttpPost]
        public async Task<IActionResult> PostModuleClass([FromBody] ModuleClass moduleClass)
        {
            foreach (var subjectEntry in moduleClass.SubjectIds)
            {
                string subjectId = subjectEntry.SubjectId;
                int count = subjectEntry.Count;

                // Tạo số lượng lớp học phần theo từng môn học
                for (int i = 0; i < count; i++)
                {
                    string moduleClassId = _addModuleClassService.GenerateModuleClassId(subjectId);

                    var newModuleClass = new ModuleClass
                    {
                        ModuleClassId = moduleClassId,
                        MaximumNumberOfStudents = moduleClass.MaximumNumberOfStudents,
                        LecturerId = null,
                        SemesterId = moduleClass.SemesterId,
                        SubjectId = subjectId
                    };

                    var existingModuleClass = await _context.ModuleClasses
                        .FirstOrDefaultAsync(m => m.ModuleClassId == newModuleClass.ModuleClassId);

                    if (existingModuleClass != null)
                    {
                        return Conflict(new { message = "Xung độ Mã lớp học phần. Vui lòng thử lại." });
                    }

                    _context.ModuleClasses.Add(newModuleClass);

                    foreach (var trainingProgramCourseId in moduleClass.TrainingProgramCourseIds)
                    {
                        var newModuleClassTrainingProgramCourse = new ModuleClassTrainingProgramCourse
                        {
                            ModuleClassId = moduleClassId,
                            TrainingProgramCourseId = trainingProgramCourseId
                        };

                        _context.ModuleClassTrainingProgramCourses.Add(newModuleClassTrainingProgramCourse);
                    }

                    byte daysAWeek = moduleClass.DaysAWeek ?? 1;
                    byte lessonsPerDay = moduleClass.LessonsPerDay ?? 5;
                    byte numberOfWeek = moduleClass.NumberOfWeek ?? 10;

                    var (startDate, endDate) = await _addModuleClassService.GetCurrentSemesterPeriodAsync(moduleClass.SemesterId);
                    if (!startDate.HasValue || !endDate.HasValue)
                    {
                        return BadRequest("Không tìm thấy thời gian phù hợp.");
                    }

                    bool scheduleConflict = false;

                    // Tạo thời gian biểu cho các lớp học phần
                    for (int j = 0; j < daysAWeek; j++)
                    {
                        var uniqueSchedule = await _addModuleClassService.FindUniqueSchedule(moduleClass.RoomType, startDate.Value, endDate.Value, numberOfWeek, lessonsPerDay);
                        if (uniqueSchedule == null)
                        {
                            scheduleConflict = true;
                            break;
                        }

                        var newClassSchedule = new ClassSchedule
                        {
                            ModuleClassId = moduleClassId,
                            DayOfWeek = uniqueSchedule.DayOfWeek,
                            LessonStart = uniqueSchedule.LessonStart,
                            LessonEnd = uniqueSchedule.LessonEnd,
                            NumberOfWeek = numberOfWeek,
                            StartDate = uniqueSchedule.StartDate,
                            EndDate = uniqueSchedule.EndDate,
                            ClassRoomId = uniqueSchedule.ClassRoomId
                        };

                        _context.ClassSchedules.Add(newClassSchedule);
                    }

                    if (scheduleConflict)
                    {
                        // Nếu có xung đột lịch học, xóa ModuleClass đã thêm và trả về lỗi
                        _context.ModuleClasses.Remove(newModuleClass);
                        return BadRequest($"Không thể tạo thời gian biểu cho lớp học phần {moduleClassId}");
                    }

                    try
                    {
                        await _context.SaveChangesAsync();
                    }
                    catch (DbUpdateException ex)
                    {
                        // Xử lý trường hợp xung đột khi lưu vào cơ sở dữ liệu
                        _context.ModuleClasses.Remove(newModuleClass);
                        _context.ClassSchedules.RemoveRange(_context.ClassSchedules.Where(cs => cs.ModuleClassId == moduleClassId));
                        _context.ModuleClassTrainingProgramCourses.RemoveRange(_context.ModuleClassTrainingProgramCourses.Where(mc => mc.ModuleClassId == moduleClassId));

                        return StatusCode(StatusCodes.Status409Conflict, "Đã có xung đột xảy ra khi lưu dữ liệu. Vui lòng thử lại.");
                    }
                }
            }
            return Ok(moduleClass);
        }

        [HttpPut("{moduleClassId}")]
        public async Task<IActionResult> UpdateLecturerId(string moduleClassId, [FromBody] ModuleClass moduleClass)
        {
            var existingModuleClass = await _context.ModuleClasses.FindAsync(moduleClassId);
            if (existingModuleClass == null)
            {
                return NotFound();
            }

            // Lấy LecturerId mới
            var newLecturerId = moduleClass.LecturerId;

            // Kiểm tra tính duy nhất của ClassSchedule
            var count = await _context.ClassSchedules
                .CountAsync(c => c.ModuleClassId != moduleClassId &&
                                 _context.ModuleClasses.Any(m => m.ModuleClassId == c.ModuleClassId && m.LecturerId == newLecturerId) &&
                                 c.DayOfWeek == _context.ClassSchedules
                                     .Where(cs => cs.ModuleClassId == moduleClassId)
                                     .Select(cs => cs.DayOfWeek)
                                     .FirstOrDefault() &&
                                 c.LessonStart == _context.ClassSchedules
                                     .Where(cs => cs.ModuleClassId == moduleClassId)
                                     .Select(cs => cs.LessonStart)
                                     .FirstOrDefault() &&
                                 c.LessonEnd == _context.ClassSchedules
                                     .Where(cs => cs.ModuleClassId == moduleClassId)
                                     .Select(cs => cs.LessonEnd)
                                     .FirstOrDefault());

            if (count > 0)
            {
                return BadRequest("Duplicate ClassSchedule entries found for the new LecturerId.");
            }

            // Cập nhật LecturerId
            existingModuleClass.LecturerId = newLecturerId;
            _context.ModuleClasses.Update(existingModuleClass);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ModuleClassExists(moduleClassId))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        private bool ModuleClassExists(string id)
        {
            return _context.ModuleClasses.Any(e => e.ModuleClassId == id);
        }
    }
}