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

    public virtual DbSet<AcademicYear> AcademicYears { get; set; }

    public virtual DbSet<Account> Accounts { get; set; }

    public virtual DbSet<ClassRoom> ClassRooms { get; set; }

    public virtual DbSet<ClassStudent> ClassStudents { get; set; }

    public virtual DbSet<CourseCurriculumFramework> CourseCurriculumFrameworks { get; set; }

    public virtual DbSet<CourseRegistration> CourseRegistrations { get; set; }

    public virtual DbSet<Cumulative> Cumulatives { get; set; }

    public virtual DbSet<CurriculumFramework> CurriculumFrameworks { get; set; }

    public virtual DbSet<CurriculumFrameworkStudent> CurriculumFrameworkStudents { get; set; }

    public virtual DbSet<CurriculumStructure> CurriculumStructures { get; set; }

    public virtual DbSet<CurriculumStructureFramework> CurriculumStructureFrameworks { get; set; }

    public virtual DbSet<Department> Departments { get; set; }

    public virtual DbSet<DepartmentStudent> DepartmentStudents { get; set; }

    public virtual DbSet<DepartmentTeacher> DepartmentTeachers { get; set; }

    public virtual DbSet<Major> Majors { get; set; }

    public virtual DbSet<MajorStudent> MajorStudents { get; set; }

    public virtual DbSet<MajorTeacher> MajorTeachers { get; set; }

    public virtual DbSet<ModuleClass> ModuleClasses { get; set; }

    public virtual DbSet<Semester> Semesters { get; set; }

    public virtual DbSet<Student> Students { get; set; }

    public virtual DbSet<Subject> Subjects { get; set; }

    public virtual DbSet<SubjectTeacher> SubjectTeachers { get; set; }

    public virtual DbSet<Teacher> Teachers { get; set; }

    public virtual DbSet<TeachingPlan> TeachingPlans { get; set; }

    public virtual DbSet<TimeTable> TimeTables { get; set; }

    public virtual DbSet<TuitionRate> TuitionRates { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Data Source=.;Initial Catalog=SchoolSystemManagement;Integrated Security=True;Trust Server Certificate=True");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<AcademicYear>(entity =>
        {
            entity.HasKey(e => e.AcademicYearId).HasName("PK__Academic__C54C7A01C075E792");

            entity.ToTable("AcademicYear");

            entity.Property(e => e.AcademicYearId)
                .HasMaxLength(15)
                .IsUnicode(false);
            entity.Property(e => e.AcademicYearName).HasMaxLength(20);
        });

        modelBuilder.Entity<Account>(entity =>
        {
            entity.HasKey(e => e.UserName).HasName("PK__Account__C9F28457B9D060DE");

            entity.ToTable("Account");

            entity.Property(e => e.UserName)
                .HasMaxLength(15)
                .IsUnicode(false);
            entity.Property(e => e.Email)
                .HasMaxLength(30)
                .IsUnicode(false);
            entity.Property(e => e.PasswordHash)
                .HasMaxLength(64)
                .IsUnicode(false);
            entity.Property(e => e.Role)
                .HasMaxLength(1)
                .IsUnicode(false)
                .IsFixedLength();
        });

        modelBuilder.Entity<ClassRoom>(entity =>
        {
            entity.HasKey(e => e.ClassRoomId).HasName("PK__ClassRoo__742E1291C516A60C");

            entity.ToTable("ClassRoom");

            entity.Property(e => e.ClassRoomId)
                .HasMaxLength(15)
                .IsUnicode(false);
            entity.Property(e => e.Floor)
                .HasMaxLength(1)
                .IsUnicode(false)
                .IsFixedLength();
            entity.Property(e => e.Sector).HasMaxLength(20);
        });

        modelBuilder.Entity<ClassStudent>(entity =>
        {
            entity.HasKey(e => e.ClassStudentId).HasName("PK__ClassStu__B81478190F9C72CA");

            entity.ToTable("ClassStudent");

            entity.Property(e => e.ClassStudentId)
                .HasMaxLength(15)
                .IsUnicode(false);
            entity.Property(e => e.ClassStudentName).HasMaxLength(100);
            entity.Property(e => e.MajorId)
                .HasMaxLength(15)
                .IsUnicode(false);
            entity.Property(e => e.TeacherId)
                .HasMaxLength(15)
                .IsUnicode(false);

            entity.HasOne(d => d.Major).WithMany(p => p.ClassStudents)
                .HasForeignKey(d => d.MajorId)
                .HasConstraintName("FK__ClassStud__Major__693CA210");

            entity.HasOne(d => d.Teacher).WithMany(p => p.ClassStudents)
                .HasForeignKey(d => d.TeacherId)
                .HasConstraintName("FK__ClassStud__Teach__6A30C649");
        });

        modelBuilder.Entity<CourseCurriculumFramework>(entity =>
        {
            entity.HasKey(e => e.CourseCurriculumFrameworkId).HasName("PK__CourseCu__AA02D50E113833D2");

            entity.ToTable("CourseCurriculumFramework");

            entity.Property(e => e.AcademicYearId)
                .HasMaxLength(15)
                .IsUnicode(false);
            entity.Property(e => e.CurriculumFrameworkId)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.MajorId)
                .HasMaxLength(15)
                .IsUnicode(false);

            entity.HasOne(d => d.AcademicYear).WithMany(p => p.CourseCurriculumFrameworks)
                .HasForeignKey(d => d.AcademicYearId)
                .HasConstraintName("FK__CourseCur__Acade__7E37BEF6");

            entity.HasOne(d => d.CurriculumFramework).WithMany(p => p.CourseCurriculumFrameworks)
                .HasForeignKey(d => d.CurriculumFrameworkId)
                .HasConstraintName("FK__CourseCur__Curri__7F2BE32F");

            entity.HasOne(d => d.Major).WithMany(p => p.CourseCurriculumFrameworks)
                .HasForeignKey(d => d.MajorId)
                .HasConstraintName("FK__CourseCur__Major__00200768");
        });

        modelBuilder.Entity<CourseRegistration>(entity =>
        {
            entity.HasKey(e => e.CourseRegistrationId).HasName("PK__CourseRe__A0FC0B76070F9F94");

            entity.ToTable("CourseRegistration");

            entity.Property(e => e.AverageGrade10).HasColumnType("decimal(4, 2)");
            entity.Property(e => e.AverageGrade4).HasColumnType("decimal(4, 2)");
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
            entity.Property(e => e.Tuition).HasColumnType("decimal(20, 2)");

            entity.HasOne(d => d.ModuleClass).WithMany(p => p.CourseRegistrations)
                .HasForeignKey(d => d.ModuleClassId)
                .HasConstraintName("FK__CourseReg__Modul__0B91BA14");

            entity.HasOne(d => d.Student).WithMany(p => p.CourseRegistrations)
                .HasForeignKey(d => d.StudentId)
                .HasConstraintName("FK__CourseReg__Stude__0A9D95DB");

            entity.HasOne(d => d.TuitionRate).WithMany(p => p.CourseRegistrations)
                .HasForeignKey(d => d.TuitionRateId)
                .HasConstraintName("FK__CourseReg__Tuiti__0C85DE4D");
        });

        modelBuilder.Entity<Cumulative>(entity =>
        {
            entity.HasKey(e => e.CumulativeId).HasName("PK__Cumulati__23D7E48D4DC63701");

            entity.ToTable("Cumulative");

            entity.Property(e => e.CumulativeGpa)
                .HasColumnType("decimal(4, 2)")
                .HasColumnName("CumulativeGPA");
            entity.Property(e => e.DepartmentId)
                .HasMaxLength(15)
                .IsUnicode(false);
            entity.Property(e => e.MajorId)
                .HasMaxLength(15)
                .IsUnicode(false);
            entity.Property(e => e.StudentId)
                .HasMaxLength(15)
                .IsUnicode(false);

            entity.HasOne(d => d.CourseRegistration).WithMany(p => p.Cumulatives)
                .HasForeignKey(d => d.CourseRegistrationId)
                .HasConstraintName("FK__Cumulativ__Cours__10566F31");

            entity.HasOne(d => d.Department).WithMany(p => p.Cumulatives)
                .HasForeignKey(d => d.DepartmentId)
                .HasConstraintName("FK__Cumulativ__Depar__0E6E26BF");

            entity.HasOne(d => d.Major).WithMany(p => p.Cumulatives)
                .HasForeignKey(d => d.MajorId)
                .HasConstraintName("FK__Cumulativ__Major__0F624AF8");

            entity.HasOne(d => d.Student).WithMany(p => p.Cumulatives)
                .HasForeignKey(d => d.StudentId)
                .HasConstraintName("FK__Cumulativ__Stude__0D7A0286");
        });

        modelBuilder.Entity<CurriculumFramework>(entity =>
        {
            entity.HasKey(e => e.CurriculumFrameworkId).HasName("PK__Curricul__586496383470DCB6");

            entity.ToTable("CurriculumFramework");

            entity.Property(e => e.CurriculumFrameworkId)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.CurriculumFrameworkName).HasMaxLength(100);
            entity.Property(e => e.DepartmentId)
                .HasMaxLength(15)
                .IsUnicode(false);
            entity.Property(e => e.MajorId)
                .HasMaxLength(15)
                .IsUnicode(false);

            entity.HasOne(d => d.Department).WithMany(p => p.CurriculumFrameworks)
                .HasForeignKey(d => d.DepartmentId)
                .HasConstraintName("FK__Curriculu__Depar__778AC167");

            entity.HasOne(d => d.Major).WithMany(p => p.CurriculumFrameworks)
                .HasForeignKey(d => d.MajorId)
                .HasConstraintName("FK__Curriculu__Major__787EE5A0");
        });

        modelBuilder.Entity<CurriculumFrameworkStudent>(entity =>
        {
            entity.HasKey(e => e.CurriculumFrameworkStudentId).HasName("PK__Curricul__F55E49D23D85490C");

            entity.ToTable("CurriculumFrameworkStudent");

            entity.Property(e => e.CurriculumFrameworkId1)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.CurriculumFrameworkId2)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.StudentId)
                .HasMaxLength(15)
                .IsUnicode(false);

            entity.HasOne(d => d.CurriculumFrameworkId1Navigation).WithMany(p => p.CurriculumFrameworkStudentCurriculumFrameworkId1Navigations)
                .HasForeignKey(d => d.CurriculumFrameworkId1)
                .HasConstraintName("FK__Curriculu__Curri__797309D9");

            entity.HasOne(d => d.CurriculumFrameworkId2Navigation).WithMany(p => p.CurriculumFrameworkStudentCurriculumFrameworkId2Navigations)
                .HasForeignKey(d => d.CurriculumFrameworkId2)
                .HasConstraintName("FK__Curriculu__Curri__7A672E12");

            entity.HasOne(d => d.Student).WithMany(p => p.CurriculumFrameworkStudents)
                .HasForeignKey(d => d.StudentId)
                .HasConstraintName("FK__Curriculu__Stude__7B5B524B");
        });

        modelBuilder.Entity<CurriculumStructure>(entity =>
        {
            entity.HasKey(e => e.CurriculumStructureId).HasName("PK__Curricul__B606433A281D6E94");

            entity.ToTable("CurriculumStructure");

            entity.Property(e => e.CurriculumStructureName).HasMaxLength(100);
            entity.Property(e => e.DetailCurriculumStructure).HasMaxLength(150);
        });

        modelBuilder.Entity<CurriculumStructureFramework>(entity =>
        {
            entity.HasKey(e => e.CurriculumStructureFrameworkId).HasName("PK__Curricul__980C8F9F9A88B5D4");

            entity.ToTable("CurriculumStructureFramework");

            entity.Property(e => e.CurriculumFrameworkId)
                .HasMaxLength(20)
                .IsUnicode(false);

            entity.HasOne(d => d.CurriculumFramework).WithMany(p => p.CurriculumStructureFrameworks)
                .HasForeignKey(d => d.CurriculumFrameworkId)
                .HasConstraintName("FK__Curriculu__Curri__7D439ABD");

            entity.HasOne(d => d.CurriculumStructure).WithMany(p => p.CurriculumStructureFrameworks)
                .HasForeignKey(d => d.CurriculumStructureId)
                .HasConstraintName("FK__Curriculu__Curri__7C4F7684");
        });

        modelBuilder.Entity<Department>(entity =>
        {
            entity.HasKey(e => e.DepartmentId).HasName("PK__Departme__B2079BED432AA20A");

            entity.ToTable("Department");

            entity.Property(e => e.DepartmentId)
                .HasMaxLength(15)
                .IsUnicode(false);
            entity.Property(e => e.DepartmentName).HasMaxLength(100);
        });

        modelBuilder.Entity<DepartmentStudent>(entity =>
        {
            entity.HasKey(e => e.DepartmentStudentId).HasName("PK__Departme__A308E5B081261E53");

            entity.ToTable("DepartmentStudent");

            entity.Property(e => e.DepartmentId)
                .HasMaxLength(15)
                .IsUnicode(false);
            entity.Property(e => e.StudentId)
                .HasMaxLength(15)
                .IsUnicode(false);

            entity.HasOne(d => d.Department).WithMany(p => p.DepartmentStudents)
                .HasForeignKey(d => d.DepartmentId)
                .HasConstraintName("FK__Departmen__Depar__6EF57B66");

            entity.HasOne(d => d.Student).WithMany(p => p.DepartmentStudents)
                .HasForeignKey(d => d.StudentId)
                .HasConstraintName("FK__Departmen__Stude__6FE99F9F");
        });

        modelBuilder.Entity<DepartmentTeacher>(entity =>
        {
            entity.HasKey(e => e.DepartmentTeacherId).HasName("PK__Departme__1D5250DF4F89D9F2");

            entity.ToTable("DepartmentTeacher");

            entity.Property(e => e.DepartmentId)
                .HasMaxLength(15)
                .IsUnicode(false);
            entity.Property(e => e.TeacherId)
                .HasMaxLength(15)
                .IsUnicode(false);

            entity.HasOne(d => d.Department).WithMany(p => p.DepartmentTeachers)
                .HasForeignKey(d => d.DepartmentId)
                .HasConstraintName("FK__Departmen__Depar__6D0D32F4");

            entity.HasOne(d => d.Teacher).WithMany(p => p.DepartmentTeachers)
                .HasForeignKey(d => d.TeacherId)
                .HasConstraintName("FK__Departmen__Teach__6E01572D");
        });

        modelBuilder.Entity<Major>(entity =>
        {
            entity.HasKey(e => e.MajorId).HasName("PK__Major__D5B8BF91CAD992BC");

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
                .HasConstraintName("FK__Major__Departmen__6754599E");
        });

        modelBuilder.Entity<MajorStudent>(entity =>
        {
            entity.HasKey(e => e.MajorStudentId).HasName("PK__MajorStu__5D97D2C1D95F3B2B");

            entity.ToTable("MajorStudent");

            entity.Property(e => e.MajorId)
                .HasMaxLength(15)
                .IsUnicode(false);
            entity.Property(e => e.StudentId)
                .HasMaxLength(15)
                .IsUnicode(false);

            entity.HasOne(d => d.Major).WithMany(p => p.MajorStudents)
                .HasForeignKey(d => d.MajorId)
                .HasConstraintName("FK__MajorStud__Major__72C60C4A");

            entity.HasOne(d => d.Student).WithMany(p => p.MajorStudents)
                .HasForeignKey(d => d.StudentId)
                .HasConstraintName("FK__MajorStud__Stude__73BA3083");
        });

        modelBuilder.Entity<MajorTeacher>(entity =>
        {
            entity.HasKey(e => e.MajorTeacherId).HasName("PK__MajorTea__9EDDDA229A6B4A9F");

            entity.ToTable("MajorTeacher");

            entity.Property(e => e.MajorId)
                .HasMaxLength(15)
                .IsUnicode(false);
            entity.Property(e => e.TeacherId)
                .HasMaxLength(15)
                .IsUnicode(false);

            entity.HasOne(d => d.Major).WithMany(p => p.MajorTeachers)
                .HasForeignKey(d => d.MajorId)
                .HasConstraintName("FK__MajorTeac__Major__70DDC3D8");

            entity.HasOne(d => d.Teacher).WithMany(p => p.MajorTeachers)
                .HasForeignKey(d => d.TeacherId)
                .HasConstraintName("FK__MajorTeac__Teach__71D1E811");
        });

        modelBuilder.Entity<ModuleClass>(entity =>
        {
            entity.HasKey(e => e.ModuleClassId).HasName("PK__ModuleCl__B6EAAD8240474B4C");

            entity.ToTable("ModuleClass");

            entity.Property(e => e.ModuleClassId)
                .HasMaxLength(15)
                .IsUnicode(false);
            entity.Property(e => e.AcademicYearId)
                .HasMaxLength(15)
                .IsUnicode(false);
            entity.Property(e => e.MajorId)
                .HasMaxLength(15)
                .IsUnicode(false);
            entity.Property(e => e.SubjectId)
                .HasMaxLength(15)
                .IsUnicode(false);
            entity.Property(e => e.TeacherId)
                .HasMaxLength(15)
                .IsUnicode(false);

            entity.HasOne(d => d.AcademicYear).WithMany(p => p.ModuleClasses)
                .HasForeignKey(d => d.AcademicYearId)
                .HasConstraintName("FK__ModuleCla__Acade__03F0984C");

            entity.HasOne(d => d.Major).WithMany(p => p.ModuleClasses)
                .HasForeignKey(d => d.MajorId)
                .HasConstraintName("FK__ModuleCla__Major__05D8E0BE");

            entity.HasOne(d => d.Semester).WithMany(p => p.ModuleClasses)
                .HasForeignKey(d => d.SemesterId)
                .HasConstraintName("FK__ModuleCla__Semes__04E4BC85");

            entity.HasOne(d => d.Subject).WithMany(p => p.ModuleClasses)
                .HasForeignKey(d => d.SubjectId)
                .HasConstraintName("FK__ModuleCla__Subje__06CD04F7");

            entity.HasOne(d => d.Teacher).WithMany(p => p.ModuleClasses)
                .HasForeignKey(d => d.TeacherId)
                .HasConstraintName("FK__ModuleCla__Teach__07C12930");
        });

        modelBuilder.Entity<Semester>(entity =>
        {
            entity.HasKey(e => e.SemesterId).HasName("PK__Semester__043301DD6B9CB641");

            entity.ToTable("Semester");

            entity.Property(e => e.SemesterName).HasMaxLength(20);
        });

        modelBuilder.Entity<Student>(entity =>
        {
            entity.HasKey(e => e.StudentId).HasName("PK__Student__32C52B99EF8B6411");

            entity.ToTable("Student");

            entity.Property(e => e.StudentId)
                .HasMaxLength(15)
                .IsUnicode(false);
            entity.Property(e => e.AcademicStatus).HasMaxLength(30);
            entity.Property(e => e.AcademicYearId)
                .HasMaxLength(15)
                .IsUnicode(false);
            entity.Property(e => e.CitizenIdentification)
                .HasMaxLength(15)
                .IsUnicode(false)
                .IsFixedLength();
            entity.Property(e => e.ClassStudentId)
                .HasMaxLength(15)
                .IsUnicode(false);
            entity.Property(e => e.Country).HasMaxLength(30);
            entity.Property(e => e.DistrictCounty)
                .HasMaxLength(30)
                .HasColumnName("District_County");
            entity.Property(e => e.EthnicGroup).HasMaxLength(50);
            entity.Property(e => e.FullName).HasMaxLength(100);
            entity.Property(e => e.PhoneNumber)
                .HasMaxLength(10)
                .IsUnicode(false)
                .IsFixedLength();
            entity.Property(e => e.PlaceOfBirth).HasMaxLength(100);
            entity.Property(e => e.Religion).HasMaxLength(30);
            entity.Property(e => e.StateProvince)
                .HasMaxLength(30)
                .HasColumnName("State_Province");
            entity.Property(e => e.TypeStudent).HasMaxLength(30);
            entity.Property(e => e.UnionParty).HasColumnName("Union_Party");
            entity.Property(e => e.UrlImage)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.WardCommune)
                .HasMaxLength(30)
                .HasColumnName("Ward_Commune");

            entity.HasOne(d => d.AcademicYear).WithMany(p => p.Students)
                .HasForeignKey(d => d.AcademicYearId)
                .HasConstraintName("FK__Student__Academi__6C190EBB");

            entity.HasOne(d => d.StudentNavigation).WithOne(p => p.Student)
                .HasForeignKey<Student>(d => d.StudentId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Student__Student__6B24EA82");
        });

        modelBuilder.Entity<Subject>(entity =>
        {
            entity.HasKey(e => e.SubjectId).HasName("PK__Subject__AC1BA3A8A4EAEC07");

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
                .HasConstraintName("FK__Subject__Departm__74AE54BC");
        });

        modelBuilder.Entity<SubjectTeacher>(entity =>
        {
            entity.HasKey(e => e.SubjectTeacherId).HasName("PK__SubjectT__B8B924C87037CF63");

            entity.ToTable("SubjectTeacher");

            entity.Property(e => e.SubjectId)
                .HasMaxLength(15)
                .IsUnicode(false);
            entity.Property(e => e.TeacherId)
                .HasMaxLength(15)
                .IsUnicode(false);

            entity.HasOne(d => d.Subject).WithMany(p => p.SubjectTeachers)
                .HasForeignKey(d => d.SubjectId)
                .HasConstraintName("FK__SubjectTe__Subje__75A278F5");

            entity.HasOne(d => d.Teacher).WithMany(p => p.SubjectTeachers)
                .HasForeignKey(d => d.TeacherId)
                .HasConstraintName("FK__SubjectTe__Teach__76969D2E");
        });

        modelBuilder.Entity<Teacher>(entity =>
        {
            entity.HasKey(e => e.TeacherId).HasName("PK__Teacher__EDF2596442A910F7");

            entity.ToTable("Teacher");

            entity.Property(e => e.TeacherId)
                .HasMaxLength(15)
                .IsUnicode(false);
            entity.Property(e => e.CitizenIdentification)
                .HasMaxLength(15)
                .IsUnicode(false)
                .IsFixedLength();
            entity.Property(e => e.Country).HasMaxLength(30);
            entity.Property(e => e.DistrictCounty)
                .HasMaxLength(30)
                .HasColumnName("District_County");
            entity.Property(e => e.EthnicGroup).HasMaxLength(50);
            entity.Property(e => e.FullName).HasMaxLength(100);
            entity.Property(e => e.PhoneNumber)
                .HasMaxLength(10)
                .IsUnicode(false)
                .IsFixedLength();
            entity.Property(e => e.PlaceOfBirth).HasMaxLength(100);
            entity.Property(e => e.Religion).HasMaxLength(30);
            entity.Property(e => e.StateProvince)
                .HasMaxLength(30)
                .HasColumnName("State_Province");
            entity.Property(e => e.UrlImage)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.WardCommune)
                .HasMaxLength(30)
                .HasColumnName("Ward_Commune");

            entity.HasOne(d => d.TeacherNavigation).WithOne(p => p.Teacher)
                .HasForeignKey<Teacher>(d => d.TeacherId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Teacher__Teacher__68487DD7");
        });

        modelBuilder.Entity<TeachingPlan>(entity =>
        {
            entity.HasKey(e => e.TeachingPlan1).HasName("PK__Teaching__8322E06E2D50A465");

            entity.ToTable("TeachingPlan");

            entity.Property(e => e.TeachingPlan1).HasColumnName("TeachingPlan");
            entity.Property(e => e.CreditGpa).HasColumnName("Credit_GPA");
            entity.Property(e => e.SubjectId)
                .HasMaxLength(15)
                .IsUnicode(false);

            entity.HasOne(d => d.CurriculumStructureFramework).WithMany(p => p.TeachingPlans)
                .HasForeignKey(d => d.CurriculumStructureFrameworkId)
                .HasConstraintName("FK__TeachingP__Curri__02FC7413");

            entity.HasOne(d => d.Semester).WithMany(p => p.TeachingPlans)
                .HasForeignKey(d => d.SemesterId)
                .HasConstraintName("FK__TeachingP__Semes__01142BA1");

            entity.HasOne(d => d.Subject).WithMany(p => p.TeachingPlans)
                .HasForeignKey(d => d.SubjectId)
                .HasConstraintName("FK__TeachingP__Subje__02084FDA");
        });

        modelBuilder.Entity<TimeTable>(entity =>
        {
            entity.HasKey(e => e.TimeTableId).HasName("PK__TimeTabl__C087BD0AF90A7B27");

            entity.ToTable("TimeTable");

            entity.Property(e => e.ClassRoomId)
                .HasMaxLength(15)
                .IsUnicode(false);
            entity.Property(e => e.DayOfWeek).HasMaxLength(20);
            entity.Property(e => e.ModuleClassId)
                .HasMaxLength(15)
                .IsUnicode(false);

            entity.HasOne(d => d.ClassRoom).WithMany(p => p.TimeTables)
                .HasForeignKey(d => d.ClassRoomId)
                .HasConstraintName("FK__TimeTable__Class__09A971A2");

            entity.HasOne(d => d.ModuleClass).WithMany(p => p.TimeTables)
                .HasForeignKey(d => d.ModuleClassId)
                .HasConstraintName("FK__TimeTable__Modul__08B54D69");
        });

        modelBuilder.Entity<TuitionRate>(entity =>
        {
            entity.HasKey(e => e.TuitionRateId).HasName("PK__TuitionR__40692EE0EA246588");

            entity.ToTable("TuitionRate");

            entity.Property(e => e.AmountPerCredit).HasColumnType("decimal(10, 2)");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
