using System;
using System.Collections.Generic;

namespace backend.Models;

public partial class StudentClass
{
    public string StudentClassId { get; set; } = null!;

    public string? StudentClassName { get; set; }

    public string? LecturerId { get; set; }

    public string? CourseId { get; set; }

    public string? MajorId { get; set; }

    public virtual Course? Course { get; set; }

    public virtual Lecturer? Lecturer { get; set; }

    public virtual Major? Major { get; set; }

    public virtual ICollection<Student> Students { get; set; } = new List<Student>();
}
