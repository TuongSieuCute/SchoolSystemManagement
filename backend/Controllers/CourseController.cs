using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    public class CourseController : Controller
    {
        private readonly SchoolSystemManagementContext _context;

        public CourseController(SchoolSystemManagementContext context)
        {
            _context = context;
        }

        [HttpGet("{studentId}")]
        public IActionResult GetCourse(string studentId)
        {
            var query = from tcs in _context.TrainingProgramCourseStudents
                        join sc in _context.StudentClasses on tcs.StudentId equals studentId
                        join c in _context.Courses on sc.CourseId equals c.CourseId
                        join l in _context.Lecturers on sc.LecturerId equals l.LecturerId
                        join m in _context.Majors on sc.MajorId equals m.MajorId
                        join d in _context.Departments on m.DepartmentId equals d.DepartmentId
                        select new
                        {
                            c.CourseName,
                            c.AcademicYear,
                            tcs.TrainingProgramCourseId,
                            sc.StudentClassId,
                            l.FullName,
                            m.MajorName,
                            d.DepartmentName
                        };

            if (query == null)
            {
                return NotFound();
            }

            return Ok(query);
        }

    }
}