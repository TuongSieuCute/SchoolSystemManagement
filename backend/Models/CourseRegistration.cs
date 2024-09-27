using System;
using System.Collections.Generic;

namespace backend.Models;

public partial class CourseRegistration
{
    public int CourseRegistrationId { get; set; }

    public decimal? MidtermGradePercentage { get; set; }

    public decimal? FinalExamGradePercentage { get; set; }

    public decimal? MidtermGrade { get; set; }

    public decimal? FinalExamGrade { get; set; }

    public decimal? AverageGrade10 { get; set; }

    public decimal? AverageGrade4 { get; set; }

    public string? Literacy { get; set; }

    public bool? IsPass { get; set; }

    public string? StudentId { get; set; }

    public string? ModuleClassId { get; set; }

    public string? CumulativePointId { get; set; }

    public virtual CumulativePoint? CumulativePoint { get; set; }

    public virtual ModuleClass? ModuleClass { get; set; }

    public virtual Student? Student { get; set; }
}
