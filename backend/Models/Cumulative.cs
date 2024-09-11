using System;
using System.Collections.Generic;

namespace backend.Models;

public partial class Cumulative
{
    public int CumulativeId { get; set; }

    public byte? TotalCredit { get; set; }

    public byte? EarnedCredit { get; set; }

    public byte? UnearnedCredit { get; set; }

    public byte? CumulativeCredit { get; set; }

    public decimal? CumulativeGpa { get; set; }

    public string? StudentId { get; set; }

    public string? DepartmentId { get; set; }

    public string? MajorId { get; set; }

    public int? CourseRegistrationId { get; set; }

    public virtual CourseRegistration? CourseRegistration { get; set; }

    public virtual Department? Department { get; set; }

    public virtual Major? Major { get; set; }

    public virtual Student? Student { get; set; }
}
