using System;
using System.Collections.Generic;

namespace backend.Models;

public partial class CumulativePoint
{
    public string CumulativePointId { get; set; } = null!;

    public byte? UnearnedCredit { get; set; }

    public byte? CumulativeCredit { get; set; }

    public decimal? CumulativeGpa { get; set; }

    public string? StudentId { get; set; }

    public virtual ICollection<CourseRegistration> CourseRegistrations { get; set; } = new List<CourseRegistration>();

    public virtual Student? Student { get; set; }
}
