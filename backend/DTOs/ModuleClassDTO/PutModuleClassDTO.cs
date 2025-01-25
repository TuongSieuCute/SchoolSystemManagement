using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.DTOs.ModuleClassDTO
{
    public class PutModuleClassDTO
    {
        public string? ModuleClassId { get; set; }
        public byte? MaximumNumberOfStudents { get; set; }
        public string? DayOfWeek { get; set; } 
        public byte? LessonStart { get; set; }
        public byte? LessonEnd { get; set; }
        public DateOnly? StartDate { get; set; }
        public DateOnly? EndDate { get; set; }
        public string? ClassRoomId { get; set; }
    }
}