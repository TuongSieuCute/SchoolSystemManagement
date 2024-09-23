using System;
using System.Collections.Generic;

namespace backend.Models;

public partial class Student
{
    public string StudentId { get; set; } = null!;

    public string? FullName { get; set; }

    public string? UrlImage { get; set; }

    public DateOnly? DateOfBirth { get; set; }

    public string? PlaceOfBirth { get; set; }

    public bool? Gender { get; set; }

    public string? EthnicGroup { get; set; }

    public string? CitizenIdentification { get; set; }

    public string? Religion { get; set; }

    public bool? UnionParty { get; set; }

    public string? TypeStudent { get; set; }

    public string? AcademicStatus { get; set; }

    public string? Country { get; set; }

    public string? StateProvince { get; set; }

    public string? DistrictCounty { get; set; }

    public string? WardCommune { get; set; }

    public string? PhoneNumber { get; set; }

    public string? StudentClassId { get; set; }

    public virtual ICollection<CourseRegistration> CourseRegistrations { get; set; } = new List<CourseRegistration>();

    public virtual ICollection<CumulativePoint> CumulativePoints { get; set; } = new List<CumulativePoint>();

    public virtual StudentClass? StudentClass { get; set; }

    public virtual Account StudentNavigation { get; set; } = null!;
}
