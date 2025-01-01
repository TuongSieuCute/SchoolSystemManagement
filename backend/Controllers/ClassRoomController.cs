using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ClassRoomController : Controller
    {
        private readonly SchoolSystemManagementContext _context;

        public ClassRoomController(SchoolSystemManagementContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ClassRoom>>> GetClassRooms()
        {
            var classroom = await _context.ClassRooms.ToListAsync();
            return Ok(classroom);
        }

        // [HttpGet("Search")]
        // public async Task<IActionResult> GetSearch([FromQuery] DateOnly? date, byte? lessonStart, byte? lessonEnd, string? typeRoom, string? classRoomId)
        // {
        //     var query = (from cr in _context.ClassRooms
        //                  join cs in _context.ClassSchedules on cr.ClassRoomId equals cs.ClassRoomId
        //                  select new
        //                  {
        //                      cr.ClassRoomId,
        //                      cr.Sector,
        //                      cr.Floor,
        //                      cr.RoomType,
        //                      cr.Capacity,
        //                      cs.StartDate,
        //                      cs.EndDate,
        //                      cs.LessonStart,
        //                      cs.LessonEnd,
        //                      cs.DayOfWeek
        //                  });


        //     if (!string.IsNullOrEmpty(typeRoom))
        //     {
        //         query = query.Where(q => q.RoomType == typeRoom);
        //     }

        //     if (!string.IsNullOrEmpty(classRoomId))
        //     {
        //         query = query.Where(q => q.ClassRoomId.Contains(classRoomId));
        //     }

        //     bool allHaveValues = date.HasValue && lessonStart.HasValue && lessonEnd.HasValue;
        //     bool allAreNull = !date.HasValue && !lessonStart.HasValue && !lessonEnd.HasValue;

        //     if (allHaveValues || allAreNull)
        //     {
        //         if (allHaveValues)
        //         {
        //             bool isDateInRange = false;
        //             foreach (var q in query)
        //             {
        //                 if (q.StartDate <= date && q.EndDate >= date)
        //                 {
        //                     isDateInRange = true;
        //                     break;
        //                 }
        //             }

        //             if (isDateInRange)
        //             {
        //                 string dayOfWeek = GetDayOfWeek(date.Value);

        //                 bool allConditionsMet = query.Any(q =>
        //                     ((q.LessonStart <= lessonStart && q.LessonEnd >= lessonStart) ||
        //                     (q.LessonStart <= lessonEnd && q.LessonEnd >= lessonEnd) ||
        //                     (q.LessonStart >= lessonStart && q.LessonEnd <= lessonEnd)) &&
        //                     q.DayOfWeek == dayOfWeek);

        //                 if (allConditionsMet)
        //                 {
        //                     return Ok(new List<object>());
        //                 }
        //             }
        //         }
        //     }

        //     var result = await query.GroupBy(q => new
        //     {
        //         q.ClassRoomId,
        //     })
        //     .Select(g => g.First())
        //     .ToListAsync();

        //     return Ok(result);
        // }

        // private string GetDayOfWeek(DateOnly date)
        // {
        //     // Lấy thông tin về thứ
        //     DayOfWeek dayOfWeek = date.DayOfWeek;

        //     // Chuyển đổi thứ sang tiếng Việt
        //     switch (dayOfWeek)
        //     {
        //         case DayOfWeek.Monday: return "Thứ Hai";
        //         case DayOfWeek.Tuesday: return "Thứ Ba";
        //         case DayOfWeek.Wednesday: return "Thứ Tư";
        //         case DayOfWeek.Thursday: return "Thứ Năm";
        //         case DayOfWeek.Friday: return "Thứ Sáu";
        //         case DayOfWeek.Saturday: return "Thứ Bảy";
        //         case DayOfWeek.Sunday: return "Chủ Nhật";
        //         default: return "Không xác định";
        //     }
        // }
    }
}