using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.DTOs;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Services
{
    public class CumulativeService : ICumulativeService
    {
        private readonly SchoolSystemManagementContext _context;
        public CumulativeService(SchoolSystemManagementContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<CumulativeDTO>> GetCumulativeDTOAsync()
        {
            var result = await (from s in _context.Students
                                join cp in _context.CumulativePoints on s.StudentId equals cp.StudentId
                                join tc in _context.TrainingProgramCourses on cp.TrainingProgramCourseId equals tc.TrainingProgramCourseId
                                join t in _context.TrainingPrograms on tc.TrainingProgramId equals t.TrainingProgramId
                                select new CumulativeDTO
                                {
                                    StudentId = s.StudentId,
                                    FullName = s.FullName,
                                    TrainingProgramCourseId = tc.TrainingProgramCourseId,
                                    TrainingProgramName = t.TrainingProgramName,
                                    TotalCredit = cp.TotalCredit,
                                    CreditPass = cp.CreditPass,
                                    CreditFall = cp.CreditFall,
                                    CumulativeCredit = cp.CumulativeCredit,
                                    CumulativeAverageGrade10 = cp.CumulativeAverageGrade10,
                                    CumulativeAverageGrade4 = cp.CumulativeAverageGrade4
                                }).ToListAsync();
            return result;
        }
    }
}