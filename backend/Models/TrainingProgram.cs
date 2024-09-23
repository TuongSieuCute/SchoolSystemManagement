using System;
using System.Collections.Generic;

namespace backend.Models;

public partial class TrainingProgram
{
    public string TrainingProgramId { get; set; } = null!;

    public string? TrainingProgramName { get; set; }

    public string? MajorId { get; set; }

    public virtual Major? Major { get; set; }

    public virtual ICollection<TrainingProgramCourse> TrainingProgramCourses { get; set; } = new List<TrainingProgramCourse>();

    public virtual ICollection<TrainingProgramModuleGroup> TrainingProgramModuleGroups { get; set; } = new List<TrainingProgramModuleGroup>();
}
