using System;
using System.Collections.Generic;

namespace backend.Models;

public partial class SemesterPeriod
{
    public int SemesterPeriodId { get; set; }

    public string? AcademicYear { get; set; }

    public DateOnly? StartDate { get; set; }

    public DateOnly? EndDate { get; set; }

    public string? SemesterId { get; set; }

    public virtual Semester? Semester { get; set; }
}
