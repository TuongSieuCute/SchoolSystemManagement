using System;
using System.Collections.Generic;

namespace backend.Models;

public partial class ClassSchedule
{
    public int ScheduleId { get; set; }

    public string? ModuleClassId { get; set; }

    public string? DayOfWeek { get; set; }

    public byte? LessonStart { get; set; }

    public byte? LessonEnd { get; set; }

    public byte? NumberOfWeek { get; set; }

    public DateOnly? StartDate { get; set; }

    public DateOnly? EndDate { get; set; }

    public string? ClassRoomId { get; set; }

    public virtual ClassRoom? ClassRoom { get; set; }

    public virtual ModuleClass? ModuleClass { get; set; }
}
