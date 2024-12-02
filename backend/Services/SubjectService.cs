using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.DTOs;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Services
{
    public class SubjectService : ISubjectService
    {
        private readonly SchoolSystemManagementContext _context;
        public SubjectService(SchoolSystemManagementContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<SubjectDTO>> GetSubjectDTOByStudentIdAsync(string studentId)
        {
            var result = await (from c in _context.CumulativePoints
                                join tc in _context.TrainingProgramCourses on c.TrainingProgramCourseId equals tc.TrainingProgramCourseId
                                join t in _context.TrainingPrograms on tc.TrainingProgramId equals t.TrainingProgramId
                                join tm in _context.TrainingProgramModuleGroups on t.TrainingProgramId equals tm.TrainingProgramId
                                join tms in _context.TrainingProgramModuleGroupSubjects on tm.TrainingProgramModuleGroupId equals tms.TrainingProgramModuleGroupId
                                join su in _context.Subjects on tms.SubjectId equals su.SubjectId
                                join se in _context.Semesters on tms.SemesterId equals se.SemesterId
                                join m in _context.ModuleGroups on tm.ModuleGroupId equals m.ModuleGroupId
                                where c.StudentId == studentId
                                select new SubjectDTO
                                {   
                                    StudentId = c.StudentId,
                                    SubjectId = su.SubjectId,
                                    SubjectName = su.SubjectName,
                                    NumberOfCredit = su.NumberOfCredit,
                                    SubjectType = su.SubjectType,
                                    IsCreditGpa = su.IsCreditGpa,
                                    TrainingProgramName = t.TrainingProgramName,
                                    TrainingProgramModuleGroupId = tm.TrainingProgramModuleGroupId,
                                    NumberOfElectiveCredits = tm.NumberOfElectiveCredits,
                                    SemesterId = se.SemesterId,
                                    SemesterName = se.SemesterName
                                }).ToListAsync();
            return result;     
        }
    }
}