using System;
using System.Collections.Generic;

namespace backend.Models;

public partial class ModuleClass
{
    public string ModuleClassId { get; set; } = null!;

    public byte? MaximumNumberOfStudents { get; set; }

    public string? LecturerId { get; set; }

    public string? SubjectId { get; set; }

    public virtual ICollection<ClassSchedule> ClassSchedules { get; set; } = new List<ClassSchedule>();

    public virtual ICollection<CourseRegistration> CourseRegistrations { get; set; } = new List<CourseRegistration>();

    public virtual Lecturer? Lecturer { get; set; }

    public virtual Subject? Subject { get; set; }
}
