using System;
using System.Collections.Generic;

namespace backend.Models;

public partial class Major
{
    public string MajorId { get; set; } = null!;

    public string? MajorName { get; set; }

    public string? DepartmentId { get; set; }

    public virtual ICollection<ClassStudent> ClassStudents { get; set; } = new List<ClassStudent>();

    public virtual ICollection<CourseCurriculumFramework> CourseCurriculumFrameworks { get; set; } = new List<CourseCurriculumFramework>();

    public virtual ICollection<Cumulative> Cumulatives { get; set; } = new List<Cumulative>();

    public virtual ICollection<CurriculumFramework> CurriculumFrameworks { get; set; } = new List<CurriculumFramework>();

    public virtual Department? Department { get; set; }

    public virtual ICollection<MajorStudent> MajorStudents { get; set; } = new List<MajorStudent>();

    public virtual ICollection<MajorTeacher> MajorTeachers { get; set; } = new List<MajorTeacher>();

    public virtual ICollection<ModuleClass> ModuleClasses { get; set; } = new List<ModuleClass>();
}
