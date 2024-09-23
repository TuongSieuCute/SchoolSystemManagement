using System;
using System.Collections.Generic;

namespace backend.Models;

public partial class TuitionFee
{
    public string TuitionFeeId { get; set; } = null!;

    public decimal? AmountPerCredit { get; set; }
}
