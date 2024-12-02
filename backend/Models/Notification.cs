using System;
using System.Collections.Generic;

namespace backend.Models;

public partial class Notification
{
    public int NotificationsId { get; set; }

    public string? Title { get; set; }

    public string? Content { get; set; }

    public DateOnly? CreatedAt { get; set; }

    public virtual ICollection<StudentNotification> StudentNotifications { get; set; } = new List<StudentNotification>();
}
