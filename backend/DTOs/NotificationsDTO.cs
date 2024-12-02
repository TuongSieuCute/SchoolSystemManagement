using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.DTOs
{
    public class NotificationsDTO
    {
        public string? Title { get; set; }
        public string? Content { get; set; }
        public DateOnly? CreatedAt { get; set; }
        public string? StudentId { get; set; }
        public bool? IsRead { get; set; }
        public DateOnly? ReadAt { get; set; } 
    }
}