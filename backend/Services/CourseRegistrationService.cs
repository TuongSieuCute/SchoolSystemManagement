using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Intrinsics.Arm;
using System.Threading.Tasks;
using backend.DTOs;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Services
{
    public class CourseRegistrationService : ICourseRegistrationService
    {
        private readonly SchoolSystemManagementContext _context;
        public CourseRegistrationService(SchoolSystemManagementContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<CourseRegistrationDTO>> GetCourseRegistrationDTOAsync()
        {
            var result = await (from cr in _context.CourseRegistrations
                                join s in _context.Students on cr.StudentId equals s.StudentId
                                join mc in _context.ModuleClasses on cr.ModuleClassId equals mc.ModuleClassId
                                join cs in _context.ClassSchedules on mc.ModuleClassId equals cs.ModuleClassId
                                from sp in _context.SemesterPeriods
                                join se in _context.Semesters on sp.SemesterId equals se.SemesterId
                                join su in _context.Subjects on mc.SubjectId equals su.SubjectId
                                join tms in _context.TrainingProgramModuleGroupSubjects on su.SubjectId equals tms.SubjectId
                                join tm in _context.TrainingProgramModuleGroups on tms.TrainingProgramModuleGroupId equals tm.TrainingProgramModuleGroupId
                                join t in _context.TrainingPrograms on tm.TrainingProgramId equals t.TrainingProgramId
                                join tc in _context.TrainingProgramCourses on t.TrainingProgramId equals tc.TrainingProgramId
                                join cp in _context.CumulativePoints on tc.TrainingProgramCourseId equals cp.TrainingProgramCourseId
                                where cr.StudentId == cp.StudentId
                                select new CourseRegistrationDTO
                                {
                                    MidtermGradePercentage = cr.MidtermGradePercentage,
                                    FinalExamGradePercentage = cr.FinalExamGradePercentage,
                                    MidtermGrade = cr.MidtermGrade,
                                    FinalExamGrade = cr.FinalExamGrade,
                                    AverageGrade10 = cr.AverageGrade10,
                                    AverageGrade4 = cr.AverageGrade4,
                                    Literacy = cr.Literacy,
                                    IsPass = cr.IsPass,
                                    StudentId = cr.StudentId,
                                    FullName = s.FullName,
                                    ModuleClassId = cr.ModuleClassId,
                                    StartDateModuleClass = cs.StartDate,
                                    AcademicYear = sp.AcademicYear,
                                    StartDateSemester = sp.StartDate,
                                    EndDateSemester = sp.EndDate,
                                    SemesterId = sp.SemesterId,
                                    SemesterName = se.SemesterName,
                                    SubjectId = mc.SubjectId,
                                    SubjectName = su.SubjectName,
                                    NumberOfCredit = su.NumberOfCredit,
                                    Total = cr.Total,
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
        public async Task<bool> PostCourseRegistrationDTOAsync(CourseRegistrationDTO dto)
        {
            if (dto == null || string.IsNullOrEmpty(dto.ModuleClassId) || string.IsNullOrEmpty(dto.StudentId))
            {
                return false;
            }
            var subjectId = await _context.ModuleClasses
                            .Where(mc => mc.ModuleClassId == dto.ModuleClassId)
                            .Select(mc => mc.SubjectId)
                            .FirstOrDefaultAsync();
            var check = await (from cr in _context.CourseRegistrations
                               join mc in _context.ModuleClasses on cr.ModuleClassId equals mc.ModuleClassId
                               join cs in _context.ClassSchedules on mc.ModuleClassId equals cs.ModuleClassId
                               where cr.StudentId == dto.StudentId &&
                                     mc.SubjectId == subjectId &&
                                     cs.StartDate > DateOnly.FromDateTime(DateTime.Now)
                               select cr).ToListAsync();
            if (check != null)
            {
                return false;
            }
            // Kiểm tra sự xung đột lịch học
            var hasConflict = from cs1 in _context.ClassSchedules
                              where cs1.ModuleClassId == dto.ModuleClassId
                              && (from cs2 in _context.ClassSchedules
                                  where (from cr in _context.CourseRegistrations
                                         where cr.StudentId == dto.StudentId
                                         select cr.ModuleClassId)
                                         .Contains(cs2.ModuleClassId)
                                  select cs2)
                                  .Any(cs2 => cs1.DayOfWeek == cs2.DayOfWeek
                                              && (
                                                   (cs1.LessonStart < cs2.LessonEnd && cs1.LessonEnd > cs2.LessonStart)
                                                   || (cs1.LessonStart >= cs2.LessonStart && cs1.LessonStart <= cs2.LessonEnd)
                                                   || (cs1.LessonEnd >= cs2.LessonStart && cs1.LessonEnd <= cs2.LessonEnd)
                                                 )
                                              && cs1.StartDate <= cs2.EndDate && cs1.EndDate >= cs2.StartDate
                                  )
                              select cs1;

            if (!hasConflict.Any())
            {
                var courseRegistration = new CourseRegistration
                {
                    ModuleClassId = dto.ModuleClassId,
                    StudentId = dto.StudentId
                };
                _context.CourseRegistrations.Add(courseRegistration);
                await _context.SaveChangesAsync();
            }
            else
            {
                return false;
            }
            return true;
        }
        public async Task<bool> DeleteCourseRegistrationDTOAsync(string moduleClassId, string studentId)
        {
            var dto = await _context.CourseRegistrations
                    .FirstOrDefaultAsync(cr => cr.ModuleClassId == moduleClassId && cr.StudentId == studentId);
            if (dto == null)
            {
                throw new Exception("Course registration not found.");
            }
            _context.CourseRegistrations.Remove(dto);
            await _context.SaveChangesAsync();

            return true;
        }
    }
}