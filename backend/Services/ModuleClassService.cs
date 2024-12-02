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
                                LectureId = mc.LecturerId,
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
    }
}
