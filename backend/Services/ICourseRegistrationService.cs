using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.DTOs;

namespace backend.Services
{
    public interface ICourseRegistrationService
    {
        Task<IEnumerable<CourseRegistrationDTO>> GetCourseRegistrationDTOAsync();
        Task<bool> PutCourseRegistrationDTOAsync(CourseRegistrationDTO dto);
        Task<bool> DeleteCourseRegistrationDTOAsync(string moduleClassId, string studentId);
    }
}