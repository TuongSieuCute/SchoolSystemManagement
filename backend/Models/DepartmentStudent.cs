using System;
using System.Collections.Generic;

namespace backend.Models;

public partial class DepartmentStudent
{
    public int DepartmentStudentId { get; set; }

    public string? DepartmentId { get; set; }

    public string? StudentId { get; set; }

    public virtual Department? Department { get; set; }

    public virtual Student? Student { get; set; }
}
