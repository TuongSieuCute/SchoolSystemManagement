using System;
using System.Collections.Generic;

namespace backend.Models;

public partial class Department
{
    public string DepartmentId { get; set; } = null!;

    public string? DepartmentName { get; set; }

    public virtual ICollection<Lecturer> Lecturers { get; set; } = new List<Lecturer>();

    public virtual ICollection<Major> Majors { get; set; } = new List<Major>();
}
