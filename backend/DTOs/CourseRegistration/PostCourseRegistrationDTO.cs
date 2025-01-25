using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.DTOs.CourseRegistration
{
    public class PostCourseRegistrationDTO
    {
        public string? StudentId { get; set; }
        public string? ModuleClassId { get; set; }
    }
}