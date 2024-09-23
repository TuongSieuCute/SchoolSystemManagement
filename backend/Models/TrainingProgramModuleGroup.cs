using System;
using System.Collections.Generic;

namespace backend.Models;

public partial class TrainingProgramModuleGroup
{
    public int TrainingProgramModuleGroupId { get; set; }

    public byte? NumberOfElectiveCredits { get; set; }

    public string? TrainingProgramId { get; set; }

    public string? ModuleGroupId { get; set; }

    public virtual ModuleGroup? ModuleGroup { get; set; }

    public virtual TrainingProgram? TrainingProgram { get; set; }
}
