using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Reflection;
using System.Text.Json;
using System.Threading.Tasks;
using backend.DTOs;
using backend.DTOs.ModuleClassDTO;
using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
// using Newtonsoft.Json;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ModuleClassController : Controller
    {
        public readonly IModuleClassService _moduleClassService;
        public readonly SchoolSystemManagementContext _context;
        public ModuleClassController(IModuleClassService moduleClassService, SchoolSystemManagementContext context)
        {
            _moduleClassService = moduleClassService;
            _context = context;
        }
        // Xem thời khóa biểu, Xem lớp học phần
        [HttpGet]
        public async Task<ActionResult<IEnumerable<GetModuleClassDTO>>> GetModuleClass()
        {
            var moduleClass = await _moduleClassService.GetModuleClassDTOAsync();
            return Ok(moduleClass);
        }
        [HttpPost]
        public async Task<IActionResult> PostModuleClassDTO([FromBody] PostModuleClassDTO dto)
        {
            if (dto == null)
            {
                return BadRequest("DTO is null");
            }

            var result = await _moduleClassService.PostModuleClassDTO(dto);
            if (!result)
            {
                return StatusCode(500, "Failed to create ModuleClassDTO");
            }
            return Ok();
        }
        [HttpPut]
        public async Task<IActionResult> PutModuleClassDTO([FromBody] PutModuleClassDTO dto)
        {
            var result = await _moduleClassService.PutModuleClassDTO(dto);
            if (result)
            {
                return Ok();
            }
            return StatusCode(500, "Failed to update ModuleClassDTO");
        }
        // Đăng kí dạy
        [HttpPut("TeachingRegistration")]
        public async Task<IActionResult> PutModuleClassRegisterAsync([FromBody] RegisterDTO dto)
        {
            if (dto == null)
            {
                return BadRequest("Request body is null.");
            }

            // Kiểm tra module class tồn tại và chưa được đăng ký giảng viên
            var moduleClass = await _context.ModuleClasses
                .FirstOrDefaultAsync(m => m.ModuleClassId == dto.ModuleClassId && m.LecturerId == null);
            if (moduleClass == null)
            {
                return NotFound("Module class not found or already assigned.");
            }

            // // Lấy thông tin lịch học của module class
            var classSchedule = await _context.ClassSchedules
                .FirstOrDefaultAsync(cs => cs.ModuleClassId == dto.ModuleClassId);
            if (classSchedule == null)
            {
                return NotFound("Class schedule not found for the module class.");
            }

            // Kiểm tra trùng lịch với các lớp khác của giảng viên
            var hasConflict = await _context.ClassSchedules
                .Where(cs => cs.ModuleClass.LecturerId == dto.LecturerId) // Lọc các lớp của giảng viên
                .Where(cs => cs.ModuleClassId != dto.ModuleClassId)       // Loại trừ module class hiện tại
                .AnyAsync(cs =>
                    cs.StartDate <= classSchedule.EndDate && cs.EndDate >= classSchedule.StartDate && // Trùng ngày
                    cs.LessonStart <= classSchedule.LessonEnd && cs.LessonEnd >= classSchedule.LessonStart); // Trùng giờ
            if (hasConflict)
            {
                return Conflict("Schedule conflict detected.");
            }

            // Gán LecturerId và lưu thay đổi
            moduleClass.LecturerId = dto.LecturerId;
            await _context.SaveChangesAsync();

            return Ok("Module class successfully assigned to the lecturer.");
        }
        [HttpPut("CancelRegistration")]
        public async Task<IActionResult> PutModuleClassDTOCancelRegistrationAsync([FromBody] RegisterDTO dto)
        {
            if (dto == null)
            {
                return BadRequest();
            }
            var mc = await _context.ModuleClasses
                .FirstOrDefaultAsync(m => m.ModuleClassId == dto.ModuleClassId && m.LecturerId == dto.LecturerId);
            if (mc == null)
            {
                return NotFound();
            }
            mc.LecturerId = null;
            await _context.SaveChangesAsync();
            return Ok();
        }
        [HttpDelete("{moduleClassId}")]
        public async Task<IActionResult> DeleteModuleClassDTO(string moduleClassId)
        {
            if (moduleClassId == null)
            {
                return BadRequest("moduleClassId is null");
            }

            var result = await _moduleClassService.DeleteModuleClassDTO(moduleClassId);
            if (!result)
            {
                return StatusCode(500, "Failed to delete ModuleClassDTO");
            }
            return Ok();
        }
        // [HttpGet("subject")]
        // public async Task<ActionResult<IEnumerable<ModuleClass>>> GetModuleClassesSubject(string? subjectId)
        // {
        //     var today = DateOnly.FromDateTime(DateTime.Now);

        //     var semester = await _context.SemesterPeriods
        //                              .Where(sp => sp.StartDate > today)
        //                              .OrderBy(sp => sp.StartDate)
        //                              .FirstOrDefaultAsync();

        //     var semesterId = semester.SemesterId;
        //     var startDate = semester.StartDate;

        //     var result = await (from mc in _context.ModuleClasses
        //                         join cs in _context.ClassSchedules on mc.ModuleClassId equals cs.ModuleClassId
        //                         join s in _context.Subjects on mc.SubjectId equals s.SubjectId
        //                         join ts in _context.TrainingProgramModuleGroupSubjects on s.SubjectId equals ts.SubjectId
        //                         join l in _context.Lecturers on mc.LecturerId equals l.LecturerId into lecturersGroup
        //                         from l in lecturersGroup.DefaultIfEmpty()
        //                         where (string.IsNullOrEmpty(subjectId) || s.SubjectId == subjectId)
        //                         && mc.SemesterId == semesterId
        //                         && cs.StartDate >= startDate
        //                         select new
        //                         {
        //                             mc.ModuleClassId,
        //                             mc.MaximumNumberOfStudents,
        //                             mc.LecturerId,
        //                             cs.DayOfWeek,
        //                             cs.LessonStart,
        //                             cs.LessonEnd,
        //                             cs.ClassRoomId,
        //                             cs.StartDate,
        //                             cs.EndDate,
        //                             s.SubjectId,
        //                             s.SubjectName,
        //                             s.NumberOfCredit,
        //                             s.SubjectType,
        //                             l.FullName
        //                         }).ToListAsync();

        //     return Ok(result);
        // }

        // [HttpPost]
        // public async Task<IActionResult> PostModuleClass([FromBody] ModuleClass moduleClass)
        // {
        //     foreach (var subjectEntry in moduleClass.SubjectIds)
        //     {
        //         string subjectId = subjectEntry.SubjectId;
        //         int count = subjectEntry.Count;

        //         // Tạo số lượng lớp học phần theo từng môn học
        //         for (int i = 0; i < count; i++)
        //         {
        //             string moduleClassId = _addModuleClassService.GenerateModuleClassId(subjectId);

        //             var newModuleClass = new ModuleClass
        //             {
        //                 ModuleClassId = moduleClassId,
        //                 MaximumNumberOfStudents = moduleClass.MaximumNumberOfStudents,
        //                 LecturerId = null,
        //                 SemesterId = moduleClass.SemesterId,
        //                 SubjectId = subjectId
        //             };

        //             var existingModuleClass = await _context.ModuleClasses
        //                 .FirstOrDefaultAsync(m => m.ModuleClassId == newModuleClass.ModuleClassId);

        //             if (existingModuleClass != null)
        //             {
        //                 return Conflict(new { message = "Xung độ Mã lớp học phần. Vui lòng thử lại." });
        //             }

        //             _context.ModuleClasses.Add(newModuleClass);

        //             foreach (var trainingProgramCourseId in moduleClass.TrainingProgramCourseIds)
        //             {
        //                 var newModuleClassTrainingProgramCourse = new ModuleClassTrainingProgramCourse
        //                 {
        //                     ModuleClassId = moduleClassId,
        //                     TrainingProgramCourseId = trainingProgramCourseId
        //                 };

        //                 _context.ModuleClassTrainingProgramCourses.Add(newModuleClassTrainingProgramCourse);
        //             }

        //             byte daysAWeek = moduleClass.DaysAWeek ?? 1;
        //             byte lessonsPerDay = moduleClass.LessonsPerDay ?? 5;
        //             byte numberOfWeek = moduleClass.NumberOfWeek ?? 10;

        //             var (startDate, endDate) = await _addModuleClassService.GetCurrentSemesterPeriodAsync(moduleClass.SemesterId);
        //             if (!startDate.HasValue || !endDate.HasValue)
        //             {
        //                 return BadRequest("Không tìm thấy thời gian phù hợp.");
        //             }

        //             bool scheduleConflict = false;

        //             // Tạo thời gian biểu cho các lớp học phần
        //             for (int j = 0; j < daysAWeek; j++)
        //             {
        //                 var uniqueSchedule = await _addModuleClassService.FindUniqueSchedule(moduleClass.RoomType, startDate.Value, endDate.Value, numberOfWeek, lessonsPerDay);
        //                 if (uniqueSchedule == null)
        //                 {
        //                     scheduleConflict = true;
        //                     break;
        //                 }

        //                 var newClassSchedule = new ClassSchedule
        //                 {
        //                     ModuleClassId = moduleClassId,
        //                     DayOfWeek = uniqueSchedule.DayOfWeek,
        //                     LessonStart = uniqueSchedule.LessonStart,
        //                     LessonEnd = uniqueSchedule.LessonEnd,
        //                     NumberOfWeek = numberOfWeek,
        //                     StartDate = uniqueSchedule.StartDate,
        //                     EndDate = uniqueSchedule.EndDate,
        //                     ClassRoomId = uniqueSchedule.ClassRoomId
        //                 };

        //                 _context.ClassSchedules.Add(newClassSchedule);
        //             }

        //             if (scheduleConflict)
        //             {
        //                 // Nếu có xung đột lịch học, xóa ModuleClass đã thêm và trả về lỗi
        //                 _context.ModuleClasses.Remove(newModuleClass);
        //                 return BadRequest($"Không thể tạo thời gian biểu cho lớp học phần {moduleClassId}");
        //             }

        //             try
        //             {
        //                 await _context.SaveChangesAsync();
        //             }
        //             catch (DbUpdateException)
        //             {
        //                 // Xử lý trường hợp xung đột khi lưu vào cơ sở dữ liệu
        //                 _context.ModuleClasses.Remove(newModuleClass);
        //                 _context.ClassSchedules.RemoveRange(_context.ClassSchedules.Where(cs => cs.ModuleClassId == moduleClassId));
        //                 _context.ModuleClassTrainingProgramCourses.RemoveRange(_context.ModuleClassTrainingProgramCourses.Where(mc => mc.ModuleClassId == moduleClassId));

        //                 return StatusCode(StatusCodes.Status409Conflict, "Đã có xung đột xảy ra khi lưu dữ liệu. Vui lòng thử lại.");
        //             }
        //         }
        //     }
        //     return Ok(moduleClass);
        // }

        // [HttpPut("edit-moduleclass")]
        // public async Task<IActionResult> UpdateModuleClass([FromBody] ModuleClass moduleClass)
        // {

        //     return Ok();
        // }

        // [HttpPut("delete-LectureId")]
        // public async Task<IActionResult> DeleteLecturerId([FromBody] ModuleClass moduleClass)
        // {
        //     var existingModuleClass = await _context.ModuleClasses
        //         .FirstOrDefaultAsync(mc => mc.ModuleClassId == moduleClass.ModuleClassId);

        //     if (existingModuleClass == null)
        //     {
        //         return NotFound($"Không tìm thấy Mã lớp học phần {existingModuleClass}");
        //     }

        //     existingModuleClass.LecturerId = null;
        //     await _context.SaveChangesAsync();

        //     return Ok(new { message = "Hủy đăng kí giảng dạy thành công." });
        // }
    }
}
