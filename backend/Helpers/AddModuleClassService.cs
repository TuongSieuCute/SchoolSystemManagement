using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Services
{
    public class AddModuleClassService
    {
        private readonly SchoolSystemManagementContext _context;

        public AddModuleClassService(SchoolSystemManagementContext context)
        {
            _context = context;
        }
        
        // Hàm tạo ModuleClassId bằng SubjectId
        public string GenerateModuleClassId(string subjectId)
        {
            if (string.IsNullOrWhiteSpace(subjectId))
            {
                throw new ArgumentException();
            }

            Random random = new Random();
            int randomNumber = random.Next(100, 1000);
            return $"{subjectId}{randomNumber}";
        }

        // Hàm random thứ trong tuần
        public DayOfWeek GetRandomDayOfWeek()
        {
            DayOfWeek[] daysOfWeek = { DayOfWeek.Monday, DayOfWeek.Tuesday, DayOfWeek.Wednesday, DayOfWeek.Thursday, DayOfWeek.Friday, DayOfWeek.Saturday };
            Random random = new Random();
            int index = random.Next(daysOfWeek.Length);
            return daysOfWeek[index];
        }

        // Hàm chuyển thứ trong tuần từ tiếng Anh sang tiếng Việt
        public string ConvertDayOfWeekToVietnamese(DayOfWeek dayOfWeek)
        {
            return dayOfWeek switch
            {
                DayOfWeek.Monday => "Thứ hai",
                DayOfWeek.Tuesday => "Thứ ba",
                DayOfWeek.Wednesday => "Thứ tư",
                DayOfWeek.Thursday => "Thứ năm",
                DayOfWeek.Friday => "Thứ sáu",
                DayOfWeek.Saturday => "Thứ bảy",
                _ => throw new ArgumentOutOfRangeException(nameof(dayOfWeek), $"Không xác định được: {dayOfWeek}")
            };
        }

        // Hàm tạo các tiết học
        public List<(byte, byte)> GetLessonTimes(int lessonsPerDay)
        {
            var lessonTimes = new List<(byte, byte)>();

            switch (lessonsPerDay)
            {
                case 3:
                    lessonTimes.Add((1, 3));
                    lessonTimes.Add((4, 6));
                    lessonTimes.Add((7, 9));
                    lessonTimes.Add((10, 12));
                    break;
                case 4:
                    lessonTimes.Add((1, 4));
                    lessonTimes.Add((2, 5));
                    lessonTimes.Add((3, 6));
                    lessonTimes.Add((7, 10));
                    lessonTimes.Add((8, 11));
                    lessonTimes.Add((9, 12));
                    break;
                case 5:
                    lessonTimes.Add((1, 5));
                    lessonTimes.Add((2, 6));
                    lessonTimes.Add((7, 11));
                    lessonTimes.Add((8, 12));
                    break;
                case 6:
                    lessonTimes.Add((1, 6));
                    lessonTimes.Add((7, 12));
                    break;
                default:
                    throw new ArgumentException();
            }

            return lessonTimes;
        }

        // Hàm random các tiết học
        public (byte, byte) GetRandomLessonTime(int lessonsPerDay)
        {
            var lessonTimes = GetLessonTimes(lessonsPerDay);

            Random random = new Random();
            int randomIndex = random.Next(lessonTimes.Count);
            return lessonTimes[randomIndex];
        }

        // Hàm tính toán ngày tháng năm của 1 lớp học phần dựa vào ngày bắt đầu học kì và thứ trong tuần đã random
        public DateOnly GetSpecificWeekday(DateOnly startDate, DayOfWeek dayOfWeek) // DayOfWeek là từ chủ nhật (0) đến thứ 7 (6)
        {
            int daysUntilNextDay = ((int)dayOfWeek - (int)startDate.DayOfWeek + 7) % 7; // dayofWeek = thứ 6, start = thứ 3 => ((5 - 2) + 7) % 7 = 3
            return startDate.AddDays(daysUntilNextDay);
        }

        // Hàm lấy dữ liệu ngày bắt đầu và ngày kết thúc của một học kì
        public async Task<(DateOnly? StartDate, DateOnly? EndDate)> GetCurrentSemesterPeriodAsync()
        {
            var today = DateOnly.FromDateTime(DateTime.Now);

            var nextSemester = await _context.SemesterPeriods
                .Where(sp => sp.StartDate > today)
                .OrderBy(sp => sp.StartDate)
                .Select(sp => new { sp.StartDate, sp.EndDate })
                .FirstOrDefaultAsync();

            if (nextSemester == null)
            {
                return (null, null);
            }

            return (nextSemester.StartDate, nextSemester.EndDate);
        }

        // Hàm random lấy dữ liệu Mã phòng học dựa vào loại phòng
        public async Task<string?> GetRandomClassRoomIdByRoomTypeAsync(string roomType)
        {
            var classrooms = await _context.ClassRooms
                .Where(c => c.RoomType == roomType)
                .Select(c => c.ClassRoomId)
                .ToListAsync();

            if (!classrooms.Any())
            {
                return null;
            }

            var random = new Random();
            int randomIndex = random.Next(classrooms.Count);

            return (classrooms[randomIndex]);
        }

        // Hàm tìm thời gian biểu cho các lớp học phần
        public async Task<ClassSchedule?> FindUniqueSchedule(string roomType, DateOnly semesterStart, DateOnly semesterEnd, byte numberOfWeeks, byte lessonsPerDay)
        {
            int maxAttempts = 100;  // Số lần thử tối đa để tìm lịch học
            for (int attempt = 0; attempt < maxAttempts; attempt++)
            {
                DayOfWeek dayOfWeek = GetRandomDayOfWeek();
                var lessonTime = GetRandomLessonTime(lessonsPerDay);
                string? classRoomId = await GetRandomClassRoomIdByRoomTypeAsync(roomType);

                // Bắt đầu với ngày bắt đầu kỳ học
                DateOnly classStartDate = GetSpecificWeekday(semesterStart, dayOfWeek);

                // Lặp qua từng tuần cho đến khi tìm thấy phòng trống
                while (classStartDate.AddDays((numberOfWeeks - 1) * 7) <= semesterEnd)
                {
                    DateOnly classEndDate = classStartDate.AddDays((numberOfWeeks - 1) * 7);

                    var tempSchedule = new ClassSchedule
                    {
                        DayOfWeek = ConvertDayOfWeekToVietnamese(dayOfWeek),
                        LessonStart = lessonTime.Item1,
                        LessonEnd = lessonTime.Item2,
                        StartDate = classStartDate,
                        EndDate = classEndDate,
                        ClassRoomId = classRoomId
                    };

                    // Kiểm tra xem có lịch học trùng lặp không
                    bool isDuplicate = await _context.ClassSchedules.AnyAsync(cs =>
                        cs.DayOfWeek == tempSchedule.DayOfWeek &&
                        cs.ClassRoomId == tempSchedule.ClassRoomId &&
                        ((cs.LessonStart <= tempSchedule.LessonStart && tempSchedule.LessonStart < cs.LessonEnd) ||
                         (cs.LessonStart < tempSchedule.LessonEnd && tempSchedule.LessonEnd <= cs.LessonEnd) ||
                         (tempSchedule.LessonStart <= cs.LessonStart && cs.LessonEnd <= tempSchedule.LessonEnd)) &&
                        ((cs.StartDate <= tempSchedule.StartDate && tempSchedule.StartDate <= cs.EndDate) ||
                         (cs.StartDate <= tempSchedule.EndDate && tempSchedule.EndDate <= cs.EndDate) ||
                         (tempSchedule.StartDate <= cs.StartDate && cs.EndDate <= tempSchedule.EndDate)));

                    // Nếu không có trùng lặp, trả về lịch học này
                    if (!isDuplicate)
                    {
                        return tempSchedule;
                    }

                    // Nếu trùng lặp, dịch chuyển lịch học sang tuần tiếp theo
                    classStartDate = classStartDate.AddDays(7); // Dịch chuyển 1 tuần
                }
            }

            return null;
        }
    }
}