using System;
using System.Collections.Generic;

namespace backend.Models;

public partial class Major
{
    public string MajorId { get; set; } = null!;

    public string? MajorName { get; set; }

    public string? DepartmentId { get; set; }

    public virtual Department? Department { get; set; }

    public virtual ICollection<StudentClass> StudentClasses { get; set; } = new List<StudentClass>();

    public virtual ICollection<TrainingProgram> TrainingPrograms { get; set; } = new List<TrainingProgram>();
}
