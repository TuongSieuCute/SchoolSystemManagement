using System;
using System.Collections.Generic;

namespace backend.Models;

public partial class Semester
{
    public int SemesterId { get; set; }

    public string? SemesterName { get; set; }

    public virtual ICollection<ModuleClass> ModuleClasses { get; set; } = new List<ModuleClass>();

    public virtual ICollection<TeachingPlan> TeachingPlans { get; set; } = new List<TeachingPlan>();
}
