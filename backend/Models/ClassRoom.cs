using System;
using System.Collections.Generic;

namespace backend.Models;

public partial class ClassRoom
{
    public string ClassRoomId { get; set; } = null!;

    public string? Sector { get; set; }

    public string? Floor { get; set; }

    public string? RoomType { get; set; }

    public byte? Capacity { get; set; }

    public virtual ICollection<ClassSchedule> ClassSchedules { get; set; } = new List<ClassSchedule>();
}
