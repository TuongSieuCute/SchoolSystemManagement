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

    public virtual DbSet<InstructionalPlan> InstructionalPlans { get; set; }

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
            entity.HasKey(e => e.UserName).HasName("PK__Account__C9F284573A6C9721");

            entity.ToTable("Account");

            entity.Property(e => e.UserName)
                .HasMaxLength(15)
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
            entity.HasKey(e => e.ClassRoomId).HasName("PK__ClassRoo__742E1291C1E4F101");

            entity.ToTable("ClassRoom");

            entity.Property(e => e.ClassRoomId)
                .HasMaxLength(15)
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
            entity.HasKey(e => e.ScheduleId).HasName("PK__ClassSch__9C8A5B498C53BAEE");

            entity.ToTable("ClassSchedule");

            entity.Property(e => e.ClassRoomId)
                .HasMaxLength(15)
                .IsUnicode(false);
            entity.Property(e => e.DayOfWeek).HasMaxLength(20);
            entity.Property(e => e.ModuleClassId)
                .HasMaxLength(15)
                .IsUnicode(false);

            entity.HasOne(d => d.ClassRoom).WithMany(p => p.ClassSchedules)
                .HasForeignKey(d => d.ClassRoomId)
                .HasConstraintName("FK__ClassSche__Class__74AE54BC");

            entity.HasOne(d => d.ModuleClass).WithMany(p => p.ClassSchedules)
                .HasForeignKey(d => d.ModuleClassId)
                .HasConstraintName("FK__ClassSche__Modul__73BA3083");
        });

        modelBuilder.Entity<Course>(entity =>
        {
            entity.HasKey(e => e.CourseId).HasName("PK__Course__C92D71A71DC7CF21");

            entity.ToTable("Course");

            entity.Property(e => e.CourseId)
                .HasMaxLength(15)
                .IsUnicode(false);
            entity.Property(e => e.AcademicYear)
                .HasMaxLength(10)
                .IsUnicode(false)
                .IsFixedLength();
            entity.Property(e => e.CourseName).HasMaxLength(20);
        });

        modelBuilder.Entity<CourseRegistration>(entity =>
        {
            entity.HasKey(e => e.CourseRegistrationId).HasName("PK__CourseRe__A0FC0B761866A3B0");

            entity.ToTable("CourseRegistration");

            entity.Property(e => e.CourseRegistrationId)
                .HasMaxLength(15)
                .IsUnicode(false);
            entity.Property(e => e.AverageGrade10).HasColumnType("decimal(4, 2)");
            entity.Property(e => e.AverageGrade4).HasColumnType("decimal(4, 2)");
            entity.Property(e => e.CumulativePointId)
                .HasMaxLength(15)
                .IsUnicode(false);
            entity.Property(e => e.FinalExamGrade).HasColumnType("decimal(4, 2)");
            entity.Property(e => e.FinalExamGradePercentage).HasColumnType("decimal(2, 2)");
            entity.Property(e => e.Literacy)
                .HasMaxLength(2)
                .IsUnicode(false)
                .IsFixedLength();
            entity.Property(e => e.MidtermGrade).HasColumnType("decimal(4, 2)");
            entity.Property(e => e.MidtermGradePercentage).HasColumnType("decimal(2, 2)");
            entity.Property(e => e.ModuleClassId)
                .HasMaxLength(15)
                .IsUnicode(false);
            entity.Property(e => e.StudentId)
                .HasMaxLength(15)
                .IsUnicode(false);

            entity.HasOne(d => d.CumulativePoint).WithMany(p => p.CourseRegistrations)
                .HasForeignKey(d => d.CumulativePointId)
                .HasConstraintName("FK__CourseReg__Cumul__00200768");

            entity.HasOne(d => d.ModuleClass).WithMany(p => p.CourseRegistrations)
                .HasForeignKey(d => d.ModuleClassId)
                .HasConstraintName("FK__CourseReg__Modul__7F2BE32F");

            entity.HasOne(d => d.Student).WithMany(p => p.CourseRegistrations)
                .HasForeignKey(d => d.StudentId)
                .HasConstraintName("FK__CourseReg__Stude__7E37BEF6");
        });

        modelBuilder.Entity<CumulativePoint>(entity =>
        {
            entity.HasKey(e => e.CumulativePointId).HasName("PK__Cumulati__E43362A0903DE659");

            entity.ToTable("CumulativePoint");

            entity.Property(e => e.CumulativePointId)
                .HasMaxLength(15)
                .IsUnicode(false);
            entity.Property(e => e.CumulativeGpa)
                .HasColumnType("decimal(4, 2)")
                .HasColumnName("CumulativeGPA");
            entity.Property(e => e.StudentId)
                .HasMaxLength(15)
                .IsUnicode(false);

            entity.HasOne(d => d.Student).WithMany(p => p.CumulativePoints)
                .HasForeignKey(d => d.StudentId)
                .HasConstraintName("FK__Cumulativ__Stude__7B5B524B");
        });

        modelBuilder.Entity<Department>(entity =>
        {
            entity.HasKey(e => e.DepartmentId).HasName("PK__Departme__B2079BED77EE0EEC");

            entity.ToTable("Department");

            entity.Property(e => e.DepartmentId)
                .HasMaxLength(15)
                .IsUnicode(false);
            entity.Property(e => e.DepartmentName).HasMaxLength(100);
        });

        modelBuilder.Entity<InstructionalPlan>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("InstructionalPlan");

            entity.Property(e => e.SemesterId)
                .HasMaxLength(15)
                .IsUnicode(false);
            entity.Property(e => e.SubjectId)
                .HasMaxLength(15)
                .IsUnicode(false);
            entity.Property(e => e.TrainingProgramCourseId)
                .HasMaxLength(15)
                .IsUnicode(false)
                .HasColumnName("TrainingProgram_CourseId");

            entity.HasOne(d => d.Semester).WithMany()
                .HasForeignKey(d => d.SemesterId)
                .HasConstraintName("FK__Instructi__Semes__693CA210");

            entity.HasOne(d => d.Subject).WithMany()
                .HasForeignKey(d => d.SubjectId)
                .HasConstraintName("FK__Instructi__Subje__6A30C649");

            entity.HasOne(d => d.TrainingProgramCourse).WithMany()
                .HasForeignKey(d => d.TrainingProgramCourseId)
                .HasConstraintName("FK__Instructi__Train__68487DD7");
        });

        modelBuilder.Entity<Lecturer>(entity =>
        {
            entity.HasKey(e => e.LecturerId).HasName("PK__Lecturer__5A78B93DEFE1D480");

            entity.ToTable("Lecturer");

            entity.Property(e => e.LecturerId)
                .HasMaxLength(15)
                .IsUnicode(false);
            entity.Property(e => e.CitizenIdentification)
                .HasMaxLength(15)
                .IsUnicode(false)
                .IsFixedLength();
            entity.Property(e => e.Country).HasMaxLength(50);
            entity.Property(e => e.DepartmentId)
                .HasMaxLength(15)
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
                .HasConstraintName("FK__Lecturer__Depart__412EB0B6");

            entity.HasOne(d => d.LecturerNavigation).WithOne(p => p.Lecturer)
                .HasForeignKey<Lecturer>(d => d.LecturerId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Lecturer__Lectur__403A8C7D");
        });

        modelBuilder.Entity<Major>(entity =>
        {
            entity.HasKey(e => e.MajorId).HasName("PK__Major__D5B8BF918C4B6261");

            entity.ToTable("Major");

            entity.Property(e => e.MajorId)
                .HasMaxLength(15)
                .IsUnicode(false);
            entity.Property(e => e.DepartmentId)
                .HasMaxLength(15)
                .IsUnicode(false);
            entity.Property(e => e.MajorName).HasMaxLength(100);

            entity.HasOne(d => d.Department).WithMany(p => p.Majors)
                .HasForeignKey(d => d.DepartmentId)
                .HasConstraintName("FK__Major__Departmen__3B75D760");
        });

        modelBuilder.Entity<ModuleClass>(entity =>
        {
            entity.HasKey(e => e.ModuleClassId).HasName("PK__ModuleCl__B6EAAD82A44232EA");

            entity.ToTable("ModuleClass");

            entity.Property(e => e.ModuleClassId)
                .HasMaxLength(15)
                .IsUnicode(false);
            entity.Property(e => e.LecturerId)
                .HasMaxLength(15)
                .IsUnicode(false);
            entity.Property(e => e.SemesterId)
                .HasMaxLength(15)
                .IsUnicode(false);
            entity.Property(e => e.SubjectId)
                .HasMaxLength(15)
                .IsUnicode(false);

            entity.HasOne(d => d.Lecturer).WithMany(p => p.ModuleClasses)
                .HasForeignKey(d => d.LecturerId)
                .HasConstraintName("FK__ModuleCla__Lectu__6EF57B66");

            entity.HasOne(d => d.Semester).WithMany(p => p.ModuleClasses)
                .HasForeignKey(d => d.SemesterId)
                .HasConstraintName("FK__ModuleCla__Semes__70DDC3D8");

            entity.HasOne(d => d.Subject).WithMany(p => p.ModuleClasses)
                .HasForeignKey(d => d.SubjectId)
                .HasConstraintName("FK__ModuleCla__Subje__6FE99F9F");
        });

        modelBuilder.Entity<ModuleClassTrainingProgramCourse>(entity =>
        {
            entity.HasKey(e => e.ModuleClassTrainingProgramCourseId).HasName("PK__ModuleCl__0C39FA7870695890");

            entity.ToTable("ModuleClass_TrainingProgram_Course");

            entity.Property(e => e.ModuleClassTrainingProgramCourseId).HasColumnName("ModuleClass_TrainingProgram_CourseId");
            entity.Property(e => e.ModuleClassId)
                .HasMaxLength(15)
                .IsUnicode(false);
            entity.Property(e => e.TrainingProgramCourseId)
                .HasMaxLength(15)
                .IsUnicode(false)
                .HasColumnName("TrainingProgram_CourseId");

            entity.HasOne(d => d.ModuleClass).WithMany(p => p.ModuleClassTrainingProgramCourses)
                .HasForeignKey(d => d.ModuleClassId)
                .HasConstraintName("FK__ModuleCla__Modul__778AC167");

            entity.HasOne(d => d.TrainingProgramCourse).WithMany(p => p.ModuleClassTrainingProgramCourses)
                .HasForeignKey(d => d.TrainingProgramCourseId)
                .HasConstraintName("FK__ModuleCla__Train__787EE5A0");
        });

        modelBuilder.Entity<ModuleGroup>(entity =>
        {
            entity.HasKey(e => e.ModuleGroupId).HasName("PK__ModuleGr__897B9013C1A60395");

            entity.ToTable("ModuleGroup");

            entity.Property(e => e.ModuleGroupId)
                .HasMaxLength(15)
                .IsUnicode(false);
            entity.Property(e => e.ModuleGroupName).HasMaxLength(100);
            entity.Property(e => e.ModuleTypeId)
                .HasMaxLength(15)
                .IsUnicode(false);

            entity.HasOne(d => d.ModuleType).WithMany(p => p.ModuleGroups)
                .HasForeignKey(d => d.ModuleTypeId)
                .HasConstraintName("FK__ModuleGro__Modul__4E88ABD4");
        });

        modelBuilder.Entity<ModuleType>(entity =>
        {
            entity.HasKey(e => e.ModuleTypeId).HasName("PK__ModuleTy__5EBC4F0C90DD312C");

            entity.ToTable("ModuleType");

            entity.Property(e => e.ModuleTypeId)
                .HasMaxLength(15)
                .IsUnicode(false);
            entity.Property(e => e.ModuleTypeName).HasMaxLength(100);
        });

        modelBuilder.Entity<Semester>(entity =>
        {
            entity.HasKey(e => e.SemesterId).HasName("PK__Semester__043301DD7F4F1291");

            entity.ToTable("Semester");

            entity.Property(e => e.SemesterId)
                .HasMaxLength(15)
                .IsUnicode(false);
            entity.Property(e => e.SemesterName).HasMaxLength(20);
        });

        modelBuilder.Entity<SemesterPeriod>(entity =>
        {
            entity.HasKey(e => e.SemesterPeriodId).HasName("PK__Semester__DDD0DF62211ACCF1");

            entity.ToTable("SemesterPeriod");

            entity.Property(e => e.AcademicYear)
                .HasMaxLength(10)
                .IsUnicode(false)
                .IsFixedLength();
            entity.Property(e => e.SemesterId)
                .HasMaxLength(15)
                .IsUnicode(false);

            entity.HasOne(d => d.Semester).WithMany(p => p.SemesterPeriods)
                .HasForeignKey(d => d.SemesterId)
                .HasConstraintName("FK__SemesterP__Semes__66603565");
        });

        modelBuilder.Entity<Student>(entity =>
        {
            entity.HasKey(e => e.StudentId).HasName("PK__Student__32C52B99A68C2A05");

            entity.ToTable("Student");

            entity.Property(e => e.StudentId)
                .HasMaxLength(15)
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
                .HasMaxLength(15)
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
                .HasConstraintName("FK__Student__Student__49C3F6B7");

            entity.HasOne(d => d.StudentNavigation).WithOne(p => p.Student)
                .HasForeignKey<Student>(d => d.StudentId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Student__Student__48CFD27E");
        });

        modelBuilder.Entity<StudentClass>(entity =>
        {
            entity.HasKey(e => e.StudentClassId).HasName("PK__StudentC__2FF12147D7188418");

            entity.ToTable("StudentClass");

            entity.Property(e => e.StudentClassId)
                .HasMaxLength(15)
                .IsUnicode(false);
            entity.Property(e => e.CourseId)
                .HasMaxLength(15)
                .IsUnicode(false);
            entity.Property(e => e.LecturerId)
                .HasMaxLength(15)
                .IsUnicode(false);
            entity.Property(e => e.MajorId)
                .HasMaxLength(15)
                .IsUnicode(false);
            entity.Property(e => e.StudentClassName).HasMaxLength(100);

            entity.HasOne(d => d.Course).WithMany(p => p.StudentClasses)
                .HasForeignKey(d => d.CourseId)
                .HasConstraintName("FK__StudentCl__Cours__44FF419A");

            entity.HasOne(d => d.Lecturer).WithMany(p => p.StudentClasses)
                .HasForeignKey(d => d.LecturerId)
                .HasConstraintName("FK__StudentCl__Lectu__440B1D61");

            entity.HasOne(d => d.Major).WithMany(p => p.StudentClasses)
                .HasForeignKey(d => d.MajorId)
                .HasConstraintName("FK__StudentCl__Major__45F365D3");
        });

        modelBuilder.Entity<Subject>(entity =>
        {
            entity.HasKey(e => e.SubjectId).HasName("PK__Subject__AC1BA3A8F27045ED");

            entity.ToTable("Subject");

            entity.Property(e => e.SubjectId)
                .HasMaxLength(15)
                .IsUnicode(false);
            entity.Property(e => e.DepartmentId)
                .HasMaxLength(15)
                .IsUnicode(false);
            entity.Property(e => e.SubjectName).HasMaxLength(100);

            entity.HasOne(d => d.Department).WithMany(p => p.Subjects)
                .HasForeignKey(d => d.DepartmentId)
                .HasConstraintName("FK__Subject__Departm__5EBF139D");
        });

        modelBuilder.Entity<TrainingProgram>(entity =>
        {
            entity.HasKey(e => e.TrainingProgramId).HasName("PK__Training__4F897A5DB7558663");

            entity.ToTable("TrainingProgram");

            entity.Property(e => e.TrainingProgramId)
                .HasMaxLength(15)
                .IsUnicode(false);
            entity.Property(e => e.MajorId)
                .HasMaxLength(15)
                .IsUnicode(false);
            entity.Property(e => e.TrainingProgramName).HasMaxLength(100);

            entity.HasOne(d => d.Major).WithMany(p => p.TrainingPrograms)
                .HasForeignKey(d => d.MajorId)
                .HasConstraintName("FK__TrainingP__Major__5165187F");
        });

        modelBuilder.Entity<TrainingProgramCourse>(entity =>
        {
            entity.HasKey(e => e.TrainingProgramCourseId).HasName("PK__Training__B3C2FC5D4E636EC6");

            entity.ToTable("TrainingProgram_Course");

            entity.Property(e => e.TrainingProgramCourseId)
                .HasMaxLength(15)
                .IsUnicode(false)
                .HasColumnName("TrainingProgram_CourseId");
            entity.Property(e => e.CourseId)
                .HasMaxLength(15)
                .IsUnicode(false);
            entity.Property(e => e.TrainingProgramId)
                .HasMaxLength(15)
                .IsUnicode(false);

            entity.HasOne(d => d.Course).WithMany(p => p.TrainingProgramCourses)
                .HasForeignKey(d => d.CourseId)
                .HasConstraintName("FK__TrainingP__Cours__5535A963");

            entity.HasOne(d => d.TrainingProgram).WithMany(p => p.TrainingProgramCourses)
                .HasForeignKey(d => d.TrainingProgramId)
                .HasConstraintName("FK__TrainingP__Train__5441852A");
        });

        modelBuilder.Entity<TrainingProgramCourseStudent>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("TrainingProgram_Course_Student");

            entity.Property(e => e.StudentId)
                .HasMaxLength(15)
                .IsUnicode(false);
            entity.Property(e => e.TrainingProgramCourseId)
                .HasMaxLength(15)
                .IsUnicode(false)
                .HasColumnName("TrainingProgram_CourseId");

            entity.HasOne(d => d.Student).WithMany()
                .HasForeignKey(d => d.StudentId)
                .HasConstraintName("FK__TrainingP__Stude__5812160E");

            entity.HasOne(d => d.TrainingProgramCourse).WithMany()
                .HasForeignKey(d => d.TrainingProgramCourseId)
                .HasConstraintName("FK__TrainingP__Train__571DF1D5");
        });

        modelBuilder.Entity<TrainingProgramModuleGroup>(entity =>
        {
            entity.HasKey(e => e.TrainingProgramModuleGroupId).HasName("PK__Training__680A19D410CF9099");

            entity.ToTable("TrainingProgram_ModuleGroup");

            entity.Property(e => e.TrainingProgramModuleGroupId).HasColumnName("TrainingProgram_ModuleGroupId");
            entity.Property(e => e.ModuleGroupId)
                .HasMaxLength(15)
                .IsUnicode(false);
            entity.Property(e => e.TrainingProgramId)
                .HasMaxLength(15)
                .IsUnicode(false);

            entity.HasOne(d => d.ModuleGroup).WithMany(p => p.TrainingProgramModuleGroups)
                .HasForeignKey(d => d.ModuleGroupId)
                .HasConstraintName("FK__TrainingP__Modul__5BE2A6F2");

            entity.HasOne(d => d.TrainingProgram).WithMany(p => p.TrainingProgramModuleGroups)
                .HasForeignKey(d => d.TrainingProgramId)
                .HasConstraintName("FK__TrainingP__Train__5AEE82B9");
        });

        modelBuilder.Entity<TrainingProgramModuleGroupSubject>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("TrainingProgram_ModuleGroup_Subject");

            entity.Property(e => e.IsCreditGpa).HasColumnName("IsCredit_GPA");
            entity.Property(e => e.SubjectId)
                .HasMaxLength(15)
                .IsUnicode(false);
            entity.Property(e => e.SubjectType).HasMaxLength(30);
            entity.Property(e => e.TrainingProgramModuleGroupId).HasColumnName("TrainingProgram_ModuleGroupId");

            entity.HasOne(d => d.Subject).WithMany()
                .HasForeignKey(d => d.SubjectId)
                .HasConstraintName("FK__TrainingP__Subje__619B8048");

            entity.HasOne(d => d.TrainingProgramModuleGroup).WithMany()
                .HasForeignKey(d => d.TrainingProgramModuleGroupId)
                .HasConstraintName("FK__TrainingP__Train__60A75C0F");
        });

        modelBuilder.Entity<TuitionFee>(entity =>
        {
            entity.HasKey(e => e.TuitionFeeId).HasName("PK__TuitionF__C67580F1096CE53C");

            entity.ToTable("TuitionFee");

            entity.Property(e => e.TuitionFeeId)
                .HasMaxLength(15)
                .IsUnicode(false);
            entity.Property(e => e.AmountPerCredit).HasColumnType("decimal(10, 2)");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
