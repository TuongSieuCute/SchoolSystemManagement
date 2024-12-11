using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using backend.DTOs;
using backend.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace backend.Controllers
{
    [Route("[controller]")]
    public class SemesterController : Controller
    {
        public readonly ISemesterService _semesterService;
        public SemesterController(ISemesterService semesterService)
        {
            _semesterService = semesterService;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SemesterDTO>>> GetSemesterDTOAsync()
        {
            var semester = await _semesterService.GetSemesterDTOAsync();
            return Ok(semester);
        }
    }
}