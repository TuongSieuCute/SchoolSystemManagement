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

    public virtual DbSet<CourseCurriculumFramework> CourseCurriculumFrameworks { get; set; }

    public virtual DbSet<CourseRegistration> CourseRegistrations { get; set; }

    public virtual DbSet<Cumulative> Cumulatives { get; set; }

    public virtual DbSet<CurriculumFramework> CurriculumFrameworks { get; set; }

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
            entity.HasKey(e => e.AcademicYearId).HasName("PK__Academic__C54C7A01D3EAC94A");

            entity.ToTable("AcademicYear");

            entity.Property(e => e.AcademicYearId)
                .HasMaxLength(15)
                .IsUnicode(false);
            entity.Property(e => e.AcademicYearName).HasMaxLength(20);
        });

        modelBuilder.Entity<Account>(entity =>
        {
            entity.HasKey(e => e.UserName).HasName("PK__Account__C9F284573D71AFDD");

            entity.ToTable("Account");

            entity.Property(e => e.UserName)
                .HasMaxLength(15)
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
            entity.HasKey(e => e.ClassRoomId).HasName("PK__ClassRoo__742E12919F6E64E5");

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

        modelBuilder.Entity<CourseCurriculumFramework>(entity =>
        {
            entity.HasKey(e => e.CourseCurriculumFrameworkId).HasName("PK__CourseCu__AA02D50E9D878D61");

            entity.ToTable("CourseCurriculumFramework");

            entity.Property(e => e.AcademicYearId)
                .HasMaxLength(15)
                .IsUnicode(false);
            entity.Property(e => e.MajorId)
                .HasMaxLength(15)
                .IsUnicode(false);

            entity.HasOne(d => d.AcademicYear).WithMany(p => p.CourseCurriculumFrameworks)
                .HasForeignKey(d => d.AcademicYearId)
                .HasConstraintName("FK__CourseCur__Acade__75A278F5");

            entity.HasOne(d => d.CurriculumFramework).WithMany(p => p.CourseCurriculumFrameworks)
                .HasForeignKey(d => d.CurriculumFrameworkId)
                .HasConstraintName("FK__CourseCur__Curri__76969D2E");

            entity.HasOne(d => d.Major).WithMany(p => p.CourseCurriculumFrameworks)
                .HasForeignKey(d => d.MajorId)
                .HasConstraintName("FK__CourseCur__Major__778AC167");
        });

        modelBuilder.Entity<CourseRegistration>(entity =>
        {
            entity.HasKey(e => e.CourseRegistrationId).HasName("PK__CourseRe__A0FC0B76BD9DCC99");

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
                .HasConstraintName("FK__CourseReg__Modul__02FC7413");

            entity.HasOne(d => d.Student).WithMany(p => p.CourseRegistrations)
                .HasForeignKey(d => d.StudentId)
                .HasConstraintName("FK__CourseReg__Stude__02084FDA");

            entity.HasOne(d => d.TuitionRate).WithMany(p => p.CourseRegistrations)
                .HasForeignKey(d => d.TuitionRateId)
                .HasConstraintName("FK__CourseReg__Tuiti__03F0984C");
        });

        modelBuilder.Entity<Cumulative>(entity =>
        {
            entity.HasKey(e => e.CumulativeId).HasName("PK__Cumulati__23D7E48DFA0B6D09");

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
                .HasConstraintName("FK__Cumulativ__Cours__07C12930");

            entity.HasOne(d => d.Department).WithMany(p => p.Cumulatives)
                .HasForeignKey(d => d.DepartmentId)
                .HasConstraintName("FK__Cumulativ__Depar__05D8E0BE");

            entity.HasOne(d => d.Major).WithMany(p => p.Cumulatives)
                .HasForeignKey(d => d.MajorId)
                .HasConstraintName("FK__Cumulativ__Major__06CD04F7");

            entity.HasOne(d => d.Student).WithMany(p => p.Cumulatives)
                .HasForeignKey(d => d.StudentId)
                .HasConstraintName("FK__Cumulativ__Stude__04E4BC85");
        });

        modelBuilder.Entity<CurriculumFramework>(entity =>
        {
            entity.HasKey(e => e.CurriculumFrameworkId).HasName("PK__Curricul__586496380B853B89");

            entity.ToTable("CurriculumFramework");

            entity.Property(e => e.CurriculumFrameworkName).HasMaxLength(100);
            entity.Property(e => e.DepartmentId)
                .HasMaxLength(15)
                .IsUnicode(false);
            entity.Property(e => e.MajorId)
                .HasMaxLength(15)
                .IsUnicode(false);

            entity.HasOne(d => d.Department).WithMany(p => p.CurriculumFrameworks)
                .HasForeignKey(d => d.DepartmentId)
                .HasConstraintName("FK__Curriculu__Depar__71D1E811");

            entity.HasOne(d => d.Major).WithMany(p => p.CurriculumFrameworks)
                .HasForeignKey(d => d.MajorId)
                .HasConstraintName("FK__Curriculu__Major__72C60C4A");
        });

        modelBuilder.Entity<CurriculumStructure>(entity =>
        {
            entity.HasKey(e => e.CurriculumStructureId).HasName("PK__Curricul__B606433A63AB4275");

            entity.ToTable("CurriculumStructure");

            entity.Property(e => e.CurriculumStructureName).HasMaxLength(100);
            entity.Property(e => e.DetailCurriculumStructure).HasMaxLength(150);
        });

        modelBuilder.Entity<CurriculumStructureFramework>(entity =>
        {
            entity.HasKey(e => e.CurriculumStructureFrameworkId).HasName("PK__Curricul__980C8F9F1EFE064E");

            entity.ToTable("CurriculumStructureFramework");

            entity.HasOne(d => d.CurriculumFramework).WithMany(p => p.CurriculumStructureFrameworks)
                .HasForeignKey(d => d.CurriculumFrameworkId)
                .HasConstraintName("FK__Curriculu__Curri__74AE54BC");

            entity.HasOne(d => d.CurriculumStructure).WithMany(p => p.CurriculumStructureFrameworks)
                .HasForeignKey(d => d.CurriculumStructureId)
                .HasConstraintName("FK__Curriculu__Curri__73BA3083");
        });

        modelBuilder.Entity<Department>(entity =>
        {
            entity.HasKey(e => e.DepartmentId).HasName("PK__Departme__B2079BED12E102AA");

            entity.ToTable("Department");

            entity.Property(e => e.DepartmentId)
                .HasMaxLength(15)
                .IsUnicode(false);
            entity.Property(e => e.DepartmentName).HasMaxLength(100);
        });

        modelBuilder.Entity<DepartmentStudent>(entity =>
        {
            entity.HasKey(e => e.DepartmentStudentId).HasName("PK__Departme__A308E5B08EFDE6CA");

            entity.ToTable("DepartmentStudent");

            entity.Property(e => e.DepartmentId)
                .HasMaxLength(15)
                .IsUnicode(false);
            entity.Property(e => e.StudentId)
                .HasMaxLength(15)
                .IsUnicode(false);

            entity.HasOne(d => d.Department).WithMany(p => p.DepartmentStudents)
                .HasForeignKey(d => d.DepartmentId)
                .HasConstraintName("FK__Departmen__Depar__693CA210");

            entity.HasOne(d => d.Student).WithMany(p => p.DepartmentStudents)
                .HasForeignKey(d => d.StudentId)
                .HasConstraintName("FK__Departmen__Stude__6A30C649");
        });

        modelBuilder.Entity<DepartmentTeacher>(entity =>
        {
            entity.HasKey(e => e.DepartmentTeacherId).HasName("PK__Departme__1D5250DF4C98C538");

            entity.ToTable("DepartmentTeacher");

            entity.Property(e => e.DepartmentId)
                .HasMaxLength(15)
                .IsUnicode(false);
            entity.Property(e => e.TeacherId)
                .HasMaxLength(15)
                .IsUnicode(false);

            entity.HasOne(d => d.Department).WithMany(p => p.DepartmentTeachers)
                .HasForeignKey(d => d.DepartmentId)
                .HasConstraintName("FK__Departmen__Depar__6754599E");

            entity.HasOne(d => d.Teacher).WithMany(p => p.DepartmentTeachers)
                .HasForeignKey(d => d.TeacherId)
                .HasConstraintName("FK__Departmen__Teach__68487DD7");
        });

        modelBuilder.Entity<Major>(entity =>
        {
            entity.HasKey(e => e.MajorId).HasName("PK__Major__D5B8BF91315F0E31");

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
                .HasConstraintName("FK__Major__Departmen__6383C8BA");
        });

        modelBuilder.Entity<MajorStudent>(entity =>
        {
            entity.HasKey(e => e.MajorStudentId).HasName("PK__MajorStu__5D97D2C1EC4D7A6D");

            entity.ToTable("MajorStudent");

            entity.Property(e => e.MajorId)
                .HasMaxLength(15)
                .IsUnicode(false);
            entity.Property(e => e.StudentId)
                .HasMaxLength(15)
                .IsUnicode(false);

            entity.HasOne(d => d.Major).WithMany(p => p.MajorStudents)
                .HasForeignKey(d => d.MajorId)
                .HasConstraintName("FK__MajorStud__Major__6D0D32F4");

            entity.HasOne(d => d.Student).WithMany(p => p.MajorStudents)
                .HasForeignKey(d => d.StudentId)
                .HasConstraintName("FK__MajorStud__Stude__6E01572D");
        });

        modelBuilder.Entity<MajorTeacher>(entity =>
        {
            entity.HasKey(e => e.MajorTeacherId).HasName("PK__MajorTea__9EDDDA229FB888FA");

            entity.ToTable("MajorTeacher");

            entity.Property(e => e.MajorId)
                .HasMaxLength(15)
                .IsUnicode(false);
            entity.Property(e => e.TeacherId)
                .HasMaxLength(15)
                .IsUnicode(false);

            entity.HasOne(d => d.Major).WithMany(p => p.MajorTeachers)
                .HasForeignKey(d => d.MajorId)
                .HasConstraintName("FK__MajorTeac__Major__6B24EA82");

            entity.HasOne(d => d.Teacher).WithMany(p => p.MajorTeachers)
                .HasForeignKey(d => d.TeacherId)
                .HasConstraintName("FK__MajorTeac__Teach__6C190EBB");
        });

        modelBuilder.Entity<ModuleClass>(entity =>
        {
            entity.HasKey(e => e.ModuleClassId).HasName("PK__ModuleCl__B6EAAD827E941ECD");

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
                .HasConstraintName("FK__ModuleCla__Acade__7B5B524B");

            entity.HasOne(d => d.Major).WithMany(p => p.ModuleClasses)
                .HasForeignKey(d => d.MajorId)
                .HasConstraintName("FK__ModuleCla__Major__7D439ABD");

            entity.HasOne(d => d.Semester).WithMany(p => p.ModuleClasses)
                .HasForeignKey(d => d.SemesterId)
                .HasConstraintName("FK__ModuleCla__Semes__7C4F7684");

            entity.HasOne(d => d.Subject).WithMany(p => p.ModuleClasses)
                .HasForeignKey(d => d.SubjectId)
                .HasConstraintName("FK__ModuleCla__Subje__7E37BEF6");

            entity.HasOne(d => d.Teacher).WithMany(p => p.ModuleClasses)
                .HasForeignKey(d => d.TeacherId)
                .HasConstraintName("FK__ModuleCla__Teach__7F2BE32F");
        });

        modelBuilder.Entity<Semester>(entity =>
        {
            entity.HasKey(e => e.SemesterId).HasName("PK__Semester__043301DDF8490BE1");

            entity.ToTable("Semester");

            entity.Property(e => e.SemesterName).HasMaxLength(20);
        });

        modelBuilder.Entity<Student>(entity =>
        {
            entity.HasKey(e => e.StudentId).HasName("PK__Student__32C52B99162683F8");

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
            entity.Property(e => e.Country).HasMaxLength(30);
            entity.Property(e => e.DistrictCounty)
                .HasMaxLength(30)
                .HasColumnName("District_County");
            entity.Property(e => e.Email)
                .HasMaxLength(30)
                .IsUnicode(false);
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
            entity.Property(e => e.WardCommune)
                .HasMaxLength(30)
                .HasColumnName("Ward_Commune");

            entity.HasOne(d => d.AcademicYear).WithMany(p => p.Students)
                .HasForeignKey(d => d.AcademicYearId)
                .HasConstraintName("FK__Student__Academi__66603565");

            entity.HasOne(d => d.StudentNavigation).WithOne(p => p.Student)
                .HasForeignKey<Student>(d => d.StudentId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Student__Student__656C112C");
        });

        modelBuilder.Entity<Subject>(entity =>
        {
            entity.HasKey(e => e.SubjectId).HasName("PK__Subject__AC1BA3A80B5ECB05");

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
                .HasConstraintName("FK__Subject__Departm__6EF57B66");
        });

        modelBuilder.Entity<SubjectTeacher>(entity =>
        {
            entity.HasKey(e => e.SubjectTeacherId).HasName("PK__SubjectT__B8B924C86AAAAA68");

            entity.ToTable("SubjectTeacher");

            entity.Property(e => e.SubjectId)
                .HasMaxLength(15)
                .IsUnicode(false);
            entity.Property(e => e.TeacherId)
                .HasMaxLength(15)
                .IsUnicode(false);

            entity.HasOne(d => d.Subject).WithMany(p => p.SubjectTeachers)
                .HasForeignKey(d => d.SubjectId)
                .HasConstraintName("FK__SubjectTe__Subje__6FE99F9F");

            entity.HasOne(d => d.Teacher).WithMany(p => p.SubjectTeachers)
                .HasForeignKey(d => d.TeacherId)
                .HasConstraintName("FK__SubjectTe__Teach__70DDC3D8");
        });

        modelBuilder.Entity<Teacher>(entity =>
        {
            entity.HasKey(e => e.TeacherId).HasName("PK__Teacher__EDF25964DFA33111");

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
            entity.Property(e => e.Email)
                .HasMaxLength(30)
                .IsUnicode(false);
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
            entity.Property(e => e.WardCommune)
                .HasMaxLength(30)
                .HasColumnName("Ward_Commune");

            entity.HasOne(d => d.TeacherNavigation).WithOne(p => p.Teacher)
                .HasForeignKey<Teacher>(d => d.TeacherId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Teacher__Teacher__6477ECF3");
        });

        modelBuilder.Entity<TeachingPlan>(entity =>
        {
            entity.HasKey(e => e.TeachingPlan1).HasName("PK__Teaching__8322E06E525C4149");

            entity.ToTable("TeachingPlan");

            entity.Property(e => e.TeachingPlan1).HasColumnName("TeachingPlan");
            entity.Property(e => e.CreditGpa).HasColumnName("Credit_GPA");
            entity.Property(e => e.SubjectId)
                .HasMaxLength(15)
                .IsUnicode(false);

            entity.HasOne(d => d.CurriculumStructureFramework).WithMany(p => p.TeachingPlans)
                .HasForeignKey(d => d.CurriculumStructureFrameworkId)
                .HasConstraintName("FK__TeachingP__Curri__7A672E12");

            entity.HasOne(d => d.Semester).WithMany(p => p.TeachingPlans)
                .HasForeignKey(d => d.SemesterId)
                .HasConstraintName("FK__TeachingP__Semes__787EE5A0");

            entity.HasOne(d => d.Subject).WithMany(p => p.TeachingPlans)
                .HasForeignKey(d => d.SubjectId)
                .HasConstraintName("FK__TeachingP__Subje__797309D9");
        });

        modelBuilder.Entity<TimeTable>(entity =>
        {
            entity.HasKey(e => e.TimeTableId).HasName("PK__TimeTabl__C087BD0A68F7C971");

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
                .HasConstraintName("FK__TimeTable__Class__01142BA1");

            entity.HasOne(d => d.ModuleClass).WithMany(p => p.TimeTables)
                .HasForeignKey(d => d.ModuleClassId)
                .HasConstraintName("FK__TimeTable__Modul__00200768");
        });

        modelBuilder.Entity<TuitionRate>(entity =>
        {
            entity.HasKey(e => e.TuitionRateId).HasName("PK__TuitionR__40692EE0857516AA");

            entity.ToTable("TuitionRate");

            entity.Property(e => e.AmountPerCredit).HasColumnType("decimal(10, 2)");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
