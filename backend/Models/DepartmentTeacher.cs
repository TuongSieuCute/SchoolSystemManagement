using System;
using System.Collections.Generic;

namespace backend.Models;

public partial class DepartmentTeacher
{
    public int DepartmentTeacherId { get; set; }

    public string? DepartmentId { get; set; }

    public string? TeacherId { get; set; }

    public virtual Department? Department { get; set; }

    public virtual Teacher? Teacher { get; set; }
}
