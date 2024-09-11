using System;
using System.Collections.Generic;

namespace backend.Models;

public partial class TeachingPlan
{
    public int TeachingPlan1 { get; set; }

    public bool? CreditGpa { get; set; }

    public bool? TypeSubject { get; set; }

    public int? SemesterId { get; set; }

    public string? SubjectId { get; set; }

    public int? CurriculumStructureFrameworkId { get; set; }

    public virtual CurriculumStructureFramework? CurriculumStructureFramework { get; set; }

    public virtual Semester? Semester { get; set; }

    public virtual Subject? Subject { get; set; }
}
