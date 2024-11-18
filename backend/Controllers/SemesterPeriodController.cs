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
//     [Route("[controller]")]
//     public class SemesterPeriodController : Controller
//     {
//         private readonly SchoolSystemManagementContext _context;

//         public SemesterPeriodController(SchoolSystemManagementContext context)
//         {
//             _context = context;
//         }

//         [HttpGet]
//         public async Task<ActionResult<IEnumerable<SemesterPeriod>>> GetSemesterPeriod()
//         {
//             var result = await (from sp in _context.SemesterPeriods
//                                 join s in _context.Semesters on sp.SemesterId equals s.SemesterId
//                                 select new
//                                 {
//                                     sp.AcademicYear,
//                                     sp.StartDate,
//                                     sp.EndDate,
//                                     sp.SemesterId,
//                                     s.SemesterName,
//                                 }).ToListAsync();

//             return Ok(result);
//         }
//     }
// }