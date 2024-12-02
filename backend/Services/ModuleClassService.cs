using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.DTOs;
using backend.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace backend.Services
{
    public class ModuleClassService : IModuleClassService
    {
        private readonly SchoolSystemManagementContext _context;
        public ModuleClassService(SchoolSystemManagementContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<ModuleClassDTO>> GetModuleClassDTOAsync()
        {
            var result = await (from mc in _context.ModuleClasses
                                join cs in _context.ClassSchedules on mc.ModuleClassId equals cs.ModuleClassId
                                join s in _context.Subjects on mc.SubjectId equals s.SubjectId
                                join cr in _context.ClassRooms on cs.ClassRoomId equals cr.ClassRoomId
                                join l in _context.Lecturers on mc.LecturerId equals l.LecturerId into lecturersGroup
                                from l in lecturersGroup.DefaultIfEmpty()
                                select new ModuleClassDTO
                                {
                                    ModuleClassId = mc.ModuleClassId,
                                    MaximumNumberOfStudents = mc.MaximumNumberOfStudents,
                                    LecturerId = mc.LecturerId,
                                    FullName = l.FullName,
                                    SubjectId = mc.SubjectId,
                                    SubjectName = s.SubjectName,
                                    DayOfWeek = cs.DayOfWeek,
                                    LessonStart = cs.LessonStart,
                                    LessonEnd = cs.LessonEnd,
                                    NumberOfWeek = cs.NumberOfWeek,
                                    StartDate = cs.StartDate,
                                    EndDate = cs.EndDate,
                                    ClassRoomId = cs.ClassRoomId,
                                    RomeType = cr.RoomType,
                                }).ToListAsync();

            return result;
        }
        public async Task<bool> PutModuleClassDTORegisterAsync(ModuleClassDTO dto)
        {
            var lecturerId = await _context.ModuleClasses
                            .Where(mc => mc.ModuleClassId == dto.ModuleClassId)
                            .Select(mc => mc.LecturerId)
                            .FirstOrDefaultAsync();

            if (lecturerId != null)
            {
                return false;
            }

            // Kiểm tra sự xung đột lịch dạy
            var hasConflict = await _context.ClassSchedules
                .Where(cs1 => cs1.ModuleClassId == dto.ModuleClassId)
                .AnyAsync(cs1 => _context.ClassSchedules
                    .Where(cs2 => _context.ModuleClasses
                        .Where(innerMc => innerMc.LecturerId == dto.LecturerId)
                        .Select(innerMc => innerMc.ModuleClassId)
                        .Contains(cs2.ModuleClassId))
                    .Any(cs2 => cs1.DayOfWeek == cs2.DayOfWeek &&
                        ((cs1.LessonStart < cs2.LessonEnd && cs1.LessonEnd > cs2.LessonStart) ||
                        (cs1.LessonStart >= cs2.LessonStart && cs1.LessonStart <= cs2.LessonEnd) ||
                        (cs1.LessonEnd >= cs2.LessonStart && cs1.LessonEnd <= cs2.LessonEnd)) &&
                        cs1.StartDate <= cs2.EndDate && cs1.EndDate >= cs2.StartDate));

            if (hasConflict)
            {
                return false;
            }

            lecturerId = dto.LecturerId;
            await _context.SaveChangesAsync();

            return true;
        }
        public async Task<bool> PutModuleClassDTOCancelRegistrationAsync(ModuleClassDTO dto) 
        {
            var lecturerId = await _context.ModuleClasses
                            .Where(mc => mc.ModuleClassId == dto.ModuleClassId)
                            .Select(mc => mc.LecturerId)
                            .FirstOrDefaultAsync();
            lecturerId = null;
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
