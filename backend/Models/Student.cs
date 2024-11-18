using System;
using System.Collections.Generic;

namespace backend.Models;

public partial class Student
{
    public string StudentId { get; set; } = null!;

    public string? FullName { get; set; }

    public string? StudentClassId { get; set; }

    public virtual ICollection<CourseRegistration> CourseRegistrations { get; set; } = new List<CourseRegistration>();

    public virtual ICollection<CumulativePoint> CumulativePoints { get; set; } = new List<CumulativePoint>();

    public virtual StudentClass? StudentClass { get; set; }

    public virtual ICollection<StudentNotification> StudentNotifications { get; set; } = new List<StudentNotification>();
}
