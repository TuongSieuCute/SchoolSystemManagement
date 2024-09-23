using System;
using System.Collections.Generic;

namespace backend.Models;

public partial class InstructionalPlan
{
    public string? TrainingProgramCourseId { get; set; }

    public string? SemesterId { get; set; }

    public string? SubjectId { get; set; }

    public virtual Semester? Semester { get; set; }

    public virtual Subject? Subject { get; set; }

    public virtual TrainingProgramCourse? TrainingProgramCourse { get; set; }
}
