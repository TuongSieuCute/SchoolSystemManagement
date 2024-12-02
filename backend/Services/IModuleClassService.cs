using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.DTOs;

namespace backend.Services
{
    public interface IModuleClassService
    {
        Task<IEnumerable<ModuleClassDTO>> GetModuleClassDTOAsync();
    }
}