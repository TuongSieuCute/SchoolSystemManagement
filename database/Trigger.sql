USE SchoolSystemManagement
GO

CREATE OR ALTER TRIGGER trgInsertTrainingProgram_Course
ON TrainingProgram_Course
INSTEAD OF INSERT
AS
BEGIN
    INSERT INTO TrainingProgram_Course(TrainingProgram_CourseId, TrainingProgramId, CourseId)
    SELECT i.CourseId + '.' + i.TrainingProgramId, i.TrainingProgramId, CourseId
    FROM Inserted i
END
GO

CREATE OR ALTER TRIGGER trgInsertTrainingProgram_ModuleGroup
ON TrainingProgram_ModuleGroup
INSTEAD OF INSERT
AS
BEGIN
    INSERT INTO TrainingProgram_ModuleGroup(TrainingProgram_ModuleGroupId, NumberOfElectiveCredits, TrainingProgramId, ModuleGroupId)
    SELECT i.TrainingProgramId + '.' + i.ModuleGroupId, i.NumberOfElectiveCredits, i.TrainingProgramId, i.ModuleGroupId
    FROM Inserted i
END
GO

CREATE OR ALTER TRIGGER trgInsertCourseRes
ON CourseRegistration
INSTEAD OF INSERT
AS
BEGIN
	DECLARE @TuitionFeesId VARCHAR(20)
	DECLARE @AmountPerCredit DECIMAL(10,0)

    SELECT TOP 1 @TuitionFeesId = TuitionFeesId, @AmountPerCredit = AmountPerCredit
	FROM TuitionFees
	ORDER BY TuitionFeesId DESC

	INSERT INTO CourseRegistration(ModuleClassId, StudentId, TuitionFeesId, Total)
	SELECT i.ModuleClassId, i.StudentId, @TuitionFeesId, @AmountPerCredit * s.NumberOfCredit
	FROM inserted i
	JOIN ModuleClass mc ON i.ModuleClassId = mc.ModuleClassId
	JOIN Subject s ON mc.SubjectId = s.SubjectId
END
GO

CREATE OR ALTER FUNCTION CalculateNewCumulativeAverageGrade10
(
	@StudentId VARCHAR(20),
	@ModuleClassId VARCHAR(20),
	@CumulativeAverageGrade10Present DECIMAL(3,1),
	@CumulativeCredit TINYINT,
	@NewAverageGrade10 DECIMAL(3,1),
	@Credit TINYINT
)
RETURNS DECIMAL(3,1)
AS
BEGIN
	DECLARE @TotalPoints DECIMAL(10, 1)
    DECLARE @NewGPA DECIMAL(3, 1)
	DECLARE @SubjectId VARCHAR(20)
	DECLARE @OldAverageGrade10 DECIMAL(3,1) = 0

	SELECT @StudentId = SubjectId
	FROM ModuleClass
	WHERE ModuleClassId = @ModuleClassId

	SELECT @OldAverageGrade10 = AverageGrade10
	FROM CourseRegistration cr
	WHERE cr.ModuleClassId IN (SELECT s.ModuleClassId 
							FROM ModuleClass s 
							JOIN ClassSchedule c ON s.ModuleClassId = c.ModuleClassId
							WHERE s.SubjectId = @SubjectId
							AND cr.StudentId = @StudentId)

    -- Tinh tong diem tich luy truoc khi cong
    SET @TotalPoints = @CumulativeAverageGrade10Present * @CumulativeCredit

    -- Tru diem tich luy mon da hoc lai
	IF @OldAverageGrade10 > 0
	BEGIN
		SET @TotalPoints = @TotalPoints - (@OldAverageGrade10 * @Credit)
	END
	ELSE
	BEGIN
		SET @CumulativeCredit = @CumulativeCredit + @Credit
	END

    -- Cong them diem
    SET @TotalPoints = @TotalPoints + (@NewAverageGrade10 * @Credit);

    -- Tinh lai GPA moi
    SET @NewGPA = @TotalPoints / @CumulativeCredit

    RETURN @NewGPA;
END
GO

CREATE OR ALTER TRIGGER trgAfterUpdateGrade
ON CourseRegistration
AFTER UPDATE
AS
BEGIN
	DECLARE @StudentId VARCHAR(20)
    DECLARE @SubjectId VARCHAR(20)
	DECLARE @Pass BIT = null

	SELECT @StudentId = StudentId, @SubjectId = mc.SubjectId
    FROM Inserted i
	JOIN ModuleClass mc ON i.ModuleClassId = mc.ModuleClassId
	JOIN Subject s ON mc.SubjectId = s.SubjectId

	SELECT @Pass = cr.IsPass
	FROM CourseRegistration cr
	WHERE cr.ModuleClassId IN (
		SELECT s.ModuleClassId 
		FROM ModuleClass s 
		JOIN ClassSchedule c ON s.ModuleClassId = c.ModuleClassId
		WHERE s.SubjectId = @SubjectId
		AND cr.StudentId = @StudentId)

    UPDATE cr
    SET 
        cr.AverageGrade10 = Calc.GradeTotal,
        cr.AverageGrade4 = CASE 
							WHEN Calc.GradeTotal >= 8.5 AND Calc.GradeTotal <= 10 THEN 4.0
							WHEN Calc.GradeTotal >= 8.0 AND Calc.GradeTotal <= 8.4 THEN 3.5
							WHEN Calc.GradeTotal >= 7.0 AND Calc.GradeTotal <= 7.9 THEN 3
							WHEN Calc.GradeTotal >= 6.5 AND Calc.GradeTotal <= 6.9 THEN 2.5
							WHEN Calc.GradeTotal >= 5.5 AND Calc.GradeTotal <= 6.4 THEN 2
							WHEN Calc.GradeTotal >= 5.0 AND Calc.GradeTotal <= 5.4 THEN 1.5
							WHEN Calc.GradeTotal >= 4.0 AND Calc.GradeTotal <= 4.9 THEN 1
							ELSE 0
						   END,
        cr.Literacy = CASE 
                        WHEN Calc.GradeTotal >= 8.5 AND Calc.GradeTotal <= 10 THEN 'A'
                        WHEN Calc.GradeTotal >= 8.0 AND Calc.GradeTotal <= 8.4 THEN 'B+'
                        WHEN Calc.GradeTotal >= 7.0 AND Calc.GradeTotal <= 7.9 THEN 'B'
                        WHEN Calc.GradeTotal >= 6.5 AND Calc.GradeTotal <= 6.9 THEN 'C+'
						WHEN Calc.GradeTotal >= 5.5 AND Calc.GradeTotal <= 6.4 THEN 'C'
                        WHEN Calc.GradeTotal >= 5.0 AND Calc.GradeTotal <= 5.4 THEN 'D+'
                        WHEN Calc.GradeTotal >= 4.0 AND Calc.GradeTotal <= 4.9 THEN 'D'
                        ELSE 'F'
                      END,
        cr.IsPass = CASE 
                        WHEN Calc.GradeTotal >= 4.0 AND Calc.GradeTotal <= 10 THEN 1  -- TRUE
                        ELSE 0  -- FALSE
                    END
    FROM CourseRegistration AS cr
    JOIN Inserted i ON cr.ModuleClassId = i.ModuleClassId AND cr.StudentId = i.StudentId
	CROSS APPLY (SELECT (i.MidtermGrade * i.MidtermGradePercentage) + (i.FinalExamGrade * i.FinalExamGradePercentage) AS GradeTotal) AS Calc
	JOIN ModuleClass mc ON i.ModuleClassId = mc.ModuleClassId

	IF @Pass is null
	BEGIN
		UPDATE cp
		SET 
			cp.TotalCredit = cp.TotalCredit + s.NumberOfCredit,
			cp.CreditPass = cp.CreditPass + CASE WHEN cr.IsPass = 1 THEN s.NumberOfCredit ELSE 0 END,
			cp.CreditFall = cp.CreditFall + CASE WHEN cr.IsPass = 1 THEN 0 ELSE s.NumberOfCredit END,
			cp.CumulativeCredit = cp.CumulativeCredit + CASE WHEN s.IsCredit_GPA = 1 AND cr.IsPass = 1 THEN s.NumberOfCredit ELSE 0 END,
			cp.CumulativeAverageGrade10 = dbo.CalculateNewCumulativeAverageGrade10(cr.StudentId, 
																				   cr.ModuleClassId, 
																				   cp.CumulativeAverageGrade10, 
																				   cp.CumulativeCredit, 
																				   cr.AverageGrade10, 
																				   s.NumberOfCredit)
		FROM CumulativePoint AS cp
		JOIN CourseRegistration AS cr ON cr.StudentId = cp.CumulativePointId
		JOIN Inserted i ON cr.ModuleClassId = i.ModuleClassId AND cr.StudentId = i.StudentId
		JOIN ModuleClass mc ON i.ModuleClassId = mc.ModuleClassId  
		JOIN Subject s ON mc.SubjectId = s.SubjectId
	END
	ELSE
	BEGIN
		UPDATE cp
		SET 
			cp.CreditPass = cp.CreditPass + CASE WHEN @Pass = 0 AND cr.IsPass = 1 THEN s.NumberOfCredit 
												 WHEN @Pass = 1 AND cr.IsPass = 0 THEN (- s.NumberOfCredit)
												 ELSE 0 END,
			cp.CreditFall = cp.CreditFall + CASE WHEN @Pass = 1 AND cr.IsPass = 1 THEN 0 
												 WHEN @Pass = 0 AND cr.IsPass = 0 THEN 0
												 ELSE (- s.NumberOfCredit) END,
			cp.CumulativeCredit = cp.CumulativeCredit + CASE WHEN s.IsCredit_GPA = 1 AND cr.IsPass = 1 THEN s.NumberOfCredit ELSE 0 END,
			cp.CumulativeAverageGrade10 = dbo.CalculateNewCumulativeAverageGrade10(cr.StudentId, 
																				   cr.ModuleClassId, 
																				   cp.CumulativeAverageGrade10, 
																				   cp.CumulativeCredit, 
																				   cr.AverageGrade10, 
																				   s.NumberOfCredit)
		FROM CumulativePoint AS cp
		JOIN CourseRegistration AS cr ON cr.StudentId = cp.CumulativePointId
		JOIN Inserted i ON cr.ModuleClassId = i.ModuleClassId AND cr.StudentId = i.StudentId
		JOIN ModuleClass mc ON i.ModuleClassId = mc.ModuleClassId  
		JOIN Subject s ON mc.SubjectId = s.SubjectId
	END

	UPDATE cp
		SET 
			cp.CumulativeAverageGrade4 = CASE 
											WHEN cp.CumulativeAverageGrade10 >= 8.5 AND cp.CumulativeAverageGrade10 <= 10 THEN 4.0
											WHEN cp.CumulativeAverageGrade10 >= 8.0 AND cp.CumulativeAverageGrade10 <= 8.4 THEN 3.5
											WHEN cp.CumulativeAverageGrade10 >= 7.0 AND cp.CumulativeAverageGrade10 <= 7.9 THEN 3
											WHEN cp.CumulativeAverageGrade10 >= 6.5 AND cp.CumulativeAverageGrade10 <= 6.9 THEN 2.5
											WHEN cp.CumulativeAverageGrade10 >= 5.5 AND cp.CumulativeAverageGrade10 <= 6.4 THEN 2
											WHEN cp.CumulativeAverageGrade10 >= 5.0 AND cp.CumulativeAverageGrade10 <= 5.4 THEN 1.5
											WHEN cp.CumulativeAverageGrade10 >= 4.0 AND cp.CumulativeAverageGrade10 <= 4.9 THEN 1
											ELSE 0
									    END
		FROM CumulativePoint AS cp
END
GO


