using System;
using System.Collections.Generic;

namespace backend.Models;

public partial class Semester
{
    public string SemesterId { get; set; } = null!;

    public string? SemesterName { get; set; }

    public virtual ICollection<ModuleClass> ModuleClasses { get; set; } = new List<ModuleClass>();

    public virtual ICollection<SemesterPeriod> SemesterPeriods { get; set; } = new List<SemesterPeriod>();
}
