using System;
using System.Collections.Generic;

namespace backend.Models;

public partial class ModuleType
{
    public string ModuleTypeId { get; set; } = null!;

    public string? ModuleTypeName { get; set; }

    public virtual ICollection<ModuleGroup> ModuleGroups { get; set; } = new List<ModuleGroup>();
}
