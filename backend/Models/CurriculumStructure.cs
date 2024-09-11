using System;
using System.Collections.Generic;

namespace backend.Models;

public partial class CurriculumStructure
{
    public int CurriculumStructureId { get; set; }

    public string? CurriculumStructureName { get; set; }

    public string? DetailCurriculumStructure { get; set; }

    public virtual ICollection<CurriculumStructureFramework> CurriculumStructureFrameworks { get; set; } = new List<CurriculumStructureFramework>();
}
