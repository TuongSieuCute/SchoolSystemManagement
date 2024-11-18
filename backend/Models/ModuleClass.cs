using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

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

    [NotMapped]
    public byte? DaysAWeek { get; set; }

    [NotMapped]
    public byte? LessonsPerDay { get; set; }
    
    [NotMapped]
    public byte? NumberOfWeek { get; set; }

    [NotMapped]
    public string? RoomType { get; set; }

    [NotMapped]
    public List<SubjectEntry> SubjectIds { get; set; } = new List<SubjectEntry>();

    [NotMapped]
    public List<string>? TrainingProgramCourseIds { get; set; } = new List<string>();
}

public class SubjectEntry 
{
    public string SubjectId { get; set; }
    public int Count { get; set; }
}
