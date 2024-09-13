using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using backend.Helper;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;

namespace backend.Controllers
{
    [Route("[controller]")]
    public class AccountController : Controller
    {
        private readonly IConfiguration _configuration;
        private readonly SchoolSystemManagementContext _context;
        private readonly HashPassword _hashPassword;

        public AccountController(IConfiguration configuration, SchoolSystemManagementContext context)
        {
            _configuration = configuration;
            _context = context;
            _hashPassword = new HashPassword();
        }

        [HttpPost("login")]
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

        [HttpPost("changePassword")]
        public async Task<IActionResult> ChangePassword([FromBody] Account account)
        {
            try
            {
                var username = await _context.Accounts
                    .FirstOrDefaultAsync(a => a.UserName == account.UserName);

                if (username == null || username.IsActive != true)
                {
                    return Unauthorized();
                }

                string currentHashedPassword = _hashPassword.ComputeSha256Hash(account.PasswordHash);
                if (username.PasswordHash != currentHashedPassword)
                {
                    return Unauthorized();
                }

                if (string.IsNullOrEmpty(account.NewPassword))
                {
                    return BadRequest();
                }

                string newHashedPassword = _hashPassword.ComputeSha256Hash(account.NewPassword);
                username.PasswordHash = newHashedPassword;

                await _context.SaveChangesAsync();

                return Ok(new { message = "Đổi mật khẩu thành công" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = "Đã xảy ra lỗi", details = ex.Message });
            }
        }
    }
}