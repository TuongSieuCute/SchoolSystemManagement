using System;
using System.Collections.Generic;

namespace backend.Models;

public partial class TuitionRate
{
    public int TuitionRateId { get; set; }

    public decimal? AmountPerCredit { get; set; }

    public virtual ICollection<CourseRegistration> CourseRegistrations { get; set; } = new List<CourseRegistration>();
}
