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
            var query = from tcs in _context.TrainingProgramCourseStudents
                        join tc in _context.TrainingProgramCourses on tcs.TrainingProgramCourseId equals tc.TrainingProgramCourseId
                        join t in _context.TrainingPrograms on tc.TrainingProgramId equals t.TrainingProgramId
                        join tm in _context.TrainingProgramModuleGroups on t.TrainingProgramId equals tm.TrainingProgramId
                        join tms in _context.TrainingProgramModuleGroupSubjects on tm.TrainingProgramModuleGroupId equals tms.TrainingProgramModuleGroupId
                        join su in _context.Subjects on tms.SubjectId equals su.SubjectId
                        join se in _context.Semesters on tms.SemesterId equals se.SemesterId
                        join m in _context.ModuleGroups on tm.ModuleGroupId equals m.ModuleGroupId
                        where tcs.StudentId == studentId
                        select new
                        {
                            t.TrainingProgramName,
                            se.SemesterId,
                            se.SemesterName,
                            su.SubjectId, 
                            su.SubjectName,
                            su.NumberOfCredit,
                            su.SubjectType,
                            su.IsCreditGpa,
                            tm.TrainingProgramModuleGroupId,
                            tm.NumberOfElectiveCredits,
                            m.ModuleGroupId
                        };

            if (query == null)
            {
                return NotFound();
            }

            return Ok(query);
        }
    }
}