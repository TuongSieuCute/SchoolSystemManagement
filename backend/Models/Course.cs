using System;
using System.Collections.Generic;

namespace backend.Models;

public partial class Course
{
    public string CourseId { get; set; } = null!;

    public string? CourseName { get; set; }

    public string? AcademicYear { get; set; }

    public virtual ICollection<StudentClass> StudentClasses { get; set; } = new List<StudentClass>();

    public virtual ICollection<TrainingProgramCourse> TrainingProgramCourses { get; set; } = new List<TrainingProgramCourse>();
}
