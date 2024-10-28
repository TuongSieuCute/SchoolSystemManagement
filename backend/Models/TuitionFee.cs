using System;
using System.Collections.Generic;

namespace backend.Models;

public partial class TuitionFee
{
    public string TuitionFeesId { get; set; } = null!;

    public decimal? AmountPerCredit { get; set; }

    public virtual ICollection<CourseRegistration> CourseRegistrations { get; set; } = new List<CourseRegistration>();
}
