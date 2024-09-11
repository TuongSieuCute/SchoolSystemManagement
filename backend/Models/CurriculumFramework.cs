using System;
using System.Collections.Generic;

namespace backend.Models;

public partial class CurriculumFramework
{
    public int CurriculumFrameworkId { get; set; }

    public string? CurriculumFrameworkName { get; set; }

    public byte? TotalNumberOfCredit { get; set; }

    public DateOnly? YearOfPromulgation { get; set; }

    public string? DepartmentId { get; set; }

    public string? MajorId { get; set; }

    public virtual ICollection<CourseCurriculumFramework> CourseCurriculumFrameworks { get; set; } = new List<CourseCurriculumFramework>();

    public virtual ICollection<CurriculumStructureFramework> CurriculumStructureFrameworks { get; set; } = new List<CurriculumStructureFramework>();

    public virtual Department? Department { get; set; }

    public virtual Major? Major { get; set; }
}
