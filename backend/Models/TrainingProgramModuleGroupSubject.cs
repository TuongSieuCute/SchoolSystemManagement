using System;
using System.Collections.Generic;

namespace backend.Models;

public partial class TrainingProgramModuleGroupSubject
{
    public int? TrainingProgramModuleGroupId { get; set; }

    public string? SubjectId { get; set; }

    public string? SubjectType { get; set; }

    public bool? IsCreditGpa { get; set; }

    public virtual Subject? Subject { get; set; }

    public virtual TrainingProgramModuleGroup? TrainingProgramModuleGroup { get; set; }
}
