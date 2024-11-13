CREATE DATABASE SchoolSystemManagement
GO

USE SchoolSystemManagement
GO

-- Bang Hoc phi
CREATE TABLE TuitionFees
(
    TuitionFeesId VARCHAR(20) PRIMARY KEY,
    AmountPerCredit DECIMAL(10,2), -- Tien tren moi tin chi
)
GO

CREATE TABLE Course 
(
    CourseId VARCHAR(20) PRIMARY KEY,
    CourseName NVARCHAR(20),
	AcademicYear CHAR(10),
)

-- Bang Hoc ky
CREATE TABLE Semester
(
    SemesterId VARCHAR(20) PRIMARY KEY,
    SemesterName NVARCHAR(20)
)

CREATE TABLE SemesterPeriod
(
	SemesterPeriodId INT IDENTITY(1,1) PRIMARY KEY,
	AcademicYear CHAR(10),
	StartDate DATE,
	EndDate DATE,
	SemesterId VARCHAR(20),

	FOREIGN KEY(SemesterId) REFERENCES Semester(SemesterId),
)

CREATE TABLE Department 
(
    DepartmentId VARCHAR(20) PRIMARY KEY,
    DepartmentName NVARCHAR(100),
)

CREATE TABLE Major
(
    MajorId VARCHAR(20) PRIMARY KEY,
    MajorName NVARCHAR(100),
    DepartmentId VARCHAR(20),

	FOREIGN KEY(DepartmentId) REFERENCES Department(DepartmentId),
)

CREATE TABLE Account
(
    UserName VARCHAR(20) PRIMARY KEY,
    PasswordHash VARCHAR(64),
    Salt VARCHAR(64),
    Role CHAR(1),
    IsActive BIT, -- Tinh trang hoat dong
	Email VARCHAR(50),
)

CREATE TABLE Lecturer 
(
    LecturerId VARCHAR(20) PRIMARY KEY,
    FullName NVARCHAR(100),
	UrlImage VARCHAR(100),
    DateOfBirth DATE,
    PlaceOfBirth NVARCHAR(50),
    Gender BIT,
    EthnicGroup NVARCHAR(50), -- Dan toc
    CitizenIdentification CHAR(15), -- CCCD
    Religion NVARCHAR(50),
    Country NVARCHAR(50),
    State_Province NVARCHAR(50),
    District_County NVARCHAR(50),
    Ward_Commune NVARCHAR(50),
    PhoneNumber CHAR(10),
    DepartmentId VARCHAR(20),

    FOREIGN KEY(LecturerId) REFERENCES Account(UserName),
    FOREIGN KEY(DepartmentId) REFERENCES Department(DepartmentId),
)

CREATE TABLE StudentClass 
(
	StudentClassId VARCHAR(20) PRIMARY KEY,
	StudentClassName NVARCHAR(100),
    LecturerId VARCHAR(20),
    CourseId VARCHAR(20),
	MajorId VARCHAR(20),
	
	FOREIGN KEY(LecturerId) REFERENCES Lecturer(LecturerId),
	FOREIGN KEY(CourseId) REFERENCES Course(CourseId),
	FOREIGN KEY(MajorId) REFERENCES Major(MajorId),
)

CREATE TABLE Student 
(
    StudentId VARCHAR(20) PRIMARY KEY,
    FullName NVARCHAR(100),
	UrlImage VARCHAR(100),
    DateOfBirth DATE,
    PlaceOfBirth NVARCHAR(50),
    Gender BIT,
    EthnicGroup NVARCHAR(50),
    CitizenIdentification CHAR(15),
    Religion NVARCHAR(50),
    Union_Party BIT, -- Dang/Doan
    TypeStudent NVARCHAR(30),
    AcademicStatus NVARCHAR(30), -- Tinh trang hoc tap
    Country NVARCHAR(50),
    State_Province NVARCHAR(50),
    District_County NVARCHAR(50),
    Ward_Commune NVARCHAR(50),
    PhoneNumber CHAR(10),
    StudentClassId VARCHAR(20),

	FOREIGN KEY(StudentId) REFERENCES Account(UserName),
	FOREIGN KEY(StudentClassId) REFERENCES StudentClass(StudentClassId),
)

-- Loai hoc phan
CREATE TABLE ModuleType
(
    ModuleTypeId VARCHAR(20) PRIMARY KEY,
    ModuleTypeName NVARCHAR(100),
)

-- Nhom hoc phan
CREATE TABLE ModuleGroup
(
    ModuleGroupId VARCHAR(20) PRIMARY KEY,
    ModuleGroupName NVARCHAR(100),
    ModuleTypeId VARCHAR(20),

	FOREIGN KEY(ModuleTypeId) REFERENCES ModuleType(ModuleTypeId),
)

-- Chuong trinh dao tao
CREATE TABLE TrainingProgram
(
    TrainingProgramId VARCHAR(20) PRIMARY KEY,
    TrainingProgramName NVARCHAR(100),
    MajorId VARCHAR(20),

	FOREIGN KEY(MajorId) REFERENCES Major(MajorId),
)

CREATE TABLE TrainingProgram_Course
(
    TrainingProgram_CourseId VARCHAR(20) PRIMARY KEY,
    TrainingProgramId VARCHAR(20),
    CourseId VARCHAR(20),

	FOREIGN KEY(TrainingProgramId) REFERENCES TrainingProgram(TrainingProgramId),
	FOREIGN KEY(CourseId) REFERENCES Course(CourseId),
)

CREATE TABLE TrainingProgram_ModuleGroup
(
    TrainingProgram_ModuleGroupId VARCHAR(20) PRIMARY KEY,
	NumberOfElectiveCredits TINYINT, -- So tin chi tu chon
    TrainingProgramId VARCHAR(20),
    ModuleGroupId VARCHAR(20),

	FOREIGN KEY(TrainingProgramId) REFERENCES TrainingProgram(TrainingProgramId),
	FOREIGN KEY(ModuleGroupId) REFERENCES ModuleGroup(ModuleGroupId),
)

CREATE TABLE Subject
(
    SubjectId VARCHAR(20) PRIMARY KEY,
    SubjectName NVARCHAR(100),
    NumberOfCredit TINYINT,
    SubjectType NVARCHAR(30),
    IsCredit_GPA BIT, -- Mon hoc co tinh vao so tin chi va GPA
)

CREATE TABLE TrainingProgram_ModuleGroup_Subject
(
    TrainingProgram_ModuleGroupId VARCHAR(20),
    SubjectId VARCHAR(20),
    SemesterId VARCHAR(20),

	FOREIGN KEY(TrainingProgram_ModuleGroupId) REFERENCES TrainingProgram_ModuleGroup(TrainingProgram_ModuleGroupId),
	FOREIGN KEY(SubjectId) REFERENCES Subject(SubjectId),
    FOREIGN KEY(SemesterId) REFERENCES Semester(SemesterId),
)

CREATE TABLE ClassRoom
(
    ClassRoomId VARCHAR(20) PRIMARY KEY,
    Sector NVARCHAR(20), -- Khu vuc
    Floor CHAR(1),
	RoomType NVARCHAR(30),
	Capacity TINYINT,
)

-- Bang Lop hoc phan
CREATE TABLE ModuleClass
(
    ModuleClassId VARCHAR(20) PRIMARY KEY,
    MaximumNumberOfStudents TINYINT, -- So luong sinh vien toi da
    LecturerId VARCHAR(20),
    SubjectId VARCHAR(20),

	FOREIGN KEY(LecturerId) REFERENCES Lecturer(LecturerId),
	FOREIGN KEY(SubjectId) REFERENCES Subject(SubjectId),
)

CREATE TABLE ClassSchedule
(
    ScheduleId INT IDENTITY(1,1) PRIMARY KEY,
    ModuleClassId VARCHAR(20),
    DayOfWeek NVARCHAR(20),
    LessonStart TINYINT,
    LessonEnd TINYINT,
    NumberOfWeek TINYINT,
    StartDate DATE,
    EndDate DATE,
	ClassRoomId VARCHAR(20),

    FOREIGN KEY(ModuleClassId) REFERENCES ModuleClass(ModuleClassId),
	FOREIGN KEY(ClassRoomId) REFERENCES ClassRoom(ClassRoomId),
)

-- Diem tich luy
CREATE TABLE CumulativePoint
(
    CumulativePointId INT IDENTITY(1,1) PRIMARY KEY, 
	TrainingProgram_CourseId VARCHAR(20),
	StudentId VARCHAR(20),
    TotalCredit TINYINT, -- Tong so tin chi dang ki
	CreditPass TINYINT, -- So tin chi dat
	CreditFall TINYINT, -- So tin chi rot
	CumulativeCredit TINYINT, -- So tin chi tich luy
	CumulativeAverageGrade10 DECIMAL(3,1), -- Diem TB tich luy he 10
	CumulativeAverageGrade4 DECIMAL(2,1), -- Diem TB tich luy he 4

	FOREIGN KEY(TrainingProgram_CourseId) REFERENCES TrainingProgram_Course(TrainingProgram_CourseId),
	FOREIGN KEY(StudentId) REFERENCES Student(StudentId),
)

-- Bang Dang ki hoc phan
CREATE TABLE CourseRegistration
(
    CourseRegistrationId INT IDENTITY(1,1) PRIMARY KEY,
    MidtermGradePercentage DECIMAL(2,1), -- % Diem GK
    FinalExamGradePercentage DECIMAL(2,1), -- % Diem CK
    MidtermGrade DECIMAL(3,1), -- Diem GK
    FinalExamGrade DECIMAL(3,1), -- Diem CK
    AverageGrade10 DECIMAL(3,1), -- Diem TB he 10
    AverageGrade4 DECIMAL(2,1), -- Diem TB he 4
    Literacy char(2), -- Diem chu
	IsPass BIT,
    StudentId VARCHAR(20),
    ModuleClassId VARCHAR(20),
    TuitionFeesId VARCHAR(20),
    Total DECIMAL(10,0),

	FOREIGN KEY(StudentId) REFERENCES Student(StudentId),
	FOREIGN KEY(ModuleClassId) REFERENCES ModuleClass(ModuleClassId),
    FOREIGN KEY(TuitionFeesId) REFERENCES TuitionFees(TuitionFeesId),
)
