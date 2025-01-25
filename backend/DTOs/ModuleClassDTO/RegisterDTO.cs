using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace backend.DTOs.ModuleClassDTO
{
    public class RegisterDTO
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int CourseRegistrationId { get; set; }
        public string? ModuleClassId { get; set; }
        public string? LecturerId { get; set; }
    }
}