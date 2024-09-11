using System;
using System.Collections.Generic;

namespace backend.Models;

public partial class CurriculumStructureFramework
{
    public int CurriculumStructureFrameworkId { get; set; }

    public byte? TotalTypeCredit { get; set; }

    public int? CurriculumStructureId { get; set; }

    public int? CurriculumFrameworkId { get; set; }

    public virtual CurriculumFramework? CurriculumFramework { get; set; }

    public virtual CurriculumStructure? CurriculumStructure { get; set; }

    public virtual ICollection<TeachingPlan> TeachingPlans { get; set; } = new List<TeachingPlan>();
}
