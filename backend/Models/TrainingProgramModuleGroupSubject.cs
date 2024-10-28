using System;
using System.Collections.Generic;

namespace backend.Models;

public partial class TrainingProgramModuleGroupSubject
{
    public string? TrainingProgramModuleGroupId { get; set; }

    public string? SubjectId { get; set; }

    public string? SemesterId { get; set; }

    public virtual Semester? Semester { get; set; }

    public virtual Subject? Subject { get; set; }

    public virtual TrainingProgramModuleGroup? TrainingProgramModuleGroup { get; set; }
}
