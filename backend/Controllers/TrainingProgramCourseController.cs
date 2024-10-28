// using System;
// using System.Collections.Generic;
// using System.Diagnostics;
// using System.Linq;
// using System.Threading.Tasks;
// using backend.Models;
// using Microsoft.AspNetCore.Mvc;
// using Microsoft.EntityFrameworkCore;
// using Microsoft.Extensions.Logging;

// namespace backend.Controllers
// {
//     [ApiController]
//     [Route("api/[controller]")]
//     public class TrainingProgramCourseController : Controller
//     {
//         private readonly SchoolSystemManagementContext _context;
//         public TrainingProgramCourseController(SchoolSystemManagementContext context)
//         {
//             _context = context;
//         }

//         [HttpGet]
//         public async Task<ActionResult<IEnumerable<TrainingProgramCourse>>> GetTrainingProgramCourses()
//         {
//             var trainingProgramCourse = await _context.TrainingProgramCourses.ToListAsync();
//             return Ok(trainingProgramCourse);
//         }
//     }
// }