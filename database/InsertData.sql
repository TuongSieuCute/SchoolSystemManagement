USE SchoolSystemManagement
GO

INSERT INTO TuitionFees(TuitionFeesId, AmountPerCredit) VALUES
('2021', 400000)

INSERT INTO Course(CourseId, CourseName, AcademicYear) VALUES
('K47', N'Khóa 47', '2021-2025'),
('K48', N'Khóa 48', '2022-2026'),
('K49', N'Khóa 49', '2023-2027'),
('K50', N'Khóa 50', '2024-2028')

INSERT INTO Semester(SemesterId, SemesterName) VALUES
('HK1', N'Học kì 1'),
('HK2', N'Học kì 2'),
('HK3', N'Học kì 3'),
('HK4', N'Học kì 4'),
('HK5', N'Học kì 5'),
('HK6', N'Học kì 6'),
('HK7', N'Học kì 7'),
('HK8', N'Học kì 8'),
('HKH', N'Học kì hè')

INSERT INTO SemesterPeriod(AcademicYear, StartDate, EndDate, SemesterId) VALUES
('2021-2022', '2021-09-06', '2021-12-26', 'HK1'),
('2021-2022', '2022-02-14', '2022-05-29', 'HK2'),
('2021-2022', '2022-07-04', '2022-08-07', 'HKH'),

('2022-2023', '2022-09-05', '2022-12-18', 'HK1'),
('2022-2023', '2023-02-13', '2023-05-28', 'HK2'),
('2022-2023', '2023-07-03', '2023-08-13', 'HKH'),

('2023-2024', '2023-09-04', '2023-12-17', 'HK1'),
('2023-2024', '2024-02-12', '2024-06-02', 'HK2'),
('2023-2024', '2024-07-08', '2024-08-11', 'HKH'),

('2024-2025', '2024-09-02', '2024-12-15', 'HK1'),
('2024-2025', '2025-02-17', '2025-06-08', 'HK2'),
('2024-2025', '2025-06-30', '2025-08-10', 'HKH')

INSERT INTO Department(DepartmentId, DepartmentName) VALUES
(N'K.NV', N'Khoa Ngữ văn'),
(N'K.T_TH', N'Khoa Toán - Tin học'),
(N'K.CNTT', N'Khoa Công nghệ thông tin'),
(N'K.VL', N'Khoa Vật lý'),
(N'K.HH', N'Khoa Hóa học'),
(N'K.SH', N'Khoa Sinh học'),
(N'K.LS', N'Khoa Lịch sử'),
(N'K.DL', N'Khoa Địa lý'),
(N'K.TA', N'Khoa tiếng Anh'),
(N'K.TP', N'Khoa tiếng Pháp'),
(N'K.TNGA', N'Khoa tiếng Nga'),
(N'K.TT', N'Khoa tiếng Trung'),
(N'K.TNHAT', N'Khoa tiếng Nhật'),
(N'K.THQ', N'Khoa tiếng Hàn Quốc'),
(N'K.GDCT', N'Khoa Giáo dục Chính trị'),
(N'K.TLH', N'Khoa Tâm lý học'),
(N'K.KHGD', N'Khoa Khoa học Giáo dục'),
(N'K.GDTH', N'Khoa Giáo dục Tiểu học'),
(N'K.GDMN', N'Khoa Giáo dục Mầm non'),
(N'K.GDQP', N'Khoa Giáo dục Quốc phòng'),
(N'K.GDDB', N'Khoa Giáo dục Đặc biệt'),
(N'K.GDTC', N'Khoa Giáo dục Thể chất')

INSERT INTO Major(MajorId, MajorName, DepartmentId) VALUES
(N'N.GDMN902', N'Giáo dục Mầm non', N'K.GDMN'),
(N'N.GDTH901', N'Giáo dục Tiểu học', N'K.GDTH'),
(N'N.GDDB904', N'Giáo dục Đặc biệt', N'K.GDDB'),
(N'N.GDCT605', N'Giáo dục Chính trị', N'K.GDCT'),
(N'N.GDTC903', N'Giáo dục Thể chất', N'K.GDTC'),
(N'N.GDQP_AN905', N'Giáo dục Quốc phòng - An ninh', N'K.GDQP'),
(N'N.SPTOAN101', N'Sư phạm Toán học', N'K.T_TH'),
(N'N.SPTH103', N'Sư phạm Tin học', N'K.CNTT'),
(N'N.SPVL102', N'Sư phạm Vật lý', N'K.VL'),
(N'N.SPHH201', N'Sư phạm Hoá học', N'K.HH'),
(N'N.SPSH301', N'Sư phạm Sinh học', N'K.SH'),
(N'N.SPNV601', N'Sư phạm Ngữ văn', N'K.NV'),
(N'N.SPLS602', N'Sư phạm Lịch sử', N'K.LS'),
(N'N.SPDL603', N'Sư phạm Địa lý', N'K.DL'),
(N'N.SPTA701', N'Sư phạm Tiếng Anh', N'K.TA'),
(N'N.SPTP763', N'Sư phạm Tiếng Pháp', N'K.TP'),
(N'N.SPTTQ704', N'Sư phạm Tiếng Trung Quốc', N'K.TT'),
(N'N.SPKHTN401', N'Sư phạm khoa học tự nhiên', N'K.HH'),
(N'N.SPLS_DL616', N'Sư phạm Lịch sử - Địa lý', N'K.DL'),
(N'N.NNA751', N'Ngôn ngữ Anh', N'K.TA'),
(N'N.NNNGA752', N'Ngôn ngữ Nga', N'K.TNGA'),
(N'N.NNP753', N'Ngôn ngữ Pháp', N'K.TP'),
(N'N.NNTQ754', N'Ngôn ngữ Trung Quốc', N'K.TT'),
(N'N.NNNHAT755', N'Ngôn ngữ Nhật', N'K.TNHAT'),
(N'N.NNHQ756', N'Ngôn ngữ Hàn Quốc', N'K.THQ'),
(N'N.VH606', N'Văn học', N'K.NV'),
(N'N.TLH611', N'Tâm lý học', N'K.TLH'),
(N'N.TLHGD614', N'Tâm lý học giáo dục', N'K.TLH'),
(N'N.QTH608', N'Quốc tế học', N'K.LS'),
(N'N.VNH607', N'Việt Nam học', N'K.NV'),
(N'N.HH106', N'Hoá học', N'K.HH'),
(N'N.CNTT104', N'Công nghệ thông tin', N'K.CNTT'),
(N'N.CTXH612', N'Công tác xã hội', N'K.TLH')

INSERT INTO Account(UserName, PasswordHash, Salt, Role, IsActive, Email) VALUES
('Admin', '0c2dd3a13079db1fc7043e5e5785411bd48fe0658379ad48c1b50b6441ec7ccb', '153ea97fd27cde46fcf35e12852c6d602e4691cc25566c9e5fea42f1cd0e92d5', 0, 1, NULL),
('GV.0001', '6e76576ec18bfa76f5a328f6141d54ea6da0bfd4680495f15e388862a5716e0e', '6cb7a154ecee5832c42e08a691a38d1c1703f083e147bcd67e660c06b72fbd1d', 1, 1, NULL),
('47.01.104.233', 'a68ca2b59b559e775cd068b3f27f54eab5dc011f58990e5be2b3064c712112f8', 'f0b51f0f419d08842417f85204c68648961a3f304542554c51dee70d0a83472b', 2, 1, '4701104233@student.hcmue.edu.vn')

INSERT INTO Lecturer(LecturerId, FullName, UrlImage, DateOfBirth, PlaceOfBirth, Gender, EthnicGroup, CitizenIdentification, Religion, Country, State_Province, District_County, Ward_Commune, PhoneNumber, DepartmentId) VALUES
('GV.0001', N'Ngô Quốc Việt', '/Images/avt_girl.jpg', '1970-01-01', N'TP.Hồ Chí Minh', 0, N'Kinh', '123456789123', N'Phật', N'Việt Nam', N'TP.Hồ Chí Minh', N'Quận 5', N'Phường 15', '0123456789', 'K.CNTT')

INSERT INTO StudentClass(StudentClassId, StudentClassName, LecturerId, CourseId, MajorId) VALUES
('47.01.CNTT.A', N'Lớp Công nghệ thông tin A khóa 47', 'GV.0001', 'K47', 'N.CNTT104')

INSERT INTO Student(StudentId, FullName, UrlImage, DateOfBirth, PlaceOfBirth, Gender, EthnicGroup, CitizenIdentification, Religion, Union_Party, TypeStudent, AcademicStatus, Country, State_Province, District_County, Ward_Commune, PhoneNumber, StudentClassId) VALUES
('47.01.104.233', N'Nguyễn Cát Tường', '/Images/avt_girl.jpg', '2003-01-18', N'Đồng Nai', 1, N'Kinh', '123456789123', N'Phật', 1, N'Chính thức', N'Còn học', N'Việt Nam', N'Đồng Nai', N'Biên Hòa', N'Tân Vạn', '0123456789', '47.01.CNTT.A')

INSERT INTO ModuleType(ModuleTypeId, ModuleTypeName) VALUES
('HP1', N'Học phần nền tảng'),
('HP2', N'Học phần nghiệp vụ'),
('HP3', N'Học phần thực hành, thực tập nghề nghiệp'),
('HP4', N'Học phần tốt nghiệp')

INSERT INTO ModuleGroup(ModuleGroupId, ModuleGroupName, ModuleTypeId) VALUES
('NHP1', N'Học phần chung', 'HP1'),
('NHP2', N'Học phần chuyên môn chung cho nhóm ngành', 'HP1'),
('NHP3', N'Học phần chuyên môn chung lĩnh vực và riêng cho ngành cụ thể', 'HP1'),
('NHP4', N'Học phần nghiệp vụ chung cho khối ngành', 'HP2'),
('NHP5', N'Học phần nghiệp vụ cho nhóm ngành', 'HP2'),
('NHP6', null, 'HP3'),
('NHP7', null, 'HP4')

INSERT INTO TrainingProgram(TrainingProgramId, TrainingProgramName, MajorId) VALUES
('GDMN.2021', N'CTDT Giáo dục Mầm non năm 2021', 'N.GDMN902'),
('GDTH.2021', N'CTDT Giáo dục Tiểu học năm 2021', 'N.GDTH901'),
('GDDB.2021', N'CTDT Giáo dục Đặc biệt năm 2021', 'N.GDDB904'),
('GDCT.2021', N'CTDT Giáo dục Chính trị năm 2021', 'N.GDCT605'),
('GDTC.2021', N'CTDT Giáo dục Thể chất năm 2021', 'N.GDTC903'),
('GDQP_AN.2021', N'CTDT Giáo dục Quốc phòng và An ninh năm 2021', 'N.GDQP_AN905'),
('SPTOAN.2021', N'CTDT Sư phạm Toán học năm 2021', 'N.SPTOAN101'),
('SPTH.2021', N'CTDT Sư phạm Tin học năm 2021', 'N.SPTH103'),
('SPVL.2021', N'CTDT Sư phạm Vật lý năm 2021', 'N.SPVL102'),
('SPHH.2021', N'CTDT Sư phạm Hóa học năm 2021', 'N.SPHH201'),
('SPSH.2021', N'CTDT Sư phạm Sinh học năm 2021', 'N.SPSH301'),
('SPNV.2021', N'CTDT Sư phạm Ngữ văn năm 2021', 'N.SPNV601'),
('SPLS.2021', N'CTDT Sư phạm Lịch sử năm 2021', 'N.SPLS602'),
('SPDL.2021', N'CTDT Sư phạm Địa lý năm 2021', 'N.SPDL603'),
('SPTA.2021', N'CTDT Sư phạm Tiếng Anh năm 2021', 'N.SPTA701'),
('SPTP.2021', N'CTDT Sư phạm Tiếng Pháp năm 2021', 'N.SPTP763'),
('SPTTQ.2021', N'CTDT Sư phạm Tiếng Trung Quốc năm 2021', 'N.SPTTQ704'),
('SPKHTN.2021', N'CTDT Sư phạm Khoa học tự nhiên năm 2021', 'N.SPKHTN401'),
('SPLS_DL.2021', N'CTDT Sư phạm Lịch sử và Địa lý năm 2021', 'N.SPLS_DL616'),
('NNA.2021', N'CTDT Ngôn ngữ Anh năm 2021', 'N.NNA751'),
('NNNGA.2021', N'CTDT Ngôn ngữ Nga năm 2021', 'N.NNNGA752'),
('NNP.2021', N'CTDT Ngôn ngữ Pháp năm 2021', 'N.NNP753'),
('NNTQ.2021', N'CTDT Ngôn ngữ Trung Quốc năm 2021', 'N.NNTQ754'),
('NNNHAT.2021', N'CTDT Ngôn ngữ Nhật năm 2021', 'N.NNNHAT755'),
('NNHQ.2021', N'CTDT Ngôn ngữ Hàn Quốc năm 2021', 'N.NNHQ756'),
('VH.2021', N'CTDT Văn học năm 2021', 'N.VH606'),
('TLH.2021', N'CTDT Tâm lý học năm 2021', 'N.TLH611'),
('TLHGD.2021', N'CTDT Tâm lý học giáo dục năm 2021', 'N.TLHGD614'),
('QTH.2021', N'CTDT Quốc tế học năm 2021', 'N.QTH608'),
('VNH.2021', N'CTDT Việt Nam học năm 2021', 'N.VNH607'),
('HH.2021', N'CTDT Hóa học năm 2021', 'N.HH106'),
('CNTT.2021', N'CTDT Công nghệ thông tin năm 2021', 'N.CNTT104'),
('CTXH.2021', N'CTDT Công tác xã hội năm 2021', 'N.CTXH612')

INSERT INTO TrainingProgram_Course(TrainingProgramId, CourseId) VALUES
('GDMN.2021', 'K47'),
('GDTH.2021', 'K47'),
('GDDB.2021', 'K47'),
('GDCT.2021', 'K47'),
('GDQP_AN.2021', 'K47'),
('SPTOAN.2021', 'K47'),
('SPTH.2021', 'K47'),
('SPVL.2021', 'K47'),
('SPHH.2021', 'K47'),
('SPSH.2021', 'K47'),
('SPNV.2021', 'K47'),
('SPLS.2021', 'K47'),
('SPDL.2021', 'K47'),
('SPTA.2021', 'K47'),
('SPTP.2021', 'K47'),
('SPTTQ.2021', 'K47'),
('SPKHTN.2021', 'K47'),
('SPLS_DL.2021', 'K47'),
('NNA.2021', 'K47'),
('NNNGA.2021', 'K47'),
('NNP.2021', 'K47'),
('NNTQ.2021', 'K47'),
('NNNHAT.2021', 'K47'),
('NNHQ.2021', 'K47'),
('VH.2021', 'K47'),
('TLH.2021', 'K47'),
('TLHGD.2021', 'K47'),
('QTH.2021', 'K47'),
('VNH.2021', 'K47'),
('HH.2021', 'K47'),
('CNTT.2021', 'K47'),
('CTXH.2021', 'K47'),

('GDMN.2021', 'K48'),
('GDTH.2021', 'K48'),
('GDDB.2021', 'K48'),
('GDCT.2021', 'K48'),
('GDQP_AN.2021', 'K48'),
('SPTOAN.2021', 'K48'),
('SPTH.2021', 'K48'),
('SPVL.2021', 'K48'),
('SPHH.2021', 'K48'),
('SPSH.2021', 'K48'),
('SPNV.2021', 'K48'),
('SPLS.2021', 'K48'),
('SPDL.2021', 'K48'),
('SPTA.2021', 'K48'),
('SPTP.2021', 'K48'),
('SPTTQ.2021', 'K48'),
('SPKHTN.2021', 'K48'),
('SPLS_DL.2021', 'K48'),
('NNA.2021', 'K48'),
('NNNGA.2021', 'K48'),
('NNP.2021', 'K48'),
('NNTQ.2021', 'K48'),
('NNNHAT.2021', 'K48'),
('NNHQ.2021', 'K48'),
('VH.2021', 'K48'),
('TLH.2021', 'K48'),
('TLHGD.2021', 'K48'),
('QTH.2021', 'K48'),
('VNH.2021', 'K48'),
('HH.2021', 'K48'),
('CNTT.2021', 'K48'),
('CTXH.2021', 'K48'),

('GDMN.2021', 'K49'),
('GDTH.2021', 'K49'),
('GDDB.2021', 'K49'),
('GDCT.2021', 'K49'),
('GDQP_AN.2021', 'K49'),
('SPTOAN.2021', 'K49'),
('SPTH.2021', 'K49'),
('SPVL.2021', 'K49'),
('SPHH.2021', 'K49'),
('SPSH.2021', 'K49'),
('SPNV.2021', 'K49'),
('SPLS.2021', 'K49'),
('SPDL.2021', 'K49'),
('SPTA.2021', 'K49'),
('SPTP.2021', 'K49'),
('SPTTQ.2021', 'K49'),
('SPKHTN.2021', 'K49'),
('SPLS_DL.2021', 'K49'),
('NNA.2021', 'K49'),
('NNNGA.2021', 'K49'),
('NNP.2021', 'K49'),
('NNTQ.2021', 'K49'),
('NNNHAT.2021', 'K49'),
('NNHQ.2021', 'K49'),
('VH.2021', 'K49'),
('TLH.2021', 'K49'),
('TLHGD.2021', 'K49'),
('QTH.2021', 'K49'),
('VNH.2021', 'K49'),
('HH.2021', 'K49'),
('CNTT.2021', 'K49'),
('CTXH.2021', 'K49'),

('GDMN.2021', 'K50'),
('GDTH.2021', 'K50'),
('GDDB.2021', 'K50'),
('GDCT.2021', 'K50'),
('GDQP_AN.2021', 'K50'),
('SPTOAN.2021', 'K50'),
('SPTH.2021', 'K50'),
('SPVL.2021', 'K50'),
('SPHH.2021', 'K50'),
('SPSH.2021', 'K50'),
('SPNV.2021', 'K50'),
('SPLS.2021', 'K50'),
('SPDL.2021', 'K50'),
('SPTA.2021', 'K50'),
('SPTP.2021', 'K50'),
('SPTTQ.2021', 'K50'),
('SPKHTN.2021', 'K50'),
('SPLS_DL.2021', 'K50'),
('NNA.2021', 'K50'),
('NNNGA.2021', 'K50'),
('NNP.2021', 'K50'),
('NNTQ.2021', 'K50'),
('NNNHAT.2021', 'K50'),
('NNHQ.2021', 'K50'),
('VH.2021', 'K50'),
('TLH.2021', 'K50'),
('TLHGD.2021', 'K50'),
('QTH.2021', 'K50'),
('VNH.2021', 'K50'),
('HH.2021', 'K50'),
('CNTT.2021', 'K50'),
('CTXH.2021', 'K50')

INSERT INTO TrainingProgram_Course_Student(TrainingProgram_CourseId, StudentId) VALUES
('K47.CNTT.2021', '47.01.104.233')

INSERT INTO TrainingProgram_ModuleGroup(NumberOfElectiveCredits, TrainingProgramId, ModuleGroupId) VALUES
(2, 'GDMN.2021', 'NHP1'), 
(2, 'GDMN.2021', 'NHP2'),
(6, 'GDMN.2021', 'NHP3'),
(0, 'GDMN.2021', 'NHP4'),
(4, 'GDMN.2021', 'NHP5'),
(0, 'GDMN.2021', 'NHP6'),
(6, 'GDMN.2021', 'NHP7'),

(4, 'CNTT.2021', 'NHP1'),
(0, 'CNTT.2021', 'NHP2'),
(6, 'CNTT.2021', 'NHP3'),
(0, 'CNTT.2021', 'NHP4'),
(21, 'CNTT.2021', 'NHP5'),
(0, 'CNTT.2021', 'NHP6'),
(6, 'CNTT.2021', 'NHP7')

INSERT INTO Subject(SubjectId, SubjectName, NumberOfCredit, SubjectType, IsCredit_GPA) VALUES
-- Môn học chung toàn ngành
('POLI2001', N'Triết học Mác - Lênin', 3, N'Bắt buộc', 1),
('POLI2002', N'Kinh tế chính trị học Mác - Lênin', 2, N'Bắt buộc', 1),
('POLI2003', N'Chủ nghĩa xã hội khoa học', 2, N'Bắt buộc', 1),
('POLI2004', N'Lịch sử Đảng cộng sản Việt Nam', 2, N'Bắt buộc', 1),
('POLI2005', N'Tư tưởng Hồ Chí Minh', 2, N'Bắt buộc', 1),
('POLI1903', N'Pháp luật đại cương', 2, N'Bắt buộc', 1),
('PSYC1001', N'Tâm lý học đại cương', 2, N'Bắt buộc', 1),
('PHYL2401', N'Giáo dục thể chất 1 (Thể dục - Điền kinh)', 1, N'Tự chọn', 0),
('PHYL2405', N'Giáo dục Thể chất 2 - Aerobic cơ bản', 1, N'Tự chọn', 0),
('PHYL2404', N'Giáo dục Thể chất 2 - Đá cầu cơ bản', 1, N'Tự chọn', 0),
('PHYL2403', N'Giáo dục Thể chất 2 - Cầu lông cơ bản', 1, N'Tự chọn', 0),
('PHYL2402', N'Giáo dục Thể chất 2 - Bóng chuyền cơ bản', 1, N'Tự chọn', 0),
('PHYL2410', N'Giáo dục Thể chất 2 - Khiêu vũ thể thao cơ bản', 1, N'Tự chọn', 0),
('PHYL2409', N'Giáo dục Thể chất 2 - Teakwondo cơ bản', 1, N'Tự chọn', 0),
('PHYL2408', N'Giáo dục Thể chất 2 - Bóng đá cơ bản', 1, N'Tự chọn', 0),
('PHYL2407', N'Giáo dục Thể chất 2 - Bóng rổ cơ bản', 1, N'Tự chọn', 0),
('PHYL2406', N'Giáo dục Thể chất 2 - Bơi lội cơ bản', 1, N'Tự chọn', 0),
('PHYL2419', N'Giáo dục Thể chất 3 - Khiêu vũ thể thao nâng cao', 1, N'Tự chọn', 0),
('PHYL2418', N'Giáo dục Thể chất 3 - Teakwondo nâng cao', 1, N'Tự chọn', 0),
('PHYL2417', N'Giáo dục Thể chất 3 - Bóng đá nâng cao', 1, N'Tự chọn', 0),
('PHYL2416', N'Giáo dục Thể chất 3 - Đá cầu nâng cao', 1, N'Tự chọn', 0),
('PHYL2415', N'Giáo dục Thể chất 3 - Bơi lội nâng cao', 1, N'Tự chọn', 0),
('PHYL2414', N'Giáo dục Thể chất 3 - Bóng rổ nâng cao', 1, N'Tự chọn', 0),
('PHYL2413', N'Giáo dục Thể chất 3 - Aerobic nâng cao', 1, N'Tự chọn', 0),
('PHYL2412', N'Giáo dục Thể chất 3 - Cầu lông nâng cao', 1, N'Tự chọn', 0),
('PHYL2411', N'Giáo dục Thể chất 3 - Bóng chuyền nâng cao', 1, N'Tự chọn', 0),
('MILI2701', N'HP1: Đường lối quốc phòng và an ninh của Đảng', 3, N'Bắt buộc', 0),
('MILI2702', N'HP2: Công tác quốc phòng và an ninh', 2, N'Bắt buộc', 0),
('MILI2703', N'HP3: Quân sự chung', 2, N'Bắt buộc', 0),
('MILI2704', N'HP4: Kĩ thuật chiến đấu bộ binh và chiến thuật', 4, N'Bắt buộc', 0),
('EDUC2801', N'Phương pháp học tập hiệu quả', 2, N'Tự chọn', 1),
('PSYC1493', N'Kỹ năng thích ứng và giải quyết vấn đề', 2, N'Tự chọn', 1),
('PSYC2801', N'Kỹ năng làm việc nhóm và tư duy sáng tạo', 2, N'Tự chọn', 1),
('COMP1810', N'Trí tuệ nhân tạo trong giáo dục', 2, N'Tự chọn', 1),
('DOMS0', N'Giáo dục đời sống', 2, N'Tự chọn', 1),
-- Ngành Giáo dục Mầm non
('LITR1800', N'Tiếng Việt thực hành', 2, N'Bắt buộc', 1),
('EDUC1410', N'Giáo dục vì sự phát triển bền vững', 2, N'Tự chọn', 1),
('LITR1912', N'Cơ sở văn hoá Việt Nam', 2, N'Tự chọn', 1),
('EARC1800', N'Giáo dục học đại cương', 2, N'Bắt buộc', 1),
('EDUT2801', N'Phương pháp nghiên cứu khoa học và sư phạm ứng dụng', 2, N'Bắt buộc', 1),
('EARC1825', N'Mỹ thuật mầm non', 3, N'Bắt buộc', 1),
('EARC1829', N'Múa mầm non', 3, N'Bắt buộc', 1),
('EARC1828', N'Âm nhạc mầm non', 3, N'Bắt buộc', 1),
('EARC1805', N'Tiếng việt (mầm non)', 2, N'Bắt buộc', 1),
('EARC1807', N'Toán cơ sở (mầm non)', 2, N'Bắt buộc', 1),
('EARC1806', N'Văn học thiếu nhi (mầm non)', 2, N'Bắt buộc', 1),
('EARC1011', N'Sinh lý đại cương và Sinh lý trẻ em', 2, N'Bắt buộc', 1),
('EARC1416', N'Tâm lý học mầm non 1', 2, N'Bắt buộc', 1),
('EARC1417', N'Tâm lý học mầm non 2', 2, N'Bắt buộc', 1),
('EARC1418', N'Giáo dục học mầm non', 3, N'Bắt buộc', 1),
('EARC1021', N'Lý luận dạy học mầm non', 2, N'Bắt buộc', 1),
('EARC1831', N'Ứng dụng công nghệ thông tin trong giáo dục mầm non', 2, N'Bắt buộc', 1),
('EARC1037', N'Gia đình cộng đồng và trẻ thơ', 2, N'Tự chọn', 1),
('EARC1327', N'Đồ chơi trẻ em', 2, N'Tự chọn', 1),
('EARC1832', N'Hướng dẫn kỹ năng vẽ đơn giản - một số chủ đề cho trẻ mầm non', 2, N'Tự chọn', 1),
('EARC1830', N'Dàn dựng chương trình Ca - Múa - Nhạc cho trẻ mầm non', 2, N'Tự chọn', 1),
('EARC1501', N'Văn học dân gian (Mầm non)', 2, N'Tự chọn', 1),
('EARC1801', N'Mỹ thuật cơ bản', 2, N'Tự chọn', 1),
('EARC1802', N'Âm nhạc cơ bản', 2, N'Tự chọn', 1),
('EARC1322', N'Đánh giá trong giáo dục mầm non', 3, N'Bắt buộc', 1),
('EARC1336', N'Các lý thuyết về sự phát triển tâm lý trẻ em', 3, N'Bắt buộc', 1),
('EARC1337', N'Thiết kế và sử dụng môi trường giáo dục trong trường mầm non', 3, N'Bắt buộc', 1),
('EARC1424', N'Quản lý và lãnh đạo giáo dục mầm non', 3, N'Bắt buộc', 1),
('EARC1019', N'Tổ chức hoạt động vui chơi', 2, N'Bắt buộc', 1),
('EARC1020', N'Phát triển chương trình Giáo dục Mầm non', 2, N'Bắt buộc', 1),
('EARC1318', N'Phương pháp cho trẻ mầm non làm quen với tác phẩm văn học', 3, N'Bắt buộc', 1),
('EARC1030', N'Phương pháp giáo dục thể chất cho trẻ mầm non', 3, N'Bắt buộc', 1),
('EARC1824', N'Phương pháp khám phá khoa học và xã hội', 3, N'Bắt buộc', 1),
('EARC1826', N'Phương pháp hình thành biểu tượng toán cho trẻ mầm non', 3, N'Bắt buộc', 1),
('EARC1026', N'Phương pháp phát triển ngôn ngữ cho trẻ mầm non', 3, N'Bắt buộc', 1),
('EARC1028', N'Phương pháp tổ chức hoạt động tạo hình cho trẻ mầm non', 3, N'Bắt buộc', 1),
('EARC1029', N'Phương pháp giáo dục âm nhạc cho trẻ mầm non', 3, N'Bắt buộc', 1),
('EARC1400', N'Nhập môn nghề giáo', 1, N'Bắt buộc', 1),
('EARC1307', N'Bệnh trẻ em và sơ cấp cứu', 3, N'Bắt buộc', 1),
('EARC1309', N'Vệ sinh trẻ em', 2, N'Bắt buộc', 1),
('EARC1022', N'Dinh dưỡng trẻ em', 2, N'Bắt buộc', 1),
('EARC1321', N'Cách tiếp cận tích hợp trong giáo dục mầm non', 2, N'Tự chọn', 1),
('EARC1323', N'Xây dựng khẩu phần ăn cho trẻ mầm non', 2, N'Tự chọn', 1),
('EARC1334', N'Các mô hình giáo dục mầm non trên thế giới', 2, N'Tự chọn', 1),
('EARC1033', N'Giao tiếp sư phạm mầm non', 2, N'Tự chọn', 1),
('EARC1044', N'Rèn luyện nghiệp vụ sư phạm 1', 2, N'Bắt buộc', 1),
('EARC1045', N'Rèn luyện nghiệp vụ sư phạm 2', 2, N'Bắt buộc', 1),
('EARC1046', N'Thực tập sư phạm', 6, N'Bắt buộc', 1),
('EARC1051', N'Khóa luận tốt nghiệp', 6, N'Tự chọn', 1),
('EARC1803', N'Hồ sơ tốt nghiệp', 3, N'Tự chọn', 1),
('EARC1804', N'Sản phẩm nghiên cứu', 3, N'Tự chọn', 1),
-- Ngành Công nghệ thông tin
('COMP1801', N'Toán rời rạc và ứng dụng', 2, N'Bắt buộc', 1),
('COMP1501', N'Xác suất thống kê và ứng dụng', 3, N'Bắt buộc', 1),
('COMP1802', N'Thiết kế Web', 2, N'Bắt buộc', 1),
('COMP1800', N'Cơ sở toán trong CNTT', 4, N'Bắt buộc', 1),
('COMP1010', N'Lập trình cơ bản', 3, N'Bắt buộc', 1),
('COMP1013', N'Lập trình nâng cao', 3, N'Bắt buộc', 1),
('COMP1017', N'Lập trình hướng đối tượng', 3, N'Bắt buộc', 1),
('COMP1701', N'Lý thuyết đồ thị và ứng dụng', 3, N'Bắt buộc', 1),
('COMP1502', N'Quy hoạch tuyến tính và ứng dụng', 3, N'Bắt buộc', 1),
('COMP1332', N'Hệ điều hành', 3, N'Bắt buộc', 1),
('COMP1011', N'Kiến trúc máy tính và hợp ngữ', 3, N'Bắt buộc', 1),
('COMP1018', N'Cơ sở dữ liệu', 3, N'Bắt buộc', 1),
('COMP1016', N'Cấu trúc dữ liệu', 3, N'Bắt buộc', 1),
('COMP1015', N'Nhập môn mạng máy tính', 3, N'Bắt buộc', 1),
('COMP1401', N'Phân tích và thiết kế giải thuật', 3, N'Bắt buộc', 1),
('COMP1019', N'Lập trình trên Windows', 3, N'Bắt buộc', 1),
('PSYC2804', N'Phương pháp nghiên cứu khoa học', 2, N'Bắt buộc', 1),
('COMP1047', N'Đồ hoạ máy tính', 3, N'Tự chọn', 1),
('COMP1024', N'Các hệ cơ sở dữ liệu', 3, N'Tự chọn', 1),
('COMP1712', N'Học máy', 3, N'Tự chọn', 1),
('COMP1308', N'Phát triển ứng dụng trò chơi', 3, N'Tự chọn', 1),
('COMP1304', N'Phát triển ứng dụng trên thiết bị di động', 3, N'Tự chọn', 1),
('COMP1050', N'Xử lý ảnh số', 3, N'Tự chọn', 1),
('COMP1043', N'Hệ thống mã nguồn mở', 3, N'Tự chọn', 1),
('COMP1709', N'Hệ thống nhúng và ứng dụng', 3, N'Tự chọn', 1),
('COMP1402', N'Quy trình phát triển phần mềm Agile', 3, N'Tự chọn', 1),
('COMP1305', N'Quản lý dự án Công nghệ Thông tin', 3, N'Tự chọn', 1),
('PSYC2803', N'Khởi nghiệp', 2, N'Bắt buộc', 1),
('COMP1314', N'Trí tuệ nhân tạo', 3, N'Bắt buộc', 1),
('COMP1044', N'Nhập môn công nghệ phần mềm', 3, N'Bắt buộc', 1),
('COMP1060', N'Phân tích thiết kế hướng đối tượng', 3, N'Bắt buộc', 1),
('COMP1803', N'Lập trình PHP', 3, N'Bắt buộc', 1),
('COMP1029', N'Thiết kế và quản lý mạng LAN', 3, N'Tự chọn', 1),
('COMP1025', N'Mạng máy tính nâng cao', 3, N'Tự chọn', 1),
('COMP1046', N'Các hệ cơ sở tri thức', 3, N'Tự chọn', 1),
('COMP1315', N'Khai thác dữ liệu và ứng dụng', 3, N'Tự chọn', 1),
('COMP1318', N'Các phương pháp học thống kê', 3, N'Tự chọn', 1),
('COMP1316', N'Lập trình tiến hóa và thuật giải di truyền', 3, N'Tự chọn', 1),
('COMP1057', N'Logic mờ và ứng dụng', 3, N'Tự chọn', 1),
('COMP1714', N'Khai thác dữ liệu văn bản', 3, N'Tự chọn', 1),
('COMP1713', N'Các giải thuật tính toán đại số', 3, N'Tự chọn', 1),
('COMP1320', N'Đồ họa máy tính nâng cao', 3, N'Tự chọn', 1),
('COMP1715', N'Xử lý ngôn ngữ tự nhiên', 3, N'Tự chọn', 1),
('COMP1716', N'Lý thuyết mã hóa và mật mã', 3, N'Tự chọn', 1),
('COMP1710', N'Công nghệ chuỗi khối và ứng dụng', 3, N'Tự chọn', 1),
('COMP1032', N'Phân tích và thiết kế hệ thống thông tin', 3, N'Tự chọn', 1),
('COMP1041', N'Cơ sở dữ liệu nâng cao', 3, N'Tự chọn', 1),
('COMP1064', N'Công nghệ NET', 3, N'Tự chọn', 1),
('COMP1042', N'Công nghệ JAVA', 3, N'Tự chọn', 1),
('COMP1031', N'Công nghệ Web', 3, N'Tự chọn', 1),
('COMP1307', N'Kiểm thử phần mềm cơ bản', 3, N'Tự chọn', 1),
('COMP1049', N'Bảo mật và an ninh mạng', 3, N'Tự chọn', 1),
('COMP1310', N'Hệ tư vấn thông tin', 3, N'Tự chọn', 1),
('COMP1311', N'Bảo mật cơ sở dữ liệu', 3, N'Tự chọn', 1),
('COMP1085', N'Hệ thống quản trị doanh nghiệp', 3, N'Tự chọn', 1),
('COMP1306', N'Xây dựng dự án Công nghệ thông tin', 3, N'Tự chọn', 1),
('COMP1704', N'Nhập môn DevOps', 3, N'Tự chọn', 1),
('COMP1065', N'Chuyên đề Oracle', 3, N'Tự chọn', 1),
('COMP1506', N'Internet vạn vật', 3, N'Tự chọn', 1),
('COMP1077', N'Quản trị dịch vụ mạng với Windows Server', 3, N'Tự chọn', 1),
('COMP1804', N'Lập trình Python', 3, N'Tự chọn', 1),
('COMP1070', N'Quản trị cơ bản với Windows Server', 3, N'Tự chọn', 1),
('COMP1071', N'Nghi thức giao tiếp mạng (CISCO 1)', 3, N'Tự chọn', 1),
('COMP1072', N'Truyền thông kỹ thuật số', 3, N'Tự chọn', 1),
('COMP1326', N'Lắp ráp, cài đặt và bảo trì máy tính', 3, N'Tự chọn', 1),
('COMP1073', N'Chẩn đoán và quản lý sự cố mạng', 3, N'Tự chọn', 1),
('COMP1076', N'Quản trị mạng với Linux', 3, N'Tự chọn', 1),
('COMP1074', N'Định tuyến mạng nâng cao (CISCO 2)', 3, N'Tự chọn', 1),
('COMP1324', N'Phân tích dữ liệu', 3, N'Tự chọn', 1),
('COMP1504', N'Thị giác máy tính và ứng dụng', 3, N'Tự chọn', 1),
('COMP1325', N'Máy học nâng cao', 3, N'Tự chọn', 1),
('COMP1505', N'Phân tích ảnh y khoa', 3, N'Tự chọn', 1),
('COMP1309', N'Kiểm thử phần mềm nâng cao', 3, N'Tự chọn', 1),
('COMP1703', N'Phát triển ứng dụng trên thiết bị di động nâng cao', 3, N'Tự chọn', 1),
('COMP1084', N'Thương mại điện tử', 3, N'Tự chọn', 1),
('COMP1069', N'Công nghệ phần mềm nâng cao', 3, N'Tự chọn', 1),
('COMP1313', N'Điện toán đám mây', 3, N'Tự chọn', 1),
('COMP1080', N'Công nghệ mạng không dây', 3, N'Tự chọn', 1),
('COMP1809', N'Thực hành nghề nghiệp', 3, N'Bắt buộc', 1),
('COMP1410', N'Thực tập nghề nghiệp 1', 2, N'Bắt buộc', 1),
('COMP1811', N'Thực tập nghề nghiệp 2', 5, N'Bắt buộc', 1),
('COMP1083', N'Khóa luận tốt nghiệp', 6, N'Tự chọn', 1),
('COMP1813', N'Hồ sơ tốt nghiệp', 3, N'Tự chọn', 1),
('COMP1814', N'Sản phẩm nghiên cứu khoa học', 3, N'Tự chọn', 1)

INSERT INTO TrainingProgram_ModuleGroup_Subject(TrainingProgram_ModuleGroupId, SubjectId, SemesterId) VALUES
-- Ngành Giáo dục Mầm non
('GDMN.2021.NHP1', 'POLI2001', 'HK1'),
('GDMN.2021.NHP1', 'POLI2002', 'HK2'),
('GDMN.2021.NHP1', 'POLI2003', 'HK2'),
('GDMN.2021.NHP1', 'POLI2004', 'HK4'),
('GDMN.2021.NHP1', 'POLI2005', 'HK3'),
('GDMN.2021.NHP1', 'POLI1903', 'HK1'),
('GDMN.2021.NHP1', 'PSYC1001', 'HK1'),
('GDMN.2021.NHP1', 'PHYL2401', 'HK1'),
('GDMN.2021.NHP1', 'PHYL2405', 'HK2'),
('GDMN.2021.NHP1', 'PHYL2404', 'HK2'),
('GDMN.2021.NHP1', 'PHYL2403', 'HK2'),
('GDMN.2021.NHP1', 'PHYL2402', 'HK2'),
('GDMN.2021.NHP1', 'PHYL2410', 'HK2'),
('GDMN.2021.NHP1', 'PHYL2409', 'HK2'),
('GDMN.2021.NHP1', 'PHYL2408', 'HK2'),
('GDMN.2021.NHP1', 'PHYL2407', 'HK2'),
('GDMN.2021.NHP1', 'PHYL2406', 'HK2'),
('GDMN.2021.NHP1', 'PHYL2419', 'HK3'),
('GDMN.2021.NHP1', 'PHYL2418', 'HK3'),
('GDMN.2021.NHP1', 'PHYL2417', 'HK3'),
('GDMN.2021.NHP1', 'PHYL2416', 'HK3'),
('GDMN.2021.NHP1', 'PHYL2415', 'HK3'),
('GDMN.2021.NHP1', 'PHYL2414', 'HK3'),
('GDMN.2021.NHP1', 'PHYL2413', 'HK3'),
('GDMN.2021.NHP1', 'PHYL2412', 'HK3'),
('GDMN.2021.NHP1', 'PHYL2411', 'HK3'),
('GDMN.2021.NHP1', 'MILI2701', 'HK1'),
('GDMN.2021.NHP1', 'MILI2702', 'HK2'),
('GDMN.2021.NHP1', 'MILI2703', 'HK3'),
('GDMN.2021.NHP1', 'MILI2704', 'HK4'),
('GDMN.2021.NHP1', 'EDUC2801', 'HK3'),
('GDMN.2021.NHP1', 'PSYC1493', 'HK3'),
('GDMN.2021.NHP1', 'PSYC2801', 'HK3'),
('GDMN.2021.NHP1', 'COMP1810', 'HK3'),
('GDMN.2021.NHP1', 'DOMS0', 'HK3'),
('GDMN.2021.NHP2', 'LITR1800', 'HK5'),
('GDMN.2021.NHP2', 'EDUC1410', 'HK3'),
('GDMN.2021.NHP2', 'LITR1912', 'HK3'),
('GDMN.2021.NHP3', 'EARC1800', 'HK2'),
('GDMN.2021.NHP3', 'EDUT2801', 'HK4'),
('GDMN.2021.NHP3', 'EARC1825', 'HK3'),
('GDMN.2021.NHP3', 'EARC1829', 'HK2'),
('GDMN.2021.NHP3', 'EARC1828', 'HK3'),
('GDMN.2021.NHP3', 'EARC1805', 'HK1'),
('GDMN.2021.NHP3', 'EARC1807', 'HK1'),
('GDMN.2021.NHP3', 'EARC1806', 'HK1'),
('GDMN.2021.NHP3', 'EARC1011', 'HK1'),
('GDMN.2021.NHP3', 'EARC1416', 'HK2'),
('GDMN.2021.NHP3', 'EARC1417', 'HK3'),
('GDMN.2021.NHP3', 'EARC1418', 'HK3'),
('GDMN.2021.NHP3', 'EARC1021', 'HK4'),
('GDMN.2021.NHP3', 'EARC1831', 'HK5'),
('GDMN.2021.NHP3', 'EARC1037', 'HK5'),
('GDMN.2021.NHP3', 'EARC1327', 'HK5'),
('GDMN.2021.NHP3', 'EARC1832', 'HK4'),
('GDMN.2021.NHP3', 'EARC1830', 'HK4'),
('GDMN.2021.NHP3', 'EARC1501', 'HK2'),
('GDMN.2021.NHP3', 'EARC1801', 'HK2'),
('GDMN.2021.NHP3', 'EARC1802', 'HK2'),
('GDMN.2021.NHP4', 'EARC1322', 'HK6'),
('GDMN.2021.NHP4', 'EARC1336', 'HK7'),
('GDMN.2021.NHP4', 'EARC1337', 'HK7'),
('GDMN.2021.NHP4', 'EARC1424', 'HK7'),
('GDMN.2021.NHP4', 'EARC1019', 'HK4'),
('GDMN.2021.NHP4', 'EARC1020', 'HK4'),
('GDMN.2021.NHP5', 'EARC1318', 'HK5'),
('GDMN.2021.NHP5', 'EARC1030', 'HK7'),
('GDMN.2021.NHP5', 'EARC1824', 'HK5'),
('GDMN.2021.NHP5', 'EARC1826', 'HK5'),
('GDMN.2021.NHP5', 'EARC1026', 'HK7'),
('GDMN.2021.NHP5', 'EARC1028', 'HK6'),
('GDMN.2021.NHP5', 'EARC1029', 'HK6'),
('GDMN.2021.NHP5', 'EARC1400', 'HK1'),
('GDMN.2021.NHP5', 'EARC1307', 'HK4'),
('GDMN.2021.NHP5', 'EARC1309', 'HK3'),
('GDMN.2021.NHP5', 'EARC1022', 'HK2'),
('GDMN.2021.NHP5', 'EARC1321', 'HK6'),
('GDMN.2021.NHP5', 'EARC1323', 'HK6'),
('GDMN.2021.NHP5', 'EARC1334', 'HK6'),
('GDMN.2021.NHP5', 'EARC1033', 'HK6'),
('GDMN.2021.NHP6', 'EARC1044', 'HK4'),
('GDMN.2021.NHP6', 'EARC1045', 'HK6'),
('GDMN.2021.NHP6', 'EARC1046', 'HK8'),
('GDMN.2021.NHP7', 'EARC1051', 'HK8'),
('GDMN.2021.NHP7', 'EARC1803', 'HK8'),
('GDMN.2021.NHP7', 'EARC1804', 'HK8'),
-- Ngành Công nghệ thông tin
('CNTT.2021.NHP1', 'POLI2001', 'HK1'),
('CNTT.2021.NHP1', 'POLI2002', 'HK2'),
('CNTT.2021.NHP1', 'POLI2003', 'HK2'),
('CNTT.2021.NHP1', 'POLI2004', 'HK4'),
('CNTT.2021.NHP1', 'POLI2005', 'HK3'),
('CNTT.2021.NHP1', 'POLI1903', 'HK1'),
('CNTT.2021.NHP1', 'PSYC1001', 'HK1'),
('CNTT.2021.NHP1', 'PHYL2401', 'HK1'),
('CNTT.2021.NHP1', 'PHYL2405', 'HK2'),
('CNTT.2021.NHP1', 'PHYL2404', 'HK2'),
('CNTT.2021.NHP1', 'PHYL2403', 'HK2'),
('CNTT.2021.NHP1', 'PHYL2402', 'HK2'),
('CNTT.2021.NHP1', 'PHYL2410', 'HK2'),
('CNTT.2021.NHP1', 'PHYL2409', 'HK2'),
('CNTT.2021.NHP1', 'PHYL2408', 'HK2'),
('CNTT.2021.NHP1', 'PHYL2407', 'HK2'),
('CNTT.2021.NHP1', 'PHYL2406', 'HK2'),
('CNTT.2021.NHP1', 'PHYL2419', 'HK3'),
('CNTT.2021.NHP1', 'PHYL2418', 'HK3'),
('CNTT.2021.NHP1', 'PHYL2417', 'HK3'),
('CNTT.2021.NHP1', 'PHYL2416', 'HK3'),
('CNTT.2021.NHP1', 'PHYL2415', 'HK3'),
('CNTT.2021.NHP1', 'PHYL2414', 'HK3'),
('CNTT.2021.NHP1', 'PHYL2413', 'HK3'),
('CNTT.2021.NHP1', 'PHYL2412', 'HK3'),
('CNTT.2021.NHP1', 'PHYL2411', 'HK3'),
('CNTT.2021.NHP1', 'MILI2701', 'HK1'),
('CNTT.2021.NHP1', 'MILI2702', 'HK2'),
('CNTT.2021.NHP1', 'MILI2703', 'HK3'),
('CNTT.2021.NHP1', 'MILI2704', 'HK4'),
('CNTT.2021.NHP1', 'EDUC2801', 'HK2'),
('CNTT.2021.NHP1', 'PSYC1493', 'HK2'),
('CNTT.2021.NHP1', 'PSYC2801', 'HK2'),
('CNTT.2021.NHP1', 'COMP1810', 'HK3'),
('CNTT.2021.NHP1', 'DOMS0', 'HK2'),
('CNTT.2021.NHP2', 'COMP1801', 'HK1'),
('CNTT.2021.NHP2', 'COMP1501', 'HK3'),
('CNTT.2021.NHP2', 'COMP1802', 'HK1'),
('CNTT.2021.NHP2', 'COMP1800', 'HK1'),
('CNTT.2021.NHP3', 'COMP1010', 'HK1'),
('CNTT.2021.NHP3', 'COMP1013', 'HK2'),
('CNTT.2021.NHP3', 'COMP1017', 'HK2'),
('CNTT.2021.NHP3', 'COMP1701', 'HK3'),
('CNTT.2021.NHP3', 'COMP1502', 'HK4'),
('CNTT.2021.NHP3', 'COMP1332', 'HK4'),
('CNTT.2021.NHP3', 'COMP1011', 'HK4'),
('CNTT.2021.NHP3', 'COMP1018', 'HK3'),
('CNTT.2021.NHP3', 'COMP1016', 'HK3'),
('CNTT.2021.NHP3', 'COMP1015', 'HK4'),
('CNTT.2021.NHP3', 'COMP1401', 'HK4'),
('CNTT.2021.NHP3', 'COMP1019', 'HK3'),
('CNTT.2021.NHP3', 'PSYC2804', 'HK2'),
('CNTT.2021.NHP3', 'COMP1047', 'HK6'),
('CNTT.2021.NHP3', 'COMP1024', 'HK5'),
('CNTT.2021.NHP3', 'COMP1712', 'HK5'),
('CNTT.2021.NHP3', 'COMP1308', 'HK5'),
('CNTT.2021.NHP3', 'COMP1304', 'HK5'),
('CNTT.2021.NHP3', 'COMP1050', 'HK5'),
('CNTT.2021.NHP3', 'COMP1043', 'HK5'),
('CNTT.2021.NHP3', 'COMP1709', 'HK5'),
('CNTT.2021.NHP3', 'COMP1402', 'HK5'),
('CNTT.2021.NHP3', 'COMP1305', 'HK5'),
('CNTT.2021.NHP4', 'PSYC2803', 'HK7'),
('CNTT.2021.NHP5', 'COMP1314', 'HK5'),
('CNTT.2021.NHP5', 'COMP1044', 'HK5'),
('CNTT.2021.NHP5', 'COMP1060', 'HK5'),
('CNTT.2021.NHP5', 'COMP1803', 'HK6'),
('CNTT.2021.NHP5', 'COMP1029', 'HK5'),
('CNTT.2021.NHP5', 'COMP1025', 'HK6'),
('CNTT.2021.NHP5', 'COMP1046', 'HK6'),
('CNTT.2021.NHP5', 'COMP1315', 'HK6'),
('CNTT.2021.NHP5', 'COMP1318', 'HK6'),
('CNTT.2021.NHP5', 'COMP1316', 'HK6'),
('CNTT.2021.NHP5', 'COMP1057', 'HK6'),
('CNTT.2021.NHP5', 'COMP1714', 'HK6'),
('CNTT.2021.NHP5', 'COMP1713', 'HK6'),
('CNTT.2021.NHP5', 'COMP1320', 'HK7'),
('CNTT.2021.NHP5', 'COMP1715', 'HK6'),
('CNTT.2021.NHP5', 'COMP1716', 'HK6'),
('CNTT.2021.NHP5', 'COMP1710', 'HK6'),
('CNTT.2021.NHP5', 'COMP1032', 'HK5'),
('CNTT.2021.NHP5', 'COMP1041', 'HK5'),
('CNTT.2021.NHP5', 'COMP1064', 'HK6'),
('CNTT.2021.NHP5', 'COMP1042', 'HK6'),
('CNTT.2021.NHP5', 'COMP1031', 'HK6'),
('CNTT.2021.NHP5', 'COMP1307', 'HK5'),
('CNTT.2021.NHP5', 'COMP1049', 'HK6'),
('CNTT.2021.NHP5', 'COMP1310', 'HK6'),
('CNTT.2021.NHP5', 'COMP1311', 'HK6'),
('CNTT.2021.NHP5', 'COMP1085', 'HK6'),
('CNTT.2021.NHP5', 'COMP1306', 'HK6'),
('CNTT.2021.NHP5', 'COMP1704', 'HK6'),
('CNTT.2021.NHP5', 'COMP1065', 'HK6'),
('CNTT.2021.NHP5', 'COMP1506', 'HK6'),
('CNTT.2021.NHP5', 'COMP1077', 'HK6'),
('CNTT.2021.NHP5', 'COMP1804', 'HK5'),
('CNTT.2021.NHP5', 'COMP1070', 'HK5'),
('CNTT.2021.NHP5', 'COMP1071', 'HK5'),
('CNTT.2021.NHP5', 'COMP1072', 'HK6'),
('CNTT.2021.NHP5', 'COMP1326', 'HK6'),
('CNTT.2021.NHP5', 'COMP1073', 'HK6'),
('CNTT.2021.NHP5', 'COMP1076', 'HK6'),
('CNTT.2021.NHP5', 'COMP1074', 'HK6'),
('CNTT.2021.NHP5', 'COMP1324', 'HK7'),
('CNTT.2021.NHP5', 'COMP1504', 'HK7'),
('CNTT.2021.NHP5', 'COMP1325', 'HK7'),
('CNTT.2021.NHP5', 'COMP1505', 'HK7'),
('CNTT.2021.NHP5', 'COMP1309', 'HK7'),
('CNTT.2021.NHP5', 'COMP1703', 'HK7'),
('CNTT.2021.NHP5', 'COMP1084', 'HK7'),
('CNTT.2021.NHP5', 'COMP1069', 'HK7'),
('CNTT.2021.NHP5', 'COMP1313', 'HK7'),
('CNTT.2021.NHP5', 'COMP1080', 'HK7'),
('CNTT.2021.NHP6', 'COMP1809', 'HK6'),
('CNTT.2021.NHP6', 'COMP1410', 'HK7'),
('CNTT.2021.NHP6', 'COMP1811', 'HK8'),
('CNTT.2021.NHP7', 'COMP1083', 'HK8'),
('CNTT.2021.NHP7', 'COMP1813', 'HK8'),
('CNTT.2021.NHP7', 'COMP1814', 'HK8')

INSERT INTO ClassRoom(ClassRoomId, Sector, Floor, RoomType, Capacity) VALUES
('A.201', N'A', '2', N'Phòng lý thuyết', 40),
('A.202', N'A', '2', N'Phòng lý thuyết', 40),
('A.203', N'A', '2', N'Phòng lý thuyết', 40),
('A.204', N'A', '2', N'Phòng lý thuyết', 40),
('A.205', N'A', '2', N'Phòng lý thuyết', 40),
('A.301', N'A', '3', N'Phòng lý thuyết', 40),
('A.302', N'A', '3', N'Phòng lý thuyết', 40),
('A.303', N'A', '3', N'Phòng lý thuyết', 40),
('A.304', N'A', '3', N'Phòng lý thuyết', 40),
('A.305', N'A', '3', N'Phòng lý thuyết', 40),
('A.401', N'A', '4', N'Phòng lý thuyết', 40),
('A.402', N'A', '4', N'Phòng lý thuyết', 40),
('A.403', N'A', '4', N'Phòng lý thuyết', 40),
('A.404', N'A', '4', N'Phòng lý thuyết', 40),
('A.405', N'A', '4', N'Phòng lý thuyết', 40),
('A.501', N'A', '5', N'Phòng lý thuyết', 40),
('A.502', N'A', '5', N'Phòng lý thuyết', 40),
('A.503', N'A', '5', N'Phòng lý thuyết', 40),
('A.504', N'A', '5', N'Phòng lý thuyết', 40),
('A.505', N'A', '5', N'Phòng lý thuyết', 40),

('B.101', N'B', '1', N'Phòng lý thuyết', 40),
('B.102', N'B', '1', N'Phòng lý thuyết', 40),
('B.103', N'B', '1', N'Phòng lý thuyết', 40),
('B.104', N'B', '1', N'Phòng lý thuyết', 40),
('B.105', N'B', '1', N'Phòng lý thuyết', 40),
('B.201', N'B', '2', N'Phòng lý thuyết', 40),
('B.202', N'B', '2', N'Phòng lý thuyết', 40),
('B.203', N'B', '2', N'Phòng lý thuyết', 40),
('B.204', N'B', '2', N'Phòng lý thuyết', 40),
('B.205', N'B', '2', N'Phòng lý thuyết', 40),
('B.301', N'B', '3', N'Phòng lý thuyết', 40),
('B.302', N'B', '3', N'Phòng lý thuyết', 40),
('B.303', N'B', '3', N'Phòng lý thuyết', 40),
('B.304', N'B', '3', N'Phòng lý thuyết', 40),
('B.305', N'B', '3', N'Phòng lý thuyết', 40),
('B.401', N'B', '4', N'Phòng lý thuyết', 40),
('B.402', N'B', '4', N'Phòng lý thuyết', 40),
('B.403', N'B', '4', N'Phòng lý thuyết', 40),
('B.404', N'B', '4', N'Phòng lý thuyết', 40),
('B.405', N'B', '4', N'Phòng lý thuyết', 40),
('B.501', N'B', '5', N'Phòng lý thuyết', 40),
('B.502', N'B', '5', N'Phòng lý thuyết', 40),
('B.503', N'B', '5', N'Phòng lý thuyết', 40),
('B.504', N'B', '5', N'Phòng lý thuyết', 40),
('B.505', N'B', '5', N'Phòng lý thuyết', 40),

('C.201', N'C', '2', N'Phòng máy tính', 40),
('C.202', N'C', '2', N'Phòng máy tính', 40),
('C.203', N'C', '2', N'Phòng máy tính', 40),
('C.204', N'C', '2', N'Phòng máy tính', 40),
('C.205', N'C', '2', N'Phòng máy tính', 40),
('C.301', N'C', '3', N'Phòng máy tính', 40),
('C.302', N'C', '3', N'Phòng máy tính', 40),
('C.303', N'C', '3', N'Phòng máy tính', 40),
('C.304', N'C', '3', N'Phòng máy tính', 40),
('C.305', N'C', '3', N'Phòng máy tính', 40),
('C.401', N'C', '4', N'Phòng máy tính', 40),
('C.402', N'C', '4', N'Phòng máy tính', 40),
('C.403', N'C', '4', N'Phòng máy tính', 40),
('C.404', N'C', '4', N'Phòng máy tính', 40),
('C.405', N'C', '4', N'Phòng máy tính', 40),
('C.501', N'C', '5', N'Phòng máy tính', 40),
('C.502', N'C', '5', N'Phòng máy tính', 40),
('C.503', N'C', '5', N'Phòng máy tính', 40),
('C.504', N'C', '5', N'Phòng máy tính', 40),
('C.505', N'C', '5', N'Phòng máy tính', 40),

('D.101', N'D', '0', N'Giảng đường', 120),
('D.102', N'D', '0', N'Giảng đường', 120),
('D.103', N'D', '0', N'Giảng đường', 120),
('D.104', N'D', '0', N'Giảng đường', 120),
('D.105', N'D', '0', N'Giảng đường', 120),

('I.102', N'I', '1', N'Phòng máy tính', 40),
('I.103', N'I', '1', N'Phòng máy tính', 40),
('I.201', N'I', '2', N'Phòng máy tính', 40),
('I.202', N'I', '2', N'Phòng máy tính', 40),
('I.203', N'I', '2', N'Phòng máy tính', 40),

('CV.LTR', null, null, N'Công viên Lê Thị Riêng', null)

INSERT INTO ModuleClass(ModuleClassId, MaximumNumberOfStudents, LecturerId, SubjectId, SemesterId) VALUES
('COMP1010001', 40, null, 'COMP1010', 'HK1'),
('COMP1800001', 40, null, 'COMP1800', 'HK1'),
('COMP1801001', 40, null, 'COMP1801', 'HK1'),
('COMP1802001', 40, null, 'COMP1802', 'HK1'),
('MILI2701001', 40, null, 'MILI2701', 'HK1'),
('PHYL2401001', 40, null, 'PHYL2401', 'HK1'),
('POLI1903001', 40, null, 'POLI1903', 'HK1'),
('POLI2001001', 40, null, 'POLI2001', 'HK1'),
('PSYC1001001', 40, null, 'PSYC1001', 'HK1')

INSERT INTO ClassSchedule(ModuleClassId, DayOfWeek, LessonStart, LessonEnd, NumberOfWeek, StartDate, EndDate, ClassRoomId) VALUES
('COMP1010001', N'Thứ hai', 2, 6, 10, '2021-09-06', '2021-11-08', 'I.102'),
('COMP1800001', N'Thứ hai', 7, 11, 10, '2021-09-06', '2021-11-08', 'B.101'),
('COMP1801001', N'Thứ ba', 2, 6, 10, '2021-09-07', '2021-11-09', 'B.102'),
('COMP1802001', N'Thứ ba', 7, 11, 10, '2021-09-07', '2021-11-09', 'I.103'),
('MILI2701001', N'Thứ tư', 1, 6, 5, '2021-09-08', '2021-10-06', 'B.103'),
('PHYL2401001', N'Thứ tư', 7, 12, 10, '2021-09-08', '2021-11-10', 'CV.LTR'),
('POLI1903001', N'Thứ năm', 1, 6, 5, '2021-09-09', '2021-10-07', 'B.104'),
('POLI2001001', N'Thứ năm', 7, 12, 5, '2021-09-09', '2021-10-07', 'B.105'),
('PSYC1001001', N'Thứ sáu', 1, 6, 5, '2021-09-10', '2021-10-08', 'B.201')

INSERT INTO ModuleClass_TrainingProgram_Course(ModuleClassId, TrainingProgram_CourseId) VALUES
('COMP1010001', 'K47.CNTT.2021'),
('COMP1800001', 'K47.CNTT.2021'),
('COMP1801001', 'K47.CNTT.2021'),
('COMP1802001', 'K47.CNTT.2021'),
('MILI2701001', 'K47.CNTT.2021'),
('PHYL2401001', 'K47.CNTT.2021'),
('POLI1903001', 'K47.CNTT.2021'),
('POLI2001001', 'K47.CNTT.2021'),
('PSYC1001001', 'K47.CNTT.2021')

INSERT INTO CumulativePoint(CumulativePointId, TotalCredit, CreditPass, CreditFall, CumulativeCredit, CumulativeAverageGrade10, CumulativeAverageGrade4) VALUES 
('47.01.104.233', 0, 0, 0, 0, 0, 0)

INSERT INTO CourseRegistration(StudentId, ModuleClassId) VALUES
('47.01.104.233', 'COMP1010001'),
('47.01.104.233', 'COMP1800001'),
('47.01.104.233', 'COMP1801001'),
('47.01.104.233', 'COMP1802001'),
('47.01.104.233', 'MILI2701001'),
('47.01.104.233', 'PHYL2401001'),
('47.01.104.233', 'POLI1903001'),
('47.01.104.233', 'POLI2001001'),
('47.01.104.233', 'PSYC1001001')

UPDATE CourseRegistration 
SET MidtermGradePercentage = 0.4, FinalExamGradePercentage = 0.6, MidtermGrade = 9, FinalExamGrade = 5 
WHERE StudentId = '47.01.104.233'
AND ModuleClassId = 'COMP1010001'
UPDATE CourseRegistration 
SET MidtermGradePercentage = 0.4, FinalExamGradePercentage = 0.6, MidtermGrade = 10, FinalExamGrade = 8.5
WHERE StudentId = '47.01.104.233'
AND ModuleClassId = 'COMP1800001'
UPDATE CourseRegistration 
SET MidtermGradePercentage = 0.4, FinalExamGradePercentage = 0.6, MidtermGrade = 8, FinalExamGrade = 2
WHERE StudentId = '47.01.104.233'
AND ModuleClassId = 'COMP1801001'
UPDATE CourseRegistration 
SET MidtermGradePercentage = 0.4, FinalExamGradePercentage = 0.6, MidtermGrade = 5, FinalExamGrade = 2
WHERE StudentId = '47.01.104.233'
AND ModuleClassId = 'COMP1802001'
UPDATE CourseRegistration 
SET MidtermGradePercentage = 0.4, FinalExamGradePercentage = 0.6, MidtermGrade = 10, FinalExamGrade = 6.5
WHERE StudentId = '47.01.104.233'
AND ModuleClassId = 'MILI2701001'
UPDATE CourseRegistration 
SET MidtermGradePercentage = 0.4, FinalExamGradePercentage = 0.6, MidtermGrade = 8, FinalExamGrade = 7.5
WHERE StudentId = '47.01.104.233'
AND ModuleClassId = 'PHYL2401001'
UPDATE CourseRegistration 
SET MidtermGradePercentage = 0.4, FinalExamGradePercentage = 0.6, MidtermGrade = 9, FinalExamGrade = 9
WHERE StudentId = '47.01.104.233'
AND ModuleClassId = 'POLI1903001'
UPDATE CourseRegistration 
SET MidtermGradePercentage = 0.4, FinalExamGradePercentage = 0.6, MidtermGrade = 10, FinalExamGrade = 5.5
WHERE StudentId = '47.01.104.233'
AND ModuleClassId = 'POLI2001001'
UPDATE CourseRegistration 
SET MidtermGradePercentage = 0.4, FinalExamGradePercentage = 0.6, MidtermGrade = 8, FinalExamGrade = 8
WHERE StudentId = '47.01.104.233'
AND ModuleClassId = 'PSYC1001001'
