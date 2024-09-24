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
                    catch (DbUpdateException)
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

        [HttpPut]
        public async Task<IActionResult> UpdateLecturerId([FromBody] ModuleClass moduleClass)
        {
            var existingModuleClass = await _context.ModuleClasses
                .FirstOrDefaultAsync(mc => mc.ModuleClassId == moduleClass.ModuleClassId);

            if (existingModuleClass == null)
            {
                return NotFound($"Không tìm thấy Mã lớp học phần {existingModuleClass}");
            }

            if (existingModuleClass.LecturerId != null)
            {
                return BadRequest("Không thể đăng kí dạy học do đã có giảng viên.");
            }

            // Kiểm tra sự xung đột lịch học
            var hasConflict = await _context.ClassSchedules
                .Where(cs1 => cs1.ModuleClassId == moduleClass.ModuleClassId)
                .AnyAsync(cs1 => _context.ClassSchedules
                    .Where(cs2 => _context.ModuleClasses
                        .Where(innerMc => innerMc.LecturerId == moduleClass.LecturerId)
                        .Select(innerMc => innerMc.ModuleClassId)
                        .Contains(cs2.ModuleClassId))
                    .Any(cs2 => cs1.DayOfWeek == cs2.DayOfWeek &&
                        ((cs1.LessonStart < cs2.LessonEnd && cs1.LessonEnd > cs2.LessonStart) ||
                        (cs1.LessonStart >= cs2.LessonStart && cs1.LessonStart <= cs2.LessonEnd) ||
                        (cs1.LessonEnd >= cs2.LessonStart && cs1.LessonEnd <= cs2.LessonEnd)) &&
                        (cs1.StartDate <= cs2.EndDate && cs1.EndDate >= cs2.StartDate)));

            if (hasConflict)
            {
                return Conflict("Không thể đăng kí giảng dạy do trùng lịch dạy.");
            }

            existingModuleClass.LecturerId = moduleClass.LecturerId;
            await _context.SaveChangesAsync();

            return Ok(new { message = "Đăng kí giảng dạy thành công" });
        }
    }
}