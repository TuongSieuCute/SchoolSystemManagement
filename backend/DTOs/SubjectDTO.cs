using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.DTOs
{
    public class SubjectDTO
    {
        public string? StudentId { get; set; }
        public string? SubjectId { get; set; }
        public string? SubjectName { get; set; }
        public byte? NumberOfCredit { get; set; }
        public string? SubjectType { get; set; }
        public bool? IsCreditGpa { get; set; }
        public string? TrainingProgramName { get; set; }
        public string TrainingProgramModuleGroupId { get; set; } = null!;
        public byte? NumberOfElectiveCredits { get; set; }
        public string? SemesterId { get; set; }
        public string? SemesterName { get; set; }
    }
}