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
            var query = from A in _context.AcademicYears
            join S in _context.Students on A.AcademicYearId equals S.AcademicYearId
            join CS in _context.CurriculumFrameworkStudents on S.StudentId equals CS.StudentId
            join CL in _context.ClassStudents on S.ClassStudentId equals CL.ClassStudentId
            join M in _context.Majors on CL.MajorId equals M.MajorId
            join T in _context.Teachers on CL.TeacherId equals T.TeacherId
            join D in _context.Departments on M.DepartmentId equals D.DepartmentId
            where S.StudentId == studentId
            select new
            {
                AcademicYearName = A.AcademicYearName,
                Year = A.Year,
                CurriculumFrameworkId1 = CS.CurriculumFrameworkId1,
                CurriculumFrameworkId2 = CS.CurriculumFrameworkId2,
                ClassStudentId = CL.ClassStudentId,
                FullName = T.FullName,
                MajorName = M.MajorName,
                DepartmentName = D.DepartmentName
            };

            if (query == null)
            {
                return NotFound();
            }

            return Ok(query);
        }

    }
}