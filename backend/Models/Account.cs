using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models;

public partial class Account
{
    public string UserName { get; set; } = null!;

    public string? PasswordHash { get; set; }

    public string? Role { get; set; }

    public bool? IsActive { get; set; }

    public string? Email { get; set; }

    public virtual Student? Student { get; set; }

    public virtual Teacher? Teacher { get; set; }

    [NotMapped]
    public string? NewPassword { get; set; }
}
