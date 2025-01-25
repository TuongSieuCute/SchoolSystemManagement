using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.DTOs
{
    public class PostModuleClassDTO
    {
        public List<SubjectDataDTO> subjectDataDTO { get; set; } = new List<SubjectDataDTO>();
        public byte NumberOfWeeks { get; set; }
        public byte NumberOfDaysAWeek { get; set; }
        public byte NumberOfLessons { get; set; }
        public byte MaximumNumberOfStudents { get; set; }
        public string? RoomType { get; set; }
    }
}