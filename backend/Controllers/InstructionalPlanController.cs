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
    [ApiController]
    [Route("api/[controller]")]
    public class InstructionalPlanController : Controller
    {
        private readonly SchoolSystemManagementContext _context;

        public InstructionalPlanController(SchoolSystemManagementContext context)
        {
            _context = context;
        }

        [HttpGet("{studentId}")]
        public IActionResult GetInstructionalPlan(string studentId)
        {
            var query = from s in _context.Students
                        join i in _context.InstructionalPlans on s.StudentId equals studentId
                        join se in _context.Semesters on i.SemesterId equals se.SemesterId
                        join su in _context.Subjects on i.SubjectId equals su.SubjectId
                        join tms in _context.TrainingProgramModuleGroupSubjects on su.SubjectId equals tms.SubjectId
                        select new
                        {
                            se.SemesterName,
                            su.SubjectId,
                            su.SubjectName,
                            su.NumberOfCredit,
                            tms.SubjectType,
                            tms.IsCreditGpa,
                            i.TrainingProgramCourseId,
                            s.FullName
                        };

            if (query == null)
            {
                return NotFound();
            }

            return Ok(query);
        }
    }
}