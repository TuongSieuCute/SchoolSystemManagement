using System;
using System.Collections.Generic;

namespace backend.Models;

public partial class ModuleClass
{
    public string ModuleClassId { get; set; } = null!;

    public byte? Capacity { get; set; }

    public byte? Enrollment { get; set; }

    public string? AcademicYearId { get; set; }

    public int? SemesterId { get; set; }

    public string? MajorId { get; set; }

    public string? SubjectId { get; set; }

    public string? TeacherId { get; set; }

    public virtual AcademicYear? AcademicYear { get; set; }

    public virtual ICollection<CourseRegistration> CourseRegistrations { get; set; } = new List<CourseRegistration>();

    public virtual Major? Major { get; set; }

    public virtual Semester? Semester { get; set; }

    public virtual Subject? Subject { get; set; }

    public virtual Teacher? Teacher { get; set; }

    public virtual ICollection<TimeTable> TimeTables { get; set; } = new List<TimeTable>();
}
