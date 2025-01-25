using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.DTOs
{
    public class CourseRegistrationDTO
    {
        public decimal? MidtermGradePercentage { get; set; }
        public decimal? FinalExamGradePercentage { get; set; }
        public decimal? MidtermGrade { get; set; }
        public decimal? FinalExamGrade { get; set; }
        public decimal? AverageGrade10 { get; set; }
        public decimal? AverageGrade4 { get; set; }
        public string? Literacy { get; set; }
        public bool? IsPass { get; set; }
        public string? StudentId { get; set; }
        public string? FullName { get; set; }
        public string? ModuleClassId { get; set; }
        public DateOnly? StartDate { get; set; }
        public DateOnly? EndDate { get; set; }
        public string? SubjectId { get; set; }
        public string? SubjectName { get; set; }
        public byte? NumberOfCredit { get; set; }
        public bool? IsCreditGpa { get; set; }
        public decimal? Total { get; set; }
        public string? TrainingProgramCourseId { get; set; }
        public string? MajorName { get; set; }
        public string? TrainingProgramName { get; set; }
    }
}