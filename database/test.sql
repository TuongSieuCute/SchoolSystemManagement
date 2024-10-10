USE SchoolSystemManagement
GO

INSERT INTO Department VALUES (N'K.NV', N'Khoa Ngữ văn')
INSERT INTO Department VALUES (N'K.T_TH', N'Khoa Toán - Tin học')
INSERT INTO Department VALUES (N'K.CNTT', N'Khoa Công nghệ thông tin')
INSERT INTO Department VALUES (N'K.VL', N'Khoa Vật lý')
INSERT INTO Department VALUES (N'K.HH', N'Khoa Hóa học')
INSERT INTO Department VALUES (N'K.SH', N'Khoa Sinh học')
INSERT INTO Department VALUES (N'K.LS', N'Khoa Lịch sử')
INSERT INTO Department VALUES (N'K.DL', N'Khoa Địa lý')
INSERT INTO Department VALUES (N'K.TA', N'Khoa tiếng Anh')
INSERT INTO Department VALUES (N'K.TP', N'Khoa tiếng Pháp')
INSERT INTO Department VALUES (N'K.TNGA', N'Khoa tiếng Nga')
INSERT INTO Department VALUES (N'K.TT', N'Khoa tiếng Trung')
INSERT INTO Department VALUES (N'K.TNHAT', N'Khoa tiếng Nhật')
INSERT INTO Department VALUES (N'K.THQ', N'Khoa tiếng Hàn Quốc')
INSERT INTO Department VALUES (N'K.GDCT', N'Khoa Giáo dục Chính trị')
INSERT INTO Department VALUES (N'K.TLH', N'Khoa Tâm lý học')
INSERT INTO Department VALUES (N'K.KHGD', N'Khoa Khoa học Giáo dục')
INSERT INTO Department VALUES (N'K.GDTH', N'Khoa Giáo dục Tiểu học')
INSERT INTO Department VALUES (N'K.GDMN', N'Khoa Giáo dục Mầm non')
INSERT INTO Department VALUES (N'K.GDQP', N'Khoa Giáo dục Quốc phòng')
INSERT INTO Department VALUES (N'K.GDDB', N'Khoa Giáo dục Đặc biệt')
INSERT INTO Department VALUES (N'K.GDTC', N'Khoa Giáo dục Thể chất')
-----------------------------------------------------------------------------------------------------------------------------
INSERT INTO Major VALUES (N'N.GDMN902', N'Giáo dục Mầm non', N'K.GDMN')
INSERT INTO Major VALUES (N'N.GDTH901', N'Giáo dục Tiểu học', N'K.GDTH')
INSERT INTO Major VALUES (N'N.GDDB904', N'Giáo dục Đặc biệt', N'K.GDDB')
INSERT INTO Major VALUES (N'N.GDCT605', N'Giáo dục Chính trị', N'K.GDCT')
INSERT INTO Major VALUES (N'N.GDTC903', N'Giáo dục Thể chất', N'K.GDTC')
INSERT INTO Major VALUES (N'N.GDQP_AN905', N'Giáo dục Quốc phòng - An ninh', N'K.GDQP')
INSERT INTO Major VALUES (N'N.SPTOAN101', N'Sư phạm Toán học', N'K.T_TH')
INSERT INTO Major VALUES (N'N.SPTH103', N'Sư phạm Tin học', N'K.CNTT')
INSERT INTO Major VALUES (N'N.SPVL102', N'Sư phạm Vật lý', N'K.VL')
INSERT INTO Major VALUES (N'N.SPHH201', N'Sư phạm Hoá học', N'K.HH')
INSERT INTO Major VALUES (N'N.SPSH301', N'Sư phạm Sinh học', N'K.SH')
INSERT INTO Major VALUES (N'N.SPNV601', N'Sư phạm Ngữ văn', N'K.NV')
INSERT INTO Major VALUES (N'N.SPLS602', N'Sư phạm Lịch sử', N'K.LS')
INSERT INTO Major VALUES (N'N.SPDL603', N'Sư phạm Địa lý', N'K.DL')
INSERT INTO Major VALUES (N'N.SPTA701', N'Sư phạm Tiếng Anh', N'K.TA')
INSERT INTO Major VALUES (N'N.SPTP763', N'Sư phạm Tiếng Pháp', N'K.TP')
INSERT INTO Major VALUES (N'N.SPTTQ704', N'Sư phạm Tiếng Trung Quốc', N'K.TT')
INSERT INTO Major VALUES (N'N.SPKHTN401', N'Sư phạm khoa học tự nhiên', N'K.HH')
INSERT INTO Major VALUES (N'N.SPLS_DL616', N'Sư phạm Lịch sử - Địa lý', N'K.DL')
INSERT INTO Major VALUES (N'N.NNA751', N'Ngôn ngữ Anh', N'K.TA')
INSERT INTO Major VALUES (N'N.NNNGA752', N'Ngôn ngữ Nga', N'K.TNGA')
INSERT INTO Major VALUES (N'N.NNP753', N'Ngôn ngữ Pháp', N'K.TP')
INSERT INTO Major VALUES (N'N.NNTQ754', N'Ngôn ngữ Trung Quốc', N'K.TT')
INSERT INTO Major VALUES (N'N.NNNHAT755', N'Ngôn ngữ Nhật', N'K.TNHAT')
INSERT INTO Major VALUES (N'N.NNHQ756', N'Ngôn ngữ Hàn Quốc', N'K.THQ')
INSERT INTO Major VALUES (N'N.VH606', N'Văn học', N'K.NV')
INSERT INTO Major VALUES (N'N.TLH611', N'Tâm lý học', N'K.TLH')
INSERT INTO Major VALUES (N'N.TLHGD614', N'Tâm lý học giáo dục', N'K.TLH')
INSERT INTO Major VALUES (N'N.QTH608', N'Quốc tế học', N'K.LS')
INSERT INTO Major VALUES (N'N.VNH607', N'Việt Nam học', N'K.NV')
INSERT INTO Major VALUES (N'N.HH106', N'Hoá học', N'K.HH')
INSERT INTO Major VALUES (N'N.CNTT104', N'Công nghệ thông tin', N'K.CNTT')
INSERT INTO Major VALUES (N'N.CTXH612', N'Công tác xã hội', N'K.TLH')
---------------------------------------------------------------------------------------------------------------------
INSERT INTO AcademicYear VALUES (N'K46', N'Khóa 46', '01-09-2020')
INSERT INTO AcademicYear VALUES (N'K47', N'Khóa 47', '01-09-2021')
INSERT INTO AcademicYear VALUES (N'K48', N'Khóa 48', '01-09-2022')
INSERT INTO AcademicYear VALUES (N'K49', N'Khóa 49', '01-09-2023')
INSERT INTO AcademicYear VALUES (N'K50', N'Khóa 50', '01-09-2024')
---------------------------------------------------------------------------------------------------------------------
INSERT INTO Account VALUES (N'admin123', LOWER(CONVERT(VARCHAR(64), HASHBYTES('SHA2_256', '123'), 2)), N'0', 1, null)
INSERT INTO Account VALUES (N'sv123', LOWER(CONVERT(VARCHAR(64), HASHBYTES('SHA2_256', '123'), 2)), N'1', 1, null)
INSERT INTO Account VALUES (N'sv1', LOWER(CONVERT(VARCHAR(64), HASHBYTES('SHA2_256', '123'), 2)), N'1', 1, null)
INSERT INTO Account VALUES (N'gv123', LOWER(CONVERT(VARCHAR(64), HASHBYTES('SHA2_256', '123'), 2)), N'2', 1, null)
INSERT INTO Account VALUES (N'gv456', LOWER(CONVERT(VARCHAR(64), HASHBYTES('SHA2_256', '456'), 2)), N'2', 0, null)
------------------------------------------------------------------------------------------------------------------------------------------
select * from Accountselect LOWER(CONVERT(VARCHAR(64), CRYPT_GEN_RANDOM(32), 2))
SELECT LOWER(CONVERT(VARCHAR(64), HASHBYTES('SHA2_256', '47.01.104.233f0b51f0f419d08842417f85204c68648961a3f304542554c51dee70d0a83472b'), 2))

--ghép chuỗi
select '47.01.104.233'+'f0b51f0f419d08842417f85204c68648961a3f304542554c51dee70d0a83472b'
delete Account

INSERT INTO Teacher(TeacherId, FullName) VALUES ('gv123', N'Ngô Quốc Việt')

INSERT INTO ClassStudent VALUES (N'47.01.CNTT.A', N'Công nghệ thông tin A', N'N.CNTT104', 'gv123')

INSERT INTO Student VALUES (N'sv123', N'Nguyễn Cát Tường', '/Images/avt_girl.jpg', '20030118', N'Đồng Nai', 1, N'Kinh', '123456789987', N'Phật', 1, N'Chính thức', N'Còn học', N'Việt Nam', N'Đồng Nai', N'Biên Hòa', N'Tân Vạn', '0123456789', N'K47', N'47.01.CNTT.A')
INSERT INTO Student VALUES (N'sv1', N'Nguyễn Văn A', null, '20030118', N'Đồng Nai', 1, N'Kinh', '123456789987', N'Phật', 1, N'Chính thức', N'Còn học', N'Việt Nam', N'Đồng Nai', N'Biên Hòa', N'Tân Vạn', '0123456789', N'K47', N'47.01.CNTT.A')

delete CurriculumFrameworkStudent
select * from student
delete student

select A.AcademicYearName, A.Year, CS.CurriculumFrameworkId1, CS.CurriculumFrameworkId2, CL.ClassStudentName, T.FullName, Major.MajorName, Department.DepartmentName
FROM AcademicYear AS A
JOIN Student AS S ON A.AcademicYearId = S.AcademicYearId
JOIN CurriculumFrameworkStudent AS CS ON S.StudentId = CS.StudentId
JOIN ClassStudent AS CL ON S.ClassStudentId = CL.ClassStudentId 
JOIN Major ON CL.MajorId = Major.MajorId 
JOIN Teacher AS T ON CL.TeacherId = T.TeacherId
JOIN Department ON Major.DepartmentId = Department.DepartmentId
WHERE S.StudentId = 'sv123'


INSERT INTO Subject VALUES (N'POLI2001', N'Triết học Mác – Lênin', 3, 0, N'K.GDCT')
INSERT INTO Subject VALUES (N'EDUC2801', N'Phương pháp học tập hiệu quả', 2, 0, N'K.KHGD')
INSERT INTO Subject VALUES (N'COMP1801', N'Toán rời rạc và ứng dụng', 2, 0, N'K.CNTT')
INSERT INTO Subject VALUES (N'COMP1010', N'Lập trình cơ bản', 3, 0, N'K.CNTT')
INSERT INTO Subject VALUES (N'COMP1047', N'Đồ hoạ máy tính', 3, 0, N'K.CNTT')
INSERT INTO Subject VALUES (N'PSYC2803', N'Khởi nghiệp', 2, 0, N'K.TLH')
INSERT INTO Subject VALUES (N'COMP1314', N'Trí tuệ nhân tạo', 3, 0, N'K.CNTT')
INSERT INTO Subject VALUES (N'COMP1029', N'Thiết kế và quản lý mạng LAN', 3, 0, N'K.CNTT')
INSERT INTO Subject VALUES (N'COMP1809', N'Thực hành nghề nghiệp', 3, 0, N'K.CNTT')
INSERT INTO Subject VALUES (N'COMP1083', N'Khóa luận tốt nghiệp', 6, 0, N'K.CNTT')

INSERT INTO Semester VALUES (N'Học kì 1')
INSERT INTO Semester VALUES (N'Học kì 2')
INSERT INTO Semester VALUES (N'Học kì 3')
INSERT INTO Semester VALUES (N'Học kì 4')
INSERT INTO Semester VALUES (N'Học kì 5')
INSERT INTO Semester VALUES (N'Học kì 6')
INSERT INTO Semester VALUES (N'Học kì 7')
INSERT INTO Semester VALUES (N'Học kì 8')

INSERT INTO CurriculumStructure VALUES (N'Học phần nền tảng', N'Học phần chung')
INSERT INTO CurriculumStructure VALUES (N'Học phần nền tảng', N'Học phần chuyên môn chung cho nhóm ngành')
INSERT INTO CurriculumStructure VALUES (N'Học phần nền tảng', N'Học phần chuyên môn chung lĩnh vực và riêng cho ngành cụ thể')
INSERT INTO CurriculumStructure VALUES (N'Học phần nghiệp vụ', N'Học phần nghiệp vụ chung cho khối ngành')
INSERT INTO CurriculumStructure VALUES (N'Học phần nghiệp vụ', N'Học phần nghiệp vụ cho nhóm ngành và riêng cho ngành')
INSERT INTO CurriculumStructure VALUES (N'Học phần thực hành, thực tập nghề nghiệp', null)
INSERT INTO CurriculumStructure VALUES (N'Học phần tốt nghiệp', null)

INSERT INTO CurriculumFramework VALUES (N'K477480201_CNPM', N'Công nghệ thông tin', 122, '20210101', N'K.CNTT', 'N.CNTT104')
INSERT INTO CurriculumFramework VALUES (N'K477480201_KHMT', N'Công nghệ thông tin', 122, '20210101', N'K.CNTT', 'N.CNTT104')

INSERT INTO CurriculumFrameworkStudent VALUES (N'K477480201_CNPM', null, N'sv123')

INSERT INTO CurriculumStructureFramework VALUES (4, 1, N'K477480201_CNPM')
INSERT INTO CurriculumStructureFramework VALUES (6, 3, N'K477480201_CNPM')
INSERT INTO CurriculumStructureFramework VALUES (21, 5, N'K477480201_CNPM')

INSERT INTO CourseCurriculumFramework VALUES (N'K47', N'K477480201_CNPM', N'N.CNTT104')

INSERT INTO TeachingPlan VALUES (1, 1, N'POLI2001', 1)
INSERT INTO TeachingPlan VALUES (0, 2, N'EDUC2801', 1)
INSERT INTO TeachingPlan VALUES (1, 1, N'COMP1801', 1)
INSERT INTO TeachingPlan VALUES (1, 1, N'COMP1010', 1)
INSERT INTO TeachingPlan VALUES (0, 6, N'COMP1047', 1)
INSERT INTO TeachingPlan VALUES (1, 7, N'PSYC2803', 1)
INSERT INTO TeachingPlan VALUES (1, 5, N'COMP1314', 1)
INSERT INTO TeachingPlan VALUES (0, 5, N'COMP1029', 1)
INSERT INTO TeachingPlan VALUES (1, 6, N'COMP1809', 1)
INSERT INTO TeachingPlan VALUES (1, 8, N'COMP1083', 1)

select C.CourseName, C.AcademicYear, TCS.TrainingProgram_CourseId, SC.StudentClassId, L.FullName, M.MajorName, D.DepartmentName
from Course AS C, TrainingProgram_Course_Student AS TCS, StudentClass AS SC, Lecturer AS L, Major AS M, Department AS D
where TCS.StudentId = '47.01.104.233'
and L.LecturerId = SC.LecturerId
and C.CourseId = SC.CourseId
and M.MajorId = SC.MajorId
and D.DepartmentId = M.DepartmentId

SELECT 
    C.CourseName, C.AcademicYear, TCS.TrainingProgram_CourseId, 
    SC.StudentClassId, L.FullName, M.MajorName, D.DepartmentName
FROM 
    TrainingProgram_Course_Student AS TCS
JOIN 
    StudentClass AS SC ON TCS.StudentId = '47.01.104.233'
JOIN 
    Course AS C ON C.CourseId = SC.CourseId
JOIN 
    Lecturer AS L ON L.LecturerId = SC.LecturerId
JOIN 
    Major AS M ON M.MajorId = SC.MajorId
JOIN 
    Department AS D ON D.DepartmentId = M.DepartmentId

select SE.SemesterName, SU.SubjectId, SU.SubjectName, SU.NumberOfCredit, TMS.SubjectType, TMS.IsCredit_GPA, I.TrainingProgram_CourseId, S.FullName
from Semester AS SE, Subject AS SU, TrainingProgram_ModuleGroup_Subject AS TMS, InstructionalPlan AS I, Student AS S
WHERE S.StudentId = '47.01.104.233'
and SE.SemesterId = I.SemesterId
and SU.SubjectId = TMS.SubjectId
and SU.SubjectId = I.SubjectId

SELECT SE.SemesterName, SU.SubjectId, SU.SubjectName, SU.NumberOfCredit, TMS.SubjectType, TMS.IsCredit_GPA, I.TrainingProgram_CourseId, S.FullName
FROM Student S
JOIN InstructionalPlan I ON S.StudentId = '47.01.104.233'
JOIN Semester SE ON SE.SemesterId = I.SemesterId
JOIN Subject SU ON SU.SubjectId = I.SubjectId
JOIN TrainingProgram_ModuleGroup_Subject TMS ON SU.SubjectId = TMS.SubjectId

select * from CourseRegistration
delete CourseRegistration where CourseRegistrationId = 3

select * from ModuleClass as mc, ClassSchedule as cs where cs.ModuleClassId = mc.ModuleClassId
insert into CourseRegistration(StudentId, ModuleClassId) values
('47.01.104.233', 'COMP1320404')

update CourseRegistration set MidtermGradePercentage = null, FinalExamGradePercentage = null, MidtermGrade = null, FinalExamGrade = null,
AverageGrade10 = null, AverageGrade4 = null


----------------------------------------------------------------------------------------
select *
from ModuleClass mc, ClassSchedule cs, Subject s, Lecturer l
------------------------------------------------------------------------------------------
select * 
from TrainingProgram_Course as tc, InstructionalPlan as ip, Subject as s
where tc.TrainingProgram_CourseId in (N'K47.CNTT.2021')
and tc.TrainingProgram_CourseId = ip.TrainingProgram_CourseId
and ip.SubjectId = s.SubjectId