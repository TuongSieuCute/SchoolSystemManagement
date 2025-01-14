﻿using System;
using System.Collections.Generic;

namespace backend.Models;

public partial class TrainingProgramCourse
{
    public string TrainingProgramCourseId { get; set; } = null!;

    public string? TrainingProgramId { get; set; }

    public string? CourseId { get; set; }

    public virtual Course? Course { get; set; }

    public virtual ICollection<CumulativePoint> CumulativePoints { get; set; } = new List<CumulativePoint>();

    public virtual TrainingProgram? TrainingProgram { get; set; }
}
