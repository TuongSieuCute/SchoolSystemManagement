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
    [Route("api/[controller]")]
    public class CumulativeController : Controller
    {
        private readonly ICumulativeService _cumulativeService;
        public CumulativeController(ICumulativeService cumulativeService)
        {
            _cumulativeService = cumulativeService;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CumulativeDTO>>> GetCumulativeDTO()
        {
            var cumulatives = await _cumulativeService.GetCumulativeDTOAsync();
            return Ok(cumulatives);
        }
    }
}