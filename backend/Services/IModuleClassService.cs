using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.DTOs;
using backend.DTOs.ModuleClassDTO;
using backend.Models;

namespace backend.Services
{
    public interface IModuleClassService
    {
        Task<IEnumerable<GetModuleClassDTO>> GetModuleClassDTOAsync();
        Task<bool> PostModuleClassDTO(PostModuleClassDTO dto);
        Task<bool> PutModuleClassDTO(PutModuleClassDTO dto);
        Task<bool> PutModuleClassDTORegisterAsync(GetModuleClassDTO dto);
        Task<bool> PutModuleClassDTOCancelRegistrationAsync(PutModuleClassDTO dto);
        Task<bool> DeleteModuleClassDTO(string moduleClassId);
    }
}