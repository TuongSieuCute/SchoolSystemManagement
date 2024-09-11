using System;
using System.Collections.Generic;

namespace backend.Models;

public partial class MajorStudent
{
    public int MajorStudentId { get; set; }

    public string? MajorId { get; set; }

    public string? StudentId { get; set; }

    public virtual Major? Major { get; set; }

    public virtual Student? Student { get; set; }
}
