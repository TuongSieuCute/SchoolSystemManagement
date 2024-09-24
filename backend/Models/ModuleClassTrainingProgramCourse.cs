using System;
using System.Collections.Generic;

namespace backend.Models;

public partial class ModuleClassTrainingProgramCourse
{
    public int ModuleClassTrainingProgramCourseId { get; set; }

    public string? ModuleClassId { get; set; }

    public string? TrainingProgramCourseId { get; set; }

    public virtual ModuleClass? ModuleClass { get; set; }

    public virtual TrainingProgramCourse? TrainingProgramCourse { get; set; }
}
