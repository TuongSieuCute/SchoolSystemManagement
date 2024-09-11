using System;
using System.Collections.Generic;

namespace backend.Models;

public partial class ClassRoom
{
    public string ClassRoomId { get; set; } = null!;

    public string? Sector { get; set; }

    public string? Floor { get; set; }

    public virtual ICollection<TimeTable> TimeTables { get; set; } = new List<TimeTable>();
}
