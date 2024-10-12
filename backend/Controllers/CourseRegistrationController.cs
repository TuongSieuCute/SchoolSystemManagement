using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CourseRegistrationController : Controller
    {
        private readonly SchoolSystemManagementContext _context;

        public CourseRegistrationController(SchoolSystemManagementContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetRegisteredModules(string? studentId)
        {
            var today = DateOnly.FromDateTime(DateTime.Now);

            var query = from cr in _context.CourseRegistrations
                        join mc in _context.ModuleClasses on cr.ModuleClassId equals mc.ModuleClassId
                        join cs in _context.ClassSchedules on mc.ModuleClassId equals cs.ModuleClassId
                        join s in _context.Subjects on mc.SubjectId equals s.SubjectId
                        join st in _context.Students on cr.StudentId equals st.StudentId
                        join l in _context.Lecturers on mc.LecturerId equals l.LecturerId into lecturersGroup
                        from l in lecturersGroup.DefaultIfEmpty()
                        where cs.EndDate >= today
                        select new
                        {
                            cr.StudentId,
                            cr.MidtermGradePercentage,
                            cr.FinalExamGradePercentage,
                            cr.MidtermGrade,
                            cr.FinalExamGrade,
                            cr.AverageGrade10,
                            cr.AverageGrade4,
                            cr.Literacy,
                            cr.IsPass,
                            mc.ModuleClassId,
                            cs.DayOfWeek,
                            cs.LessonStart,
                            cs.LessonEnd,
                            cs.ClassRoomId,
                            cs.StartDate,
                            cs.EndDate,
                            s.SubjectId,
                            s.SubjectName,
                            s.NumberOfCredit,
                            FullNameStudent = st.FullName,
                            l.FullName,
                        };

            if (!string.IsNullOrEmpty(studentId))
            {
                query = query.Where(cr => cr.StudentId == studentId);
            }

            var registeredClasses = await query.ToListAsync();

            return Ok(registeredClasses);
        }

        [HttpPost]
        public async Task<IActionResult> PostCourseRegistration([FromBody] CourseRegistration courseRegistration)
        {
            // Lấy SubjectId của lớp mà sinh viên đang cố gắng đăng ký
            var moduleClass = await _context.ModuleClasses
                .FirstOrDefaultAsync(mc => mc.ModuleClassId == courseRegistration.ModuleClassId);

            if (moduleClass == null)
            {
                return NotFound($"Không tìm thấy lớp học với ID {courseRegistration.ModuleClassId}.");
            }

            // Kiểm tra xem sinh viên đã đăng ký bất kỳ lớp nào thuộc cùng môn học (SubjectId) hay chưa
            var existingRegistration = await (from cr in _context.CourseRegistrations
                                              join mc in _context.ModuleClasses on cr.ModuleClassId equals mc.ModuleClassId
                                              where cr.StudentId == courseRegistration.StudentId &&
                                                    mc.SubjectId == moduleClass.SubjectId
                                              select cr)
                                              .FirstOrDefaultAsync();

            if (existingRegistration != null)
            {
                var classSchedule = await _context.ClassSchedules
                    .FirstOrDefaultAsync(cs => cs.ModuleClassId == courseRegistration.ModuleClassId);

                var today = DateOnly.FromDateTime(DateTime.Now);

                if (classSchedule?.EndDate >= today)
                {
                    return NotFound("Đã đăng kí học phần của môn học này.");
                }
            }

            // Kiểm tra sự xung đột lịch học
            var hasConflict = from cs1 in _context.ClassSchedules
                              where cs1.ModuleClassId == courseRegistration.ModuleClassId
                              && (from cs2 in _context.ClassSchedules
                                  where (from cr in _context.CourseRegistrations
                                         where cr.StudentId == courseRegistration.StudentId
                                         select cr.ModuleClassId)
                                         .Contains(cs2.ModuleClassId)
                                  select cs2)
                                  .Any(cs2 => cs1.DayOfWeek == cs2.DayOfWeek
                                              && (
                                                   (cs1.LessonStart < cs2.LessonEnd && cs1.LessonEnd > cs2.LessonStart)
                                                   || (cs1.LessonStart >= cs2.LessonStart && cs1.LessonStart <= cs2.LessonEnd)
                                                   || (cs1.LessonEnd >= cs2.LessonStart && cs1.LessonEnd <= cs2.LessonEnd)
                                              )
                                              && (cs1.StartDate <= cs2.EndDate && cs1.EndDate >= cs2.StartDate)
                                  )
                              select cs1;

            if (!hasConflict.Any())
            {
                var newCourseRegistration = new CourseRegistration
                {
                    ModuleClassId = courseRegistration.ModuleClassId,
                    StudentId = courseRegistration.StudentId
                };

                _context.CourseRegistrations.Add(newCourseRegistration);
                await _context.SaveChangesAsync();
            }
            else
            {
                return Conflict("Thất bại");
            }

            return Ok();
        }

        [HttpPut]
        public async Task<IActionResult> PutCourseRegistration([FromBody] CourseRegistration courseRegistration)
        {
            var existingCourseRegistration = await _context.CourseRegistrations
                .FirstOrDefaultAsync(cr => cr.ModuleClassId == courseRegistration.ModuleClassId
                                        && cr.StudentId == courseRegistration.StudentId);

            if (existingCourseRegistration == null)
            {
                return NotFound();
            }

            existingCourseRegistration.MidtermGradePercentage = courseRegistration.MidtermGradePercentage;
            existingCourseRegistration.FinalExamGradePercentage = courseRegistration.FinalExamGradePercentage;
            existingCourseRegistration.MidtermGrade = courseRegistration.MidtermGrade;
            existingCourseRegistration.FinalExamGrade = courseRegistration.FinalExamGrade;

            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteCourseRegistration([FromQuery] string studentId, [FromQuery] string moduleClassId)
        {
            var result = await _context.CourseRegistrations
                .FirstOrDefaultAsync(cr => cr.StudentId == studentId && cr.ModuleClassId == moduleClassId);

            if (result == null)
            {
                return NotFound($"Không tìm thấy đăng ký của sinh viên.");
            }

            _context.CourseRegistrations.Remove(result);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}