using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Models;

namespace backend.DTOs
{
    public class ModuleClassDTO
    {
        public string? ModuleClassId { get; set; }
        public byte? MaximumNumberOfStudents { get; set; }
        public string? LecturerId { get; set; }
        public string? FullName { get; set; }
        public string? SubjectId { get; set; }
        public string? SubjectName { get; set; }
        public string? DayOfWeek { get; set; } 
        public byte? LessonStart { get; set; }
        public byte? LessonEnd { get; set; }
        public byte? NumberOfWeek { get; set; }
        public DateOnly? StartDate { get; set; }
        public DateOnly? EndDate { get; set; }
        public string? ClassRoomId { get; set; }
        public string? RomeType { get; set; }
    }
}