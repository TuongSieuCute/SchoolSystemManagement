using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.DTOs;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Services
{
    public class NotificationsService : INotificationsService
    {
        private readonly SchoolSystemManagementContext _context;
        public NotificationsService(SchoolSystemManagementContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<NotificationsDTO>> GetNotificationsDTOAsync()
        {
            var result = await (from n in _context.Notifications
                            join sn in _context.StudentNotifications on n.NotificationsId equals sn.NotificationId
                            select new NotificationsDTO
                            {
                                Title = n.Title,
                                Content = n.Content,
                                CreatedAt = n.CreatedAt,
                                StudentId = sn.StudentId,
                                IsRead = sn.IsRead,
                                ReadAt = sn.ReadAt,
                            }).ToListAsync();

            return result;
        }
    }
}