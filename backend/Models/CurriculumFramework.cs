using System;
using System.Collections.Generic;

namespace backend.Models;

public partial class CurriculumFramework
{
    public string CurriculumFrameworkId { get; set; } = null!;

    public string? CurriculumFrameworkName { get; set; }

    public byte? TotalNumberOfCredit { get; set; }

    public DateOnly? YearOfPromulgation { get; set; }

    public string? DepartmentId { get; set; }

    public string? MajorId { get; set; }

    public virtual ICollection<CourseCurriculumFramework> CourseCurriculumFrameworks { get; set; } = new List<CourseCurriculumFramework>();

    public virtual ICollection<CurriculumFrameworkStudent> CurriculumFrameworkStudentCurriculumFrameworkId1Navigations { get; set; } = new List<CurriculumFrameworkStudent>();

    public virtual ICollection<CurriculumFrameworkStudent> CurriculumFrameworkStudentCurriculumFrameworkId2Navigations { get; set; } = new List<CurriculumFrameworkStudent>();

    public virtual ICollection<CurriculumStructureFramework> CurriculumStructureFrameworks { get; set; } = new List<CurriculumStructureFramework>();

    public virtual Department? Department { get; set; }

    public virtual Major? Major { get; set; }
}
