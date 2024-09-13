using System;
using System.Collections.Generic;

namespace backend.Models;

public partial class Teacher
{
    public string TeacherId { get; set; } = null!;

    public string? FullName { get; set; }

    public string? UrlImage { get; set; }

    public DateOnly? DateOfBirth { get; set; }

    public string? PlaceOfBirth { get; set; }

    public bool? Gender { get; set; }

    public string? EthnicGroup { get; set; }

    public string? CitizenIdentification { get; set; }

    public string? Religion { get; set; }

    public string? Country { get; set; }

    public string? StateProvince { get; set; }

    public string? DistrictCounty { get; set; }

    public string? WardCommune { get; set; }

    public string? PhoneNumber { get; set; }

    public virtual ICollection<ClassStudent> ClassStudents { get; set; } = new List<ClassStudent>();

    public virtual ICollection<DepartmentTeacher> DepartmentTeachers { get; set; } = new List<DepartmentTeacher>();

    public virtual ICollection<MajorTeacher> MajorTeachers { get; set; } = new List<MajorTeacher>();

    public virtual ICollection<ModuleClass> ModuleClasses { get; set; } = new List<ModuleClass>();

    public virtual ICollection<SubjectTeacher> SubjectTeachers { get; set; } = new List<SubjectTeacher>();

    public virtual Account TeacherNavigation { get; set; } = null!;
}
