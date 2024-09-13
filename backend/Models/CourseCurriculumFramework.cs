using System;
using System.Collections.Generic;

namespace backend.Models;

public partial class CourseCurriculumFramework
{
    public int CourseCurriculumFrameworkId { get; set; }

    public string? AcademicYearId { get; set; }

    public string? CurriculumFrameworkId { get; set; }

    public string? MajorId { get; set; }

    public virtual AcademicYear? AcademicYear { get; set; }

    public virtual CurriculumFramework? CurriculumFramework { get; set; }

    public virtual Major? Major { get; set; }
}
