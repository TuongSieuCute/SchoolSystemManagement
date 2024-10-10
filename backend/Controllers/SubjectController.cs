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
    public class SubjectController : Controller
    {
        private readonly SchoolSystemManagementContext _context;

        public SubjectController(SchoolSystemManagementContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetSubjects([FromQuery] string[] trainingProgramCourseIds)
        {
            var query = from tc in _context.TrainingProgramCourses
                        join ip in _context.InstructionalPlans on tc.TrainingProgramCourseId equals ip.TrainingProgramCourseId
                        join s in _context.Subjects on ip.SubjectId equals s.SubjectId
                        where trainingProgramCourseIds.Contains(tc.TrainingProgramCourseId)
                        select new
                        {
                            s.SubjectId,
                            s.SubjectName
                        };

            var result = await query.GroupBy(q => new
            {
                q.SubjectId,
            })
            .Select(g => g.First())
            .ToListAsync();

            return Ok(result);
        }
    }
}