using System;
using System.Collections.Generic;

namespace backend.Models;

public partial class SubjectTeacher
{
    public int SubjectTeacherId { get; set; }

    public string? SubjectId { get; set; }

    public string? TeacherId { get; set; }

    public virtual Subject? Subject { get; set; }

    public virtual Teacher? Teacher { get; set; }
}
