using System;
using System.Collections.Generic;

namespace backend.Models;

public partial class MajorTeacher
{
    public int MajorTeacherId { get; set; }

    public string? MajorId { get; set; }

    public string? TeacherId { get; set; }

    public virtual Major? Major { get; set; }

    public virtual Teacher? Teacher { get; set; }
}
