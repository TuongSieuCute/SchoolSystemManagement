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

        [HttpPost]
        public async Task<IActionResult> PostCourseRegistration([FromBody] CourseRegistration courseRegistration)
        {
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
    }
}