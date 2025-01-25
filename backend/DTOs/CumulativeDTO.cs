using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.DTOs
{
    public class CumulativeDTO
    {
        public string? StudentId { get; set; }
        public string? FullName { get; set; }
        public string? TrainingProgramCourseId { get; set; }
        public string? TrainingProgramName { get; set; }
        public byte? TotalCredit { get; set; }
        public byte? CreditPass { get; set; }
        public byte? CreditFall { get; set; }
        public byte? CumulativeCredit { get; set; }
        public decimal? CumulativeAverageGrade10 { get; set; }
        public decimal? CumulativeAverageGrade4 { get; set; }
    }
}