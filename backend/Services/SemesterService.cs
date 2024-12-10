using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.DTOs;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Services
{
    public class SemesterService : ISemesterService
    {
        private readonly SchoolSystemManagementContext _context;
        public SemesterService(SchoolSystemManagementContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<SemesterDTO>> GetSemesterDTOAsync()
        {
            var result = await (from s in _context.Semesters
                                join sp in _context.SemesterPeriods on s.SemesterId equals sp.SemesterId                              
                                select new SemesterDTO
                                {
                                    SemesterId = s.SemesterId,
                                    SemesterName = s.SemesterName,
                                    AcademicYear = sp.AcademicYear,
                                    StartDate = sp.StartDate,
                                    EndDate = sp.EndDate
                                }).ToListAsync();

            return result;
        }
    }
}