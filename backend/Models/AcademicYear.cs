using System;
using System.Collections.Generic;

namespace backend.Models;

public partial class AcademicYear
{
    public string AcademicYearId { get; set; } = null!;

    public string? AcademicYearName { get; set; }

    public DateOnly? Year { get; set; }

    public virtual ICollection<CourseCurriculumFramework> CourseCurriculumFrameworks { get; set; } = new List<CourseCurriculumFramework>();

    public virtual ICollection<ModuleClass> ModuleClasses { get; set; } = new List<ModuleClass>();

    public virtual ICollection<Student> Students { get; set; } = new List<Student>();
}
