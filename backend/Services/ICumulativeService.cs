using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.DTOs;

namespace backend.Services
{
    public interface ICumulativeService
    {
        Task<IEnumerable<CumulativeDTO>> GetCumulativeDTOAsync();
    }
}