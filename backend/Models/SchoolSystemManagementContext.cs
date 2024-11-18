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

    public virtual DbSet<ClassRoom> ClassRooms { get; set; }

    public virtual DbSet<ClassSchedule> ClassSchedules { get; set; }

    public virtual DbSet<Course> Courses { get; set; }

    public virtual DbSet<CourseRegistration> CourseRegistrations { get; set; }

    public virtual DbSet<CumulativePoint> CumulativePoints { get; set; }

    public virtual DbSet<Department> Departments { get; set; }

    public virtual DbSet<Lecturer> Lecturers { get; set; }

    public virtual DbSet<Major> Majors { get; set; }

    public virtual DbSet<ModuleClass> ModuleClasses { get; set; }

    public virtual DbSet<ModuleGroup> ModuleGroups { get; set; }

    public virtual DbSet<ModuleType> ModuleTypes { get; set; }

    public virtual DbSet<Notification> Notifications { get; set; }

    public virtual DbSet<Semester> Semesters { get; set; }

    public virtual DbSet<SemesterPeriod> SemesterPeriods { get; set; }

    public virtual DbSet<Student> Students { get; set; }

    public virtual DbSet<StudentClass> StudentClasses { get; set; }

    public virtual DbSet<StudentNotification> StudentNotifications { get; set; }

    public virtual DbSet<Subject> Subjects { get; set; }

    public virtual DbSet<TrainingProgram> TrainingPrograms { get; set; }

    public virtual DbSet<TrainingProgramCourse> TrainingProgramCourses { get; set; }

    public virtual DbSet<TrainingProgramModuleGroup> TrainingProgramModuleGroups { get; set; }

    public virtual DbSet<TrainingProgramModuleGroupSubject> TrainingProgramModuleGroupSubjects { get; set; }

    public virtual DbSet<TuitionFee> TuitionFees { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Data Source=.;Initial Catalog=SchoolSystemManagement;Integrated Security=True;Trust Server Certificate=True");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<ClassRoom>(entity =>
        {
            entity.HasKey(e => e.ClassRoomId).HasName("PK__ClassRoo__742E12915882CF2F");

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
            entity.HasKey(e => e.ScheduleId).HasName("PK__ClassSch__9C8A5B49E6BF1404");

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
                .HasConstraintName("FK__ClassSche__Class__6B24EA82");

            entity.HasOne(d => d.ModuleClass).WithMany(p => p.ClassSchedules)
                .HasForeignKey(d => d.ModuleClassId)
                .HasConstraintName("FK__ClassSche__Modul__6A30C649");
        });

        modelBuilder.Entity<Course>(entity =>
        {
            entity.HasKey(e => e.CourseId).HasName("PK__Course__C92D71A74D404119");

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
            entity.HasKey(e => e.CourseRegistrationId).HasName("PK__CourseRe__A0FC0B768ABA57E7");

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
                .HasConstraintName("FK__CourseReg__Modul__72C60C4A");

            entity.HasOne(d => d.Student).WithMany(p => p.CourseRegistrations)
                .HasForeignKey(d => d.StudentId)
                .HasConstraintName("FK__CourseReg__Stude__71D1E811");

            entity.HasOne(d => d.TuitionFees).WithMany(p => p.CourseRegistrations)
                .HasForeignKey(d => d.TuitionFeesId)
                .HasConstraintName("FK__CourseReg__Tuiti__73BA3083");
        });

        modelBuilder.Entity<CumulativePoint>(entity =>
        {
            entity.HasKey(e => e.CumulativePointId).HasName("PK__Cumulati__E43362A0AFC82066");

            entity.ToTable("CumulativePoint");

            entity.Property(e => e.CumulativeAverageGrade10).HasColumnType("decimal(3, 1)");
            entity.Property(e => e.CumulativeAverageGrade4).HasColumnType("decimal(2, 1)");
            entity.Property(e => e.StudentId)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.TrainingProgramCourseId)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("TrainingProgram_CourseId");

            entity.HasOne(d => d.Student).WithMany(p => p.CumulativePoints)
                .HasForeignKey(d => d.StudentId)
                .HasConstraintName("FK__Cumulativ__Stude__6EF57B66");

            entity.HasOne(d => d.TrainingProgramCourse).WithMany(p => p.CumulativePoints)
                .HasForeignKey(d => d.TrainingProgramCourseId)
                .HasConstraintName("FK__Cumulativ__Train__6E01572D");
        });

        modelBuilder.Entity<Department>(entity =>
        {
            entity.HasKey(e => e.DepartmentId).HasName("PK__Departme__B2079BED7A1564CF");

            entity.ToTable("Department");

            entity.Property(e => e.DepartmentId)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.DepartmentName).HasMaxLength(100);
        });

        modelBuilder.Entity<Lecturer>(entity =>
        {
            entity.HasKey(e => e.LecturerId).HasName("PK__Lecturer__5A78B93DFB4CB1E6");

            entity.ToTable("Lecturer");

            entity.Property(e => e.LecturerId)
                .HasMaxLength(40)
                .IsUnicode(false);
            entity.Property(e => e.DepartmentId)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.FullName).HasMaxLength(100);

            entity.HasOne(d => d.Department).WithMany(p => p.Lecturers)
                .HasForeignKey(d => d.DepartmentId)
                .HasConstraintName("FK__Lecturer__Depart__44FF419A");
        });

        modelBuilder.Entity<Major>(entity =>
        {
            entity.HasKey(e => e.MajorId).HasName("PK__Major__D5B8BF910BFC02F9");

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
            entity.HasKey(e => e.ModuleClassId).HasName("PK__ModuleCl__B6EAAD82BCE03F7A");

            entity.ToTable("ModuleClass");

            entity.Property(e => e.ModuleClassId)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.LecturerId)
                .HasMaxLength(40)
                .IsUnicode(false);
            entity.Property(e => e.SubjectId)
                .HasMaxLength(20)
                .IsUnicode(false);

            entity.HasOne(d => d.Lecturer).WithMany(p => p.ModuleClasses)
                .HasForeignKey(d => d.LecturerId)
                .HasConstraintName("FK__ModuleCla__Lectu__66603565");

            entity.HasOne(d => d.Subject).WithMany(p => p.ModuleClasses)
                .HasForeignKey(d => d.SubjectId)
                .HasConstraintName("FK__ModuleCla__Subje__6754599E");
        });

        modelBuilder.Entity<ModuleGroup>(entity =>
        {
            entity.HasKey(e => e.ModuleGroupId).HasName("PK__ModuleGr__897B9013BFC002B0");

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
                .HasConstraintName("FK__ModuleGro__Modul__5165187F");
        });

        modelBuilder.Entity<ModuleType>(entity =>
        {
            entity.HasKey(e => e.ModuleTypeId).HasName("PK__ModuleTy__5EBC4F0C074352C9");

            entity.ToTable("ModuleType");

            entity.Property(e => e.ModuleTypeId)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.ModuleTypeName).HasMaxLength(100);
        });

        modelBuilder.Entity<Notification>(entity =>
        {
            entity.HasKey(e => e.NotificationsId).HasName("PK__Notifica__94E5596DAB127759");

            entity.ToTable(tb => tb.HasTrigger("trg_AfterInsertNotifications"));

            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.Title).HasMaxLength(255);
        });

        modelBuilder.Entity<Semester>(entity =>
        {
            entity.HasKey(e => e.SemesterId).HasName("PK__Semester__043301DD6AE644A7");

            entity.ToTable("Semester");

            entity.Property(e => e.SemesterId)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.SemesterName).HasMaxLength(20);
        });

        modelBuilder.Entity<SemesterPeriod>(entity =>
        {
            entity.HasKey(e => e.SemesterPeriodId).HasName("PK__Semester__DDD0DF62058F88FB");

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
            entity.HasKey(e => e.StudentId).HasName("PK__Student__32C52B99200E084D");

            entity.ToTable("Student");

            entity.Property(e => e.StudentId)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.FullName).HasMaxLength(100);
            entity.Property(e => e.StudentClassId)
                .HasMaxLength(20)
                .IsUnicode(false);

            entity.HasOne(d => d.StudentClass).WithMany(p => p.Students)
                .HasForeignKey(d => d.StudentClassId)
                .HasConstraintName("FK__Student__Student__4CA06362");
        });

        modelBuilder.Entity<StudentClass>(entity =>
        {
            entity.HasKey(e => e.StudentClassId).HasName("PK__StudentC__2FF1214761DA2D56");

            entity.ToTable("StudentClass");

            entity.Property(e => e.StudentClassId)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.CourseId)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.LecturerId)
                .HasMaxLength(40)
                .IsUnicode(false);
            entity.Property(e => e.MajorId)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.StudentClassName).HasMaxLength(100);

            entity.HasOne(d => d.Course).WithMany(p => p.StudentClasses)
                .HasForeignKey(d => d.CourseId)
                .HasConstraintName("FK__StudentCl__Cours__48CFD27E");

            entity.HasOne(d => d.Lecturer).WithMany(p => p.StudentClasses)
                .HasForeignKey(d => d.LecturerId)
                .HasConstraintName("FK__StudentCl__Lectu__47DBAE45");

            entity.HasOne(d => d.Major).WithMany(p => p.StudentClasses)
                .HasForeignKey(d => d.MajorId)
                .HasConstraintName("FK__StudentCl__Major__49C3F6B7");
        });

        modelBuilder.Entity<StudentNotification>(entity =>
        {
            entity.HasKey(e => e.StudentNotificationsId).HasName("PK__StudentN__AAE6E2E34BAA3108");

            entity.Property(e => e.IsRead).HasDefaultValue(false);
            entity.Property(e => e.ReadAt).HasColumnType("datetime");
            entity.Property(e => e.StudentId)
                .HasMaxLength(20)
                .IsUnicode(false);

            entity.HasOne(d => d.Notification).WithMany(p => p.StudentNotifications)
                .HasForeignKey(d => d.NotificationId)
                .HasConstraintName("FK__StudentNo__Notif__7A672E12");

            entity.HasOne(d => d.Student).WithMany(p => p.StudentNotifications)
                .HasForeignKey(d => d.StudentId)
                .HasConstraintName("FK__StudentNo__Stude__7B5B524B");
        });

        modelBuilder.Entity<Subject>(entity =>
        {
            entity.HasKey(e => e.SubjectId).HasName("PK__Subject__AC1BA3A8BB022C1E");

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
            entity.HasKey(e => e.TrainingProgramId).HasName("PK__Training__4F897A5D002CA559");

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
                .HasConstraintName("FK__TrainingP__Major__5441852A");
        });

        modelBuilder.Entity<TrainingProgramCourse>(entity =>
        {
            entity.HasKey(e => e.TrainingProgramCourseId).HasName("PK__Training__B3C2FC5DEE22A691");

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
                .HasConstraintName("FK__TrainingP__Cours__5812160E");

            entity.HasOne(d => d.TrainingProgram).WithMany(p => p.TrainingProgramCourses)
                .HasForeignKey(d => d.TrainingProgramId)
                .HasConstraintName("FK__TrainingP__Train__571DF1D5");
        });

        modelBuilder.Entity<TrainingProgramModuleGroup>(entity =>
        {
            entity.HasKey(e => e.TrainingProgramModuleGroupId).HasName("PK__Training__680A19D4FA06C647");

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
                .HasConstraintName("FK__TrainingP__Semes__619B8048");

            entity.HasOne(d => d.Subject).WithMany()
                .HasForeignKey(d => d.SubjectId)
                .HasConstraintName("FK__TrainingP__Subje__60A75C0F");

            entity.HasOne(d => d.TrainingProgramModuleGroup).WithMany()
                .HasForeignKey(d => d.TrainingProgramModuleGroupId)
                .HasConstraintName("FK__TrainingP__Train__5FB337D6");
        });

        modelBuilder.Entity<TuitionFee>(entity =>
        {
            entity.HasKey(e => e.TuitionFeesId).HasName("PK__TuitionF__6F98818BD0CD0AF6");

            entity.Property(e => e.TuitionFeesId)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.AmountPerCredit).HasColumnType("decimal(10, 2)");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
