using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using backend.DTOs;
using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class NotificationsController : Controller
    {
        public readonly INotificationsService _notificationsService;
        public NotificationsController(INotificationsService notificationsService)
        {
            _notificationsService = notificationsService;
        }
        // Xem thông báo
        [HttpGet]
        public async Task<ActionResult<IEnumerable<NotificationsDTO>>> GetNotifications()
        {
            var notifications = await _notificationsService.GetNotificationsDTOAsync();
            return Ok(notifications);
        }
        [HttpPost]
        public async Task<IActionResult> PostNotificationsAsync([FromBody] Notification notification)
        {
            if (notification == null)
            {
                return BadRequest();
            }

            var result = await _notificationsService.PostNotificationsAsync(notification);
            if (!result)
            {
                return StatusCode(500);
            }
            return Ok();
        }
    }
}