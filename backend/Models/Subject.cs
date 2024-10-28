using System;
using System.Collections.Generic;

namespace backend.Models;

public partial class Subject
{
    public string SubjectId { get; set; } = null!;

    public string? SubjectName { get; set; }

    public byte? NumberOfCredit { get; set; }

    public string? SubjectType { get; set; }

    public bool? IsCreditGpa { get; set; }

    public virtual ICollection<ModuleClass> ModuleClasses { get; set; } = new List<ModuleClass>();
}
