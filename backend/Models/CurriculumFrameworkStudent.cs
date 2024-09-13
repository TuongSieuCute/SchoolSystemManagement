using System;
using System.Collections.Generic;

namespace backend.Models;

public partial class CurriculumFrameworkStudent
{
    public int CurriculumFrameworkStudentId { get; set; }

    public string? CurriculumFrameworkId1 { get; set; }

    public string? CurriculumFrameworkId2 { get; set; }

    public string? StudentId { get; set; }

    public virtual CurriculumFramework? CurriculumFrameworkId1Navigation { get; set; }

    public virtual CurriculumFramework? CurriculumFrameworkId2Navigation { get; set; }

    public virtual Student? Student { get; set; }
}
