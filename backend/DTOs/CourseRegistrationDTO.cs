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
        public DateOnly? StartDateModuleClass { get; set; }
        public string? AcademicYear { get; set; }
        public DateOnly? StartDateSemester { get; set; }
        public DateOnly? EndDateSemester { get; set; }
        public string? SemesterId { get; set; }
        public string? SemesterName { get; set; }
        public string? SubjectId { get; set; }
        public string? SubjectName { get; set; }
        public byte? NumberOfCredit { get; set; }
        public decimal? Total { get; set; }
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