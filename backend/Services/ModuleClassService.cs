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
        public readonly AddModuleClassService _addModuleClassService;
        public ModuleClassService(SchoolSystemManagementContext context, AddModuleClassService addModuleClassService)
        {
            _context = context;
            _addModuleClassService = addModuleClassService;
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
                                    RoomType = cr.RoomType,
                                }).ToListAsync();

            return result;
        }
        public async Task<bool> PostModuleClassDTO(PostModuleClassDTO dto)
        {
            foreach (var data in dto.subjectDataDTO)
            {
                string? subjectId = data.SubjectIds;
                byte count = data.Count ?? 1;
                for (int i = 0; i < count; i++)
                {
                    string moduleClassId = _addModuleClassService.GenerateModuleClassId(subjectId ?? "");
                    var newModuleClass = new ModuleClass
                    {
                        ModuleClassId = moduleClassId,
                        MaximumNumberOfStudents = dto.MaximumNumberOfStudents,
                        LecturerId = null,
                        SubjectId = subjectId
                    };
                    var check = await _context.ModuleClasses
                        .FirstOrDefaultAsync(m => m.ModuleClassId == newModuleClass.ModuleClassId);
                    if (check != null)
                    {
                        return false;
                    }
                    _context.ModuleClasses.Add(newModuleClass);

                    var (startDate, endDate) = await _addModuleClassService.GetCurrentSemesterPeriodAsync();
                    if (!startDate.HasValue || !endDate.HasValue)
                    {
                        return false;
                    }
                    bool scheduleConflict = false;
                    for (int j = 0; j < dto.NumberOfDaysAWeek; j++)
                    {
                        byte numberOfDaysAWeek = dto.NumberOfDaysAWeek;
                        byte numberOfLessons = dto.NumberOfLessons;
                        var uniqueSchedule = await _addModuleClassService.FindUniqueSchedule(dto.RoomType ?? "Phòng lý thuyết", startDate.Value, endDate.Value, numberOfDaysAWeek, numberOfLessons);
                        if (uniqueSchedule == null)
                        {
                            scheduleConflict = true;
                            break;
                        }
                        var newClassSchedule = new ClassSchedule
                        {
                            ModuleClassId = moduleClassId,
                            DayOfWeek = uniqueSchedule.DayOfWeek,
                            LessonStart = uniqueSchedule.LessonStart,
                            LessonEnd = uniqueSchedule.LessonEnd,
                            NumberOfWeek = dto.NumberOfWeeks,
                            StartDate = uniqueSchedule.StartDate,
                            EndDate = uniqueSchedule.EndDate,
                            ClassRoomId = uniqueSchedule.ClassRoomId
                        };
                        _context.ClassSchedules.Add(newClassSchedule);
                    }
                    if (scheduleConflict)
                    {
                        _context.ModuleClasses.Remove(newModuleClass);
                        return false;
                    }
                    try
                    {
                        await _context.SaveChangesAsync();
                    }
                    catch (DbUpdateException)
                    {
                        _context.ModuleClasses.Remove(newModuleClass);
                        _context.ClassSchedules.RemoveRange(_context.ClassSchedules.Where(cs => cs.ModuleClassId == moduleClassId));

                        return false;
                    }
                }
            }
            return true;
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
