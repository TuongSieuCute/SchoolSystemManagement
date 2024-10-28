using System;
using System.Collections.Generic;

namespace backend.Models;

public partial class CumulativePoint
{
    public string CumulativePointId { get; set; } = null!;

    public byte? TotalCredit { get; set; }

    public byte? CreditPass { get; set; }

    public byte? CreditFall { get; set; }

    public byte? CumulativeCredit { get; set; }

    public decimal? CumulativeAverageGrade10 { get; set; }

    public decimal? CumulativeAverageGrade4 { get; set; }

    public virtual Student CumulativePointNavigation { get; set; } = null!;
}
