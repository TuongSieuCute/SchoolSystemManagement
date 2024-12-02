using System;
using System.Collections.Generic;

namespace backend.Models;

public partial class StudentNotification
{
    public int StudentNotificationsId { get; set; }

    public int? NotificationId { get; set; }

    public string? StudentId { get; set; }

    public bool? IsRead { get; set; }

    public DateOnly? ReadAt { get; set; }

    public virtual Notification? Notification { get; set; }

    public virtual Student? Student { get; set; }
}
