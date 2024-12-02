using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using backend.DTOs;
using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CourseRegistrationController : Controller
    {
        private readonly ICourseRegistrationService _courseRegistrationService;

        public CourseRegistrationController(ICourseRegistrationService courseRegistrationService)
        {
            _courseRegistrationService = courseRegistrationService;
        }
        // Xem điểm từng môn, Xem điểm trung bình tích lũy, Xem học phí
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CourseRegistrationDTO>>> GetCourseRegistration()
        {
            var courseRegistration = await _courseRegistrationService.GetCourseRegistrationDTOAsync();
            return Ok(courseRegistration);
        }
        // Đăng kí học phần (sinh viên)
        [HttpPost]
        public async Task<IActionResult> PostCourseRegistrationDTOAsync([FromBody] CourseRegistrationDTO dto)
        {
            if (dto == null || string.IsNullOrEmpty(dto.ModuleClassId) || string.IsNullOrEmpty(dto.StudentId))
            {
                return BadRequest();
            }
            var result = await _courseRegistrationService.PostCourseRegistrationDTOAsync(dto);
            if (!result)
            {
                return StatusCode(500, "Failed to create CourseRegistrationDTO");
            }

            return Ok();
        }
        // Cập nhật điểm (giảng viên)
        [HttpPut]
        public async Task<IActionResult> PutCourseRegistrationDTOAsync([FromBody] CourseRegistrationDTO dto)
        {
            if (dto == null)
            {
                return BadRequest();
            }
            var result = await _courseRegistrationService.PutCourseRegistrationDTOAsync(dto);
            if (result)
            {
                return Ok();
            }
            return StatusCode(500, "Failed to update CourseRegistrationDTO");
        }
        // Hủy đăng kí học phần (sinh viên)
        [HttpDelete]
        public async Task<IActionResult> DeleteCourseRegistrationDTOAsync([FromBody] CourseRegistrationDTO dto)
        {
            if (dto == null || string.IsNullOrEmpty(dto.ModuleClassId) || string.IsNullOrEmpty(dto.StudentId))
            {
                return BadRequest();
            }
            var result = await _courseRegistrationService.DeleteCourseRegistrationDTOAsync(dto.ModuleClassId, dto.StudentId);
            if (result)
            {
                return Ok();
            }
            return StatusCode(500, "Failed to delete CourseRegistrationDTO");
        }
        // [HttpGet]
        // public async Task<IActionResult> GetRegisteredModules(string? studentId)
        // {
        //     var query = from cr in _context.CourseRegistrations
        //                 join mc in _context.ModuleClasses on cr.ModuleClassId equals mc.ModuleClassId
        //                 join cs in _context.ClassSchedules on mc.ModuleClassId equals cs.ModuleClassId
        //                 join s in _context.Subjects on mc.SubjectId equals s.SubjectId
        //                 join tms in _context.TrainingProgramModuleGroupSubjects on s.SubjectId equals tms.SubjectId
        //                 join tm in _context.TrainingProgramModuleGroups on tms.TrainingProgramModuleGroupId equals tm.TrainingProgramModuleGroupId
        //                 join t in _context.TrainingPrograms on tm.TrainingProgramId equals t.TrainingProgramId
        //                 join st in _context.Students on cr.StudentId equals st.StudentId
        //                 join l in _context.Lecturers on mc.LecturerId equals l.LecturerId into lecturersGroup
        //                 from l in lecturersGroup.DefaultIfEmpty()
        //                 select new
        //                 {
        //                     cr.StudentId,
        //                     cr.MidtermGradePercentage,
        //                     cr.FinalExamGradePercentage,
        //                     cr.MidtermGrade,
        //                     cr.FinalExamGrade,
        //                     cr.AverageGrade10,
        //                     cr.AverageGrade4,
        //                     cr.Literacy,
        //                     cr.IsPass,
        //                     mc.ModuleClassId,
        //                     cs.DayOfWeek,
        //                     cs.LessonStart,
        //                     cs.LessonEnd,
        //                     cs.ClassRoomId,
        //                     cs.StartDate,
        //                     cs.EndDate,
        //                     s.SubjectId,
        //                     s.SubjectName,
        //                     s.NumberOfCredit,
        //                     s.IsCreditGpa,
        //                     FullNameStudent = st.FullName,
        //                     t.TrainingProgramId,
        //                     t.TrainingProgramName,
        //                     l.FullName,
        //                 };

        //     if (!string.IsNullOrEmpty(studentId))
        //     {
        //         query = query.Where(cr => cr.StudentId == studentId);
        //     }

        //     var registeredClasses = await query.ToListAsync();

        //     return Ok(registeredClasses);
        // }
    }
}