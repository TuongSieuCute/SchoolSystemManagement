using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace backend.Models;

public partial class SchoolSystemManagementContext : DbContext
{
    public SchoolSystemManagementContext()
    {
    }

    public SchoolSystemManagementContext(DbContextOptions<SchoolSystemManagementContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Account> Accounts { get; set; }

    public virtual DbSet<ClassRoom> ClassRooms { get; set; }

    public virtual DbSet<ClassSchedule> ClassSchedules { get; set; }

    public virtual DbSet<Course> Courses { get; set; }

    public virtual DbSet<CourseRegistration> CourseRegistrations { get; set; }

    public virtual DbSet<CumulativePoint> CumulativePoints { get; set; }

    public virtual DbSet<Department> Departments { get; set; }

    public virtual DbSet<Lecturer> Lecturers { get; set; }

    public virtual DbSet<Major> Majors { get; set; }

    public virtual DbSet<ModuleClass> ModuleClasses { get; set; }

    public virtual DbSet<ModuleClassTrainingProgramCourse> ModuleClassTrainingProgramCourses { get; set; }

    public virtual DbSet<ModuleGroup> ModuleGroups { get; set; }

    public virtual DbSet<ModuleType> ModuleTypes { get; set; }

    public virtual DbSet<Semester> Semesters { get; set; }

    public virtual DbSet<SemesterPeriod> SemesterPeriods { get; set; }

    public virtual DbSet<Student> Students { get; set; }

    public virtual DbSet<StudentClass> StudentClasses { get; set; }

    public virtual DbSet<Subject> Subjects { get; set; }

    public virtual DbSet<TrainingProgram> TrainingPrograms { get; set; }

    public virtual DbSet<TrainingProgramCourse> TrainingProgramCourses { get; set; }

    public virtual DbSet<TrainingProgramCourseStudent> TrainingProgramCourseStudents { get; set; }

    public virtual DbSet<TrainingProgramModuleGroup> TrainingProgramModuleGroups { get; set; }

    public virtual DbSet<TrainingProgramModuleGroupSubject> TrainingProgramModuleGroupSubjects { get; set; }

    public virtual DbSet<TuitionFee> TuitionFees { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Data Source=.;Initial Catalog=SchoolSystemManagement;Integrated Security=True;Trust Server Certificate=True");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Account>(entity =>
        {
            entity.HasKey(e => e.UserName).HasName("PK__Account__C9F28457AD826584");

            entity.ToTable("Account");

            entity.Property(e => e.UserName)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.Email)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.PasswordHash)
                .HasMaxLength(64)
                .IsUnicode(false);
            entity.Property(e => e.Role)
                .HasMaxLength(1)
                .IsUnicode(false)
                .IsFixedLength();
            entity.Property(e => e.Salt)
                .HasMaxLength(64)
                .IsUnicode(false);
        });

        modelBuilder.Entity<ClassRoom>(entity =>
        {
            entity.HasKey(e => e.ClassRoomId).HasName("PK__ClassRoo__742E1291BE936DAA");

            entity.ToTable("ClassRoom");

            entity.Property(e => e.ClassRoomId)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.Floor)
                .HasMaxLength(1)
                .IsUnicode(false)
                .IsFixedLength();
            entity.Property(e => e.RoomType).HasMaxLength(30);
            entity.Property(e => e.Sector).HasMaxLength(20);
        });

        modelBuilder.Entity<ClassSchedule>(entity =>
        {
            entity.HasKey(e => e.ScheduleId).HasName("PK__ClassSch__9C8A5B491F507464");

            entity.ToTable("ClassSchedule");

            entity.Property(e => e.ClassRoomId)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.DayOfWeek).HasMaxLength(20);
            entity.Property(e => e.ModuleClassId)
                .HasMaxLength(20)
                .IsUnicode(false);

            entity.HasOne(d => d.ClassRoom).WithMany(p => p.ClassSchedules)
                .HasForeignKey(d => d.ClassRoomId)
                .HasConstraintName("FK__ClassSche__Class__72C60C4A");

            entity.HasOne(d => d.ModuleClass).WithMany(p => p.ClassSchedules)
                .HasForeignKey(d => d.ModuleClassId)
                .HasConstraintName("FK__ClassSche__Modul__71D1E811");
        });

        modelBuilder.Entity<Course>(entity =>
        {
            entity.HasKey(e => e.CourseId).HasName("PK__Course__C92D71A7CB96BFC4");

            entity.ToTable("Course");

            entity.Property(e => e.CourseId)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.AcademicYear)
                .HasMaxLength(10)
                .IsUnicode(false)
                .IsFixedLength();
            entity.Property(e => e.CourseName).HasMaxLength(20);
        });

        modelBuilder.Entity<CourseRegistration>(entity =>
        {
            entity.HasKey(e => e.CourseRegistrationId).HasName("PK__CourseRe__A0FC0B762E561C11");

            entity.ToTable("CourseRegistration", tb =>
                {
                    tb.HasTrigger("trgAfterUpdateGrade");
                    tb.HasTrigger("trgInsertCourseRes");
                });

            entity.Property(e => e.AverageGrade10).HasColumnType("decimal(3, 1)");
            entity.Property(e => e.AverageGrade4).HasColumnType("decimal(2, 1)");
            entity.Property(e => e.FinalExamGrade).HasColumnType("decimal(3, 1)");
            entity.Property(e => e.FinalExamGradePercentage).HasColumnType("decimal(2, 1)");
            entity.Property(e => e.Literacy)
                .HasMaxLength(2)
                .IsUnicode(false)
                .IsFixedLength();
            entity.Property(e => e.MidtermGrade).HasColumnType("decimal(3, 1)");
            entity.Property(e => e.MidtermGradePercentage).HasColumnType("decimal(2, 1)");
            entity.Property(e => e.ModuleClassId)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.StudentId)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.Total).HasColumnType("decimal(10, 0)");
            entity.Property(e => e.TuitionFeesId)
                .HasMaxLength(20)
                .IsUnicode(false);

            entity.HasOne(d => d.ModuleClass).WithMany(p => p.CourseRegistrations)
                .HasForeignKey(d => d.ModuleClassId)
                .HasConstraintName("FK__CourseReg__Modul__7D439ABD");

            entity.HasOne(d => d.Student).WithMany(p => p.CourseRegistrations)
                .HasForeignKey(d => d.StudentId)
                .HasConstraintName("FK__CourseReg__Stude__7C4F7684");

            entity.HasOne(d => d.TuitionFees).WithMany(p => p.CourseRegistrations)
                .HasForeignKey(d => d.TuitionFeesId)
                .HasConstraintName("FK__CourseReg__Tuiti__7E37BEF6");
        });

        modelBuilder.Entity<CumulativePoint>(entity =>
        {
            entity.HasKey(e => e.CumulativePointId).HasName("PK__Cumulati__E43362A0DA2F9DF2");

            entity.ToTable("CumulativePoint");

            entity.Property(e => e.CumulativePointId)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.CumulativeAverageGrade10).HasColumnType("decimal(3, 1)");
            entity.Property(e => e.CumulativeAverageGrade4).HasColumnType("decimal(2, 1)");

            entity.HasOne(d => d.CumulativePointNavigation).WithOne(p => p.CumulativePoint)
                .HasForeignKey<CumulativePoint>(d => d.CumulativePointId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Cumulativ__Cumul__797309D9");
        });

        modelBuilder.Entity<Department>(entity =>
        {
            entity.HasKey(e => e.DepartmentId).HasName("PK__Departme__B2079BED2D2EB42E");

            entity.ToTable("Department");

            entity.Property(e => e.DepartmentId)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.DepartmentName).HasMaxLength(100);
        });

        modelBuilder.Entity<Lecturer>(entity =>
        {
            entity.HasKey(e => e.LecturerId).HasName("PK__Lecturer__5A78B93DA1876B0C");

            entity.ToTable("Lecturer");

            entity.Property(e => e.LecturerId)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.CitizenIdentification)
                .HasMaxLength(15)
                .IsUnicode(false)
                .IsFixedLength();
            entity.Property(e => e.Country).HasMaxLength(50);
            entity.Property(e => e.DepartmentId)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.DistrictCounty)
                .HasMaxLength(50)
                .HasColumnName("District_County");
            entity.Property(e => e.EthnicGroup).HasMaxLength(50);
            entity.Property(e => e.FullName).HasMaxLength(100);
            entity.Property(e => e.PhoneNumber)
                .HasMaxLength(10)
                .IsUnicode(false)
                .IsFixedLength();
            entity.Property(e => e.PlaceOfBirth).HasMaxLength(50);
            entity.Property(e => e.Religion).HasMaxLength(50);
            entity.Property(e => e.StateProvince)
                .HasMaxLength(50)
                .HasColumnName("State_Province");
            entity.Property(e => e.UrlImage)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.WardCommune)
                .HasMaxLength(50)
                .HasColumnName("Ward_Commune");

            entity.HasOne(d => d.Department).WithMany(p => p.Lecturers)
                .HasForeignKey(d => d.DepartmentId)
                .HasConstraintName("FK__Lecturer__Depart__47DBAE45");

            entity.HasOne(d => d.LecturerNavigation).WithOne(p => p.Lecturer)
                .HasForeignKey<Lecturer>(d => d.LecturerId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Lecturer__Lectur__46E78A0C");
        });

        modelBuilder.Entity<Major>(entity =>
        {
            entity.HasKey(e => e.MajorId).HasName("PK__Major__D5B8BF91C92C962F");

            entity.ToTable("Major");

            entity.Property(e => e.MajorId)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.DepartmentId)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.MajorName).HasMaxLength(100);

            entity.HasOne(d => d.Department).WithMany(p => p.Majors)
                .HasForeignKey(d => d.DepartmentId)
                .HasConstraintName("FK__Major__Departmen__4222D4EF");
        });

        modelBuilder.Entity<ModuleClass>(entity =>
        {
            entity.HasKey(e => e.ModuleClassId).HasName("PK__ModuleCl__B6EAAD82594A679D");

            entity.ToTable("ModuleClass");

            entity.Property(e => e.ModuleClassId)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.LecturerId)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.SemesterId)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.SubjectId)
                .HasMaxLength(20)
                .IsUnicode(false);

            entity.HasOne(d => d.Lecturer).WithMany(p => p.ModuleClasses)
                .HasForeignKey(d => d.LecturerId)
                .HasConstraintName("FK__ModuleCla__Lectu__6D0D32F4");

            entity.HasOne(d => d.Semester).WithMany(p => p.ModuleClasses)
                .HasForeignKey(d => d.SemesterId)
                .HasConstraintName("FK__ModuleCla__Semes__6EF57B66");

            entity.HasOne(d => d.Subject).WithMany(p => p.ModuleClasses)
                .HasForeignKey(d => d.SubjectId)
                .HasConstraintName("FK__ModuleCla__Subje__6E01572D");
        });

        modelBuilder.Entity<ModuleClassTrainingProgramCourse>(entity =>
        {
            entity.HasKey(e => e.ModuleClassTrainingProgramCourseId).HasName("PK__ModuleCl__0C39FA78898D1452");

            entity.ToTable("ModuleClass_TrainingProgram_Course");

            entity.Property(e => e.ModuleClassTrainingProgramCourseId).HasColumnName("ModuleClass_TrainingProgram_CourseId");
            entity.Property(e => e.ModuleClassId)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.TrainingProgramCourseId)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("TrainingProgram_CourseId");

            entity.HasOne(d => d.ModuleClass).WithMany(p => p.ModuleClassTrainingProgramCourses)
                .HasForeignKey(d => d.ModuleClassId)
                .HasConstraintName("FK__ModuleCla__Modul__75A278F5");

            entity.HasOne(d => d.TrainingProgramCourse).WithMany(p => p.ModuleClassTrainingProgramCourses)
                .HasForeignKey(d => d.TrainingProgramCourseId)
                .HasConstraintName("FK__ModuleCla__Train__76969D2E");
        });

        modelBuilder.Entity<ModuleGroup>(entity =>
        {
            entity.HasKey(e => e.ModuleGroupId).HasName("PK__ModuleGr__897B9013546344F4");

            entity.ToTable("ModuleGroup");

            entity.Property(e => e.ModuleGroupId)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.ModuleGroupName).HasMaxLength(100);
            entity.Property(e => e.ModuleTypeId)
                .HasMaxLength(20)
                .IsUnicode(false);

            entity.HasOne(d => d.ModuleType).WithMany(p => p.ModuleGroups)
                .HasForeignKey(d => d.ModuleTypeId)
                .HasConstraintName("FK__ModuleGro__Modul__5535A963");
        });

        modelBuilder.Entity<ModuleType>(entity =>
        {
            entity.HasKey(e => e.ModuleTypeId).HasName("PK__ModuleTy__5EBC4F0C4AEEEDCD");

            entity.ToTable("ModuleType");

            entity.Property(e => e.ModuleTypeId)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.ModuleTypeName).HasMaxLength(100);
        });

        modelBuilder.Entity<Semester>(entity =>
        {
            entity.HasKey(e => e.SemesterId).HasName("PK__Semester__043301DD7C296273");

            entity.ToTable("Semester");

            entity.Property(e => e.SemesterId)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.SemesterName).HasMaxLength(20);
        });

        modelBuilder.Entity<SemesterPeriod>(entity =>
        {
            entity.HasKey(e => e.SemesterPeriodId).HasName("PK__Semester__DDD0DF62359FCCBB");

            entity.ToTable("SemesterPeriod");

            entity.Property(e => e.AcademicYear)
                .HasMaxLength(10)
                .IsUnicode(false)
                .IsFixedLength();
            entity.Property(e => e.SemesterId)
                .HasMaxLength(20)
                .IsUnicode(false);

            entity.HasOne(d => d.Semester).WithMany(p => p.SemesterPeriods)
                .HasForeignKey(d => d.SemesterId)
                .HasConstraintName("FK__SemesterP__Semes__3D5E1FD2");
        });

        modelBuilder.Entity<Student>(entity =>
        {
            entity.HasKey(e => e.StudentId).HasName("PK__Student__32C52B990DFC016C");

            entity.ToTable("Student");

            entity.Property(e => e.StudentId)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.AcademicStatus).HasMaxLength(30);
            entity.Property(e => e.CitizenIdentification)
                .HasMaxLength(15)
                .IsUnicode(false)
                .IsFixedLength();
            entity.Property(e => e.Country).HasMaxLength(50);
            entity.Property(e => e.DistrictCounty)
                .HasMaxLength(50)
                .HasColumnName("District_County");
            entity.Property(e => e.EthnicGroup).HasMaxLength(50);
            entity.Property(e => e.FullName).HasMaxLength(100);
            entity.Property(e => e.PhoneNumber)
                .HasMaxLength(10)
                .IsUnicode(false)
                .IsFixedLength();
            entity.Property(e => e.PlaceOfBirth).HasMaxLength(50);
            entity.Property(e => e.Religion).HasMaxLength(50);
            entity.Property(e => e.StateProvince)
                .HasMaxLength(50)
                .HasColumnName("State_Province");
            entity.Property(e => e.StudentClassId)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.TypeStudent).HasMaxLength(30);
            entity.Property(e => e.UnionParty).HasColumnName("Union_Party");
            entity.Property(e => e.UrlImage)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.WardCommune)
                .HasMaxLength(50)
                .HasColumnName("Ward_Commune");

            entity.HasOne(d => d.StudentClass).WithMany(p => p.Students)
                .HasForeignKey(d => d.StudentClassId)
                .HasConstraintName("FK__Student__Student__5070F446");

            entity.HasOne(d => d.StudentNavigation).WithOne(p => p.Student)
                .HasForeignKey<Student>(d => d.StudentId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Student__Student__4F7CD00D");
        });

        modelBuilder.Entity<StudentClass>(entity =>
        {
            entity.HasKey(e => e.StudentClassId).HasName("PK__StudentC__2FF121470E4A9984");

            entity.ToTable("StudentClass");

            entity.Property(e => e.StudentClassId)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.CourseId)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.LecturerId)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.MajorId)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.StudentClassName).HasMaxLength(100);

            entity.HasOne(d => d.Course).WithMany(p => p.StudentClasses)
                .HasForeignKey(d => d.CourseId)
                .HasConstraintName("FK__StudentCl__Cours__4BAC3F29");

            entity.HasOne(d => d.Lecturer).WithMany(p => p.StudentClasses)
                .HasForeignKey(d => d.LecturerId)
                .HasConstraintName("FK__StudentCl__Lectu__4AB81AF0");

            entity.HasOne(d => d.Major).WithMany(p => p.StudentClasses)
                .HasForeignKey(d => d.MajorId)
                .HasConstraintName("FK__StudentCl__Major__4CA06362");
        });

        modelBuilder.Entity<Subject>(entity =>
        {
            entity.HasKey(e => e.SubjectId).HasName("PK__Subject__AC1BA3A8B383AFFD");

            entity.ToTable("Subject");

            entity.Property(e => e.SubjectId)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.IsCreditGpa).HasColumnName("IsCredit_GPA");
            entity.Property(e => e.SubjectName).HasMaxLength(100);
            entity.Property(e => e.SubjectType).HasMaxLength(30);
        });

        modelBuilder.Entity<TrainingProgram>(entity =>
        {
            entity.HasKey(e => e.TrainingProgramId).HasName("PK__Training__4F897A5D5F6D9886");

            entity.ToTable("TrainingProgram");

            entity.Property(e => e.TrainingProgramId)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.MajorId)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.TrainingProgramName).HasMaxLength(100);

            entity.HasOne(d => d.Major).WithMany(p => p.TrainingPrograms)
                .HasForeignKey(d => d.MajorId)
                .HasConstraintName("FK__TrainingP__Major__5812160E");
        });

        modelBuilder.Entity<TrainingProgramCourse>(entity =>
        {
            entity.HasKey(e => e.TrainingProgramCourseId).HasName("PK__Training__B3C2FC5D8784B75F");

            entity.ToTable("TrainingProgram_Course", tb => tb.HasTrigger("trgInsertTrainingProgram_Course"));

            entity.Property(e => e.TrainingProgramCourseId)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("TrainingProgram_CourseId");
            entity.Property(e => e.CourseId)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.TrainingProgramId)
                .HasMaxLength(20)
                .IsUnicode(false);

            entity.HasOne(d => d.Course).WithMany(p => p.TrainingProgramCourses)
                .HasForeignKey(d => d.CourseId)
                .HasConstraintName("FK__TrainingP__Cours__5BE2A6F2");

            entity.HasOne(d => d.TrainingProgram).WithMany(p => p.TrainingProgramCourses)
                .HasForeignKey(d => d.TrainingProgramId)
                .HasConstraintName("FK__TrainingP__Train__5AEE82B9");
        });

        modelBuilder.Entity<TrainingProgramCourseStudent>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("TrainingProgram_Course_Student");

            entity.Property(e => e.StudentId)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.TrainingProgramCourseId)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("TrainingProgram_CourseId");

            entity.HasOne(d => d.Student).WithMany()
                .HasForeignKey(d => d.StudentId)
                .HasConstraintName("FK__TrainingP__Stude__5EBF139D");

            entity.HasOne(d => d.TrainingProgramCourse).WithMany()
                .HasForeignKey(d => d.TrainingProgramCourseId)
                .HasConstraintName("FK__TrainingP__Train__5DCAEF64");
        });

        modelBuilder.Entity<TrainingProgramModuleGroup>(entity =>
        {
            entity.HasKey(e => e.TrainingProgramModuleGroupId).HasName("PK__Training__680A19D48818E051");

            entity.ToTable("TrainingProgram_ModuleGroup", tb => tb.HasTrigger("trgInsertTrainingProgram_ModuleGroup"));

            entity.Property(e => e.TrainingProgramModuleGroupId)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("TrainingProgram_ModuleGroupId");
            entity.Property(e => e.ModuleGroupId)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.TrainingProgramId)
                .HasMaxLength(20)
                .IsUnicode(false);

            entity.HasOne(d => d.ModuleGroup).WithMany(p => p.TrainingProgramModuleGroups)
                .HasForeignKey(d => d.ModuleGroupId)
                .HasConstraintName("FK__TrainingP__Modul__628FA481");

            entity.HasOne(d => d.TrainingProgram).WithMany(p => p.TrainingProgramModuleGroups)
                .HasForeignKey(d => d.TrainingProgramId)
                .HasConstraintName("FK__TrainingP__Train__619B8048");
        });

        modelBuilder.Entity<TrainingProgramModuleGroupSubject>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("TrainingProgram_ModuleGroup_Subject");

            entity.Property(e => e.SemesterId)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.SubjectId)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.TrainingProgramModuleGroupId)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("TrainingProgram_ModuleGroupId");

            entity.HasOne(d => d.Semester).WithMany()
                .HasForeignKey(d => d.SemesterId)
                .HasConstraintName("FK__TrainingP__Semes__68487DD7");

            entity.HasOne(d => d.Subject).WithMany()
                .HasForeignKey(d => d.SubjectId)
                .HasConstraintName("FK__TrainingP__Subje__6754599E");

            entity.HasOne(d => d.TrainingProgramModuleGroup).WithMany()
                .HasForeignKey(d => d.TrainingProgramModuleGroupId)
                .HasConstraintName("FK__TrainingP__Train__66603565");
        });

        modelBuilder.Entity<TuitionFee>(entity =>
        {
            entity.HasKey(e => e.TuitionFeesId).HasName("PK__TuitionF__6F98818B4AC484BF");

            entity.Property(e => e.TuitionFeesId)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.AmountPerCredit).HasColumnType("decimal(10, 2)");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
