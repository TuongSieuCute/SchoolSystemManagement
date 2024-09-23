using System;
using System.Collections.Generic;

namespace backend.Models;

public partial class ModuleGroup
{
    public string ModuleGroupId { get; set; } = null!;

    public string? ModuleGroupName { get; set; }

    public string? ModuleTypeId { get; set; }

    public virtual ModuleType? ModuleType { get; set; }

    public virtual ICollection<TrainingProgramModuleGroup> TrainingProgramModuleGroups { get; set; } = new List<TrainingProgramModuleGroup>();
}
