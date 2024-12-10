using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.DTOs
{
    public class SemesterDTO
    {
        public string? SemesterId { get; set; }
        public string? SemesterName { get; set; }
        public string? AcademicYear { get; set; }
        public DateOnly? StartDate { get; set; }
        public DateOnly? EndDate { get; set; }
    }
}