using System;
using System.Collections.Generic;

namespace backend.Models;

public partial class Department
{
    public string DepartmentId { get; set; } = null!;

    public string? DepartmentName { get; set; }

    public virtual ICollection<Cumulative> Cumulatives { get; set; } = new List<Cumulative>();

    public virtual ICollection<CurriculumFramework> CurriculumFrameworks { get; set; } = new List<CurriculumFramework>();

    public virtual ICollection<DepartmentStudent> DepartmentStudents { get; set; } = new List<DepartmentStudent>();

    public virtual ICollection<DepartmentTeacher> DepartmentTeachers { get; set; } = new List<DepartmentTeacher>();

    public virtual ICollection<Major> Majors { get; set; } = new List<Major>();

    public virtual ICollection<Subject> Subjects { get; set; } = new List<Subject>();
}
