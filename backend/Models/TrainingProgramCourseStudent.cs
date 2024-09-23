using System;
using System.Collections.Generic;

namespace backend.Models;

public partial class TrainingProgramCourseStudent
{
    public string? TrainingProgramCourseId { get; set; }

    public string? StudentId { get; set; }

    public virtual Student? Student { get; set; }

    public virtual TrainingProgramCourse? TrainingProgramCourse { get; set; }
}
