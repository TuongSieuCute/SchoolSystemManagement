using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using backend.Helper;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System.Linq;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LoginController : Controller
    {
        private readonly IConfiguration _configuration;
        private readonly SchoolSystemManagementContext _context;
        private readonly HashPassword _hashPassword;

        public LoginController(IConfiguration configuration, SchoolSystemManagementContext context)
        {
            _configuration = configuration;
            _context = context;
            _hashPassword = new HashPassword();
        }

        [HttpPost]
        public async Task<IActionResult> Login([FromBody] Account account)
        {
            try
            {
                var username = await _context.Accounts
                    .FirstOrDefaultAsync(a => a.UserName == account.UserName);

                if (username == null || username.IsActive != true)
                {
                    return Unauthorized();
                }

                string hashedPassword = _hashPassword.ComputeSha256Hash(account.PasswordHash);

                if (username.PasswordHash != hashedPassword)
                {
                    return Unauthorized();
                }

                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
                var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

                // Tạo claims cho token
                var claims = new[]
                {
                    new Claim(JwtRegisteredClaimNames.Sub, username.UserName),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    new Claim(ClaimTypes.Role, username.Role),
                    new Claim("username", username.UserName),
                    new Claim("role", username.Role)
                };

                // Tạo JWT token
                var token = new JwtSecurityToken(
                    issuer: _configuration["Jwt:Issuer"],
                    audience: _configuration["Jwt:Audience"],
                    claims: claims,
                    expires: DateTime.Now.AddMinutes(30),
                    signingCredentials: creds
                );

                return Ok(new
                {
                    message = "Đăng nhập thành công",
                    token = new JwtSecurityTokenHandler().WriteToken(token),
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = "Có lỗi xảy ra", details = ex.Message });
            }
        }
    }
}