using System;
using System.Collections.Generic;

namespace backend.Models;

public partial class Lecturer
{
    public string LecturerId { get; set; } = null!;

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

    public string? DepartmentId { get; set; }

    public virtual Department? Department { get; set; }

    public virtual Account LecturerNavigation { get; set; } = null!;

    public virtual ICollection<ModuleClass> ModuleClasses { get; set; } = new List<ModuleClass>();

    public virtual ICollection<StudentClass> StudentClasses { get; set; } = new List<StudentClass>();
}
