using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.DTOs;
using backend.Models;

namespace backend.Services
{
    public interface INotificationsService
    {
        Task<IEnumerable<NotificationsDTO>> GetNotificationsDTOAsync();
        Task<bool> PostNotificationsAsync(Notification notification);
    }
}