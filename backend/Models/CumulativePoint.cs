using System;
using System.Collections.Generic;

namespace backend.Models;

public partial class CumulativePoint
{
    public int CumulativePointId { get; set; }

    public string? TrainingProgramCourseId { get; set; }

    public string? StudentId { get; set; }

    public byte? TotalCredit { get; set; }

    public byte? CreditPass { get; set; }

    public byte? CreditFall { get; set; }

    public byte? CumulativeCredit { get; set; }

    public decimal? CumulativeAverageGrade10 { get; set; }

    public decimal? CumulativeAverageGrade4 { get; set; }

    public virtual Student? Student { get; set; }

    public virtual TrainingProgramCourse? TrainingProgramCourse { get; set; }
}
