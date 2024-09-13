using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StudentController : Controller
    {
        private readonly SchoolSystemManagementContext _context;

        public StudentController(SchoolSystemManagementContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Student>>> GetStudents()
        {
            try
            {
                var students = await _context.Students.ToListAsync();
                return Ok(students);
            }
            catch (Exception ex)
            {

                return StatusCode(500, new { error = "Có lỗi xảy ra", details = ex.Message });
            }
        }

        [HttpGet("{studentId}")]
        public async Task<ActionResult<Student>> GetStudentById(string studentId)
        {
            try
            {
                var student = await _context.Students.FindAsync(studentId);

                if (student == null)
                {
                    return NotFound();
                }

                return Ok(student); 
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = "Có lỗi xảy ra", details = ex.Message });
            }
        }
    }
}