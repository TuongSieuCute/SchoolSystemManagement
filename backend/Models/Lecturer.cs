using System;
using System.Collections.Generic;

namespace backend.Models;

public partial class Lecturer
{
    public string LecturerId { get; set; } = null!;

    public string? FullName { get; set; }

    public string? DepartmentId { get; set; }

    public virtual Department? Department { get; set; }

    public virtual ICollection<ModuleClass> ModuleClasses { get; set; } = new List<ModuleClass>();

    public virtual ICollection<StudentClass> StudentClasses { get; set; } = new List<StudentClass>();
}
