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

CREATE OR ALTER FUNCTION ChangeAverageGrade10
(
	@AverageGrade10 DECIMAL(3,1)
)
RETURNS DeCIMAL(3,1)
AS
BEGIN
	DECLARE @AverageGrade4 DECIMAL(3,1)
	SET @AverageGrade4 = CASE 
                            WHEN @AverageGrade10 >= 8.5 AND @AverageGrade10 <= 10 THEN 4.0
                            WHEN @AverageGrade10 >= 8.0 AND @AverageGrade10 < 8.5 THEN 3.5
                            WHEN @AverageGrade10 >= 7.0 AND @AverageGrade10 < 8.0 THEN 3.0
                            WHEN @AverageGrade10 >= 6.5 AND @AverageGrade10 < 7.0 THEN 2.5
                            WHEN @AverageGrade10 >= 5.5 AND @AverageGrade10 < 6.5 THEN 2.0
                            WHEN @AverageGrade10 >= 5.0 AND @AverageGrade10 < 5.5 THEN 1.5
                            WHEN @AverageGrade10 >= 4.0 AND @AverageGrade10 < 5.0 THEN 1.0
                            ELSE 0.0
                         END;
	RETURN @AverageGrade4
END
GO

CREATE OR ALTER FUNCTION CheckSubjectId
(
	@StudentId VARCHAR(20),
	@ModuleClassId VARCHAR(20)
)
RETURNS DeCIMAL(3,1)
AS
BEGIN
	DECLARE @SubjectId VARCHAR(20)
	DECLARE @OldAverageGrade10 DECIMAL(3,1) = 0

	SELECT @SubjectId = mc.SubjectId
	FROM ModuleClass mc
	WHERE mc.ModuleClassId = @ModuleClassId

	SELECT TOP 1 @OldAverageGrade10 = cr.AverageGrade10
	FROM CourseRegistration cr
	JOIN ModuleClass mc ON cr.ModuleClassId = mc.ModuleClassId
	WHERE cr.StudentId = @StudentId
	AND mc.SubjectId = @SubjectId
	AND mc.ModuleClassId <> @ModuleClassId
	ORDER BY StudentId DESC

	RETURN @OldAverageGrade10
END
GO

CREATE OR ALTER FUNCTION CalculateNewCumulativeAverageGrade10
(
	@AverageGrade10 DECIMAL(3,1),
	@NumberOfCredit TINYINT,
	@CumulativeAverageGrade10 DECIMAL(3,1),
	@CumulativeCredit TINYINT,
	@StudentId VARCHAR(20),
	@ModuleClassId VARCHAR(20)

)
RETURNS DECIMAL(3,1)
AS
BEGIN
	DECLARE @SubjectId VARCHAR(20)
	DECLARE @OldAverageGrade10 DECIMAL(3,1) = 0
	DECLARE @TotalCumulativeAverageGrade10 DECIMAL(4,1) = 0
	DECLARE @NewGPA DECIMAL(3,1) = 0

	SELECT @SubjectId = mc.SubjectId
	FROM ModuleClass mc
	WHERE mc.ModuleClassId = @ModuleClassId

	-- Kiem tra mon hoc do co tinh diem tich luy hay khong
	IF EXISTS (
		SELECT 1
		FROM Subject s
		WHERE s.SubjectId = @SubjectId
		AND s.IsCredit_GPA = 0)
	BEGIN
		RETURN @CumulativeAverageGrade10
	END

	SET @OldAverageGrade10 = dbo.CheckSubjectId(@StudentId, @ModuleClassId)

	-- Tong diem tich luy hien tai
	SET @TotalCumulativeAverageGrade10 = @CumulativeAverageGrade10 * @CumulativeCredit

	IF @OldAverageGrade10 > 0 -- Da hoc mon nay roi
	BEGIN
		-- Tru diem tich luy cu
		SET @TotalCumulativeAverageGrade10 = @TotalCumulativeAverageGrade10 - (@OldAverageGrade10 * @NumberOfCredit)

		-- Tru tin chi tich luy cu
		SET @CumulativeCredit = @CumulativeCredit - @NumberOfCredit
	END
	
	-- Tong diem tich luy moi
	SET @TotalCumulativeAverageGrade10 = @TotalCumulativeAverageGrade10 + (@AverageGrade10 * @NumberOfCredit)

	-- Tong tin chi tich luy moi
	SET @CumulativeCredit = @CumulativeCredit + @NumberOfCredit

	-- GPA moi
	SET @NewGPA = @TotalCumulativeAverageGrade10 / @CumulativeCredit

	RETURN @NewGPA
END
GO

CREATE OR ALTER TRIGGER trgAfterUpdateGrade
ON CourseRegistration
AFTER UPDATE
AS
BEGIN
	-- UPDATE bang CourseRegistration
    UPDATE cr
    SET 
        cr.AverageGrade10 = Calc.GradeTotal,
        cr.AverageGrade4 = dbo.ChangeAverageGrade10(Calc.GradeTotal),
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
                        WHEN Calc.GradeTotal >= 4.0 AND Calc.GradeTotal <= 10 THEN 1 
                        ELSE 0 
                    END
    FROM CourseRegistration AS cr
    JOIN Inserted i ON cr.ModuleClassId = i.ModuleClassId AND cr.StudentId = i.StudentId
	CROSS APPLY (SELECT CONVERT(DECIMAL(3,1), (i.MidtermGrade * i.MidtermGradePercentage) + (i.FinalExamGrade * i.FinalExamGradePercentage)) AS GradeTotal) AS Calc
	JOIN ModuleClass mc ON i.ModuleClassId = mc.ModuleClassId

	-- UPDATE bang CumulativePoint
	DECLARE @OldAverageGrade10 DECIMAL(3,1) = 0
	SELECT @OldAverageGrade10 = dbo.CheckSubjectId(i.StudentId, i.ModuleClassId)
	FROM inserted i

	IF @OldAverageGrade10 > 0
	BEGIN
		UPDATE cp
		SET 
			cp.CreditPass = cp.CreditPass + CASE WHEN @OldAverageGrade10 < 4 AND Calc.GradeTotal >= 4 THEN s.NumberOfCredit 
												 WHEN @OldAverageGrade10 >= 4 AND Calc.GradeTotal < 4 THEN (- s.NumberOfCredit)
												 ELSE 0 END,
			cp.CreditFall = cp.CreditFall + CASE WHEN @OldAverageGrade10 >= 4 AND Calc.GradeTotal >= 4 THEN 0 
												 WHEN @OldAverageGrade10 < 4 AND Calc.GradeTotal < 4 THEN 0
												 ELSE (- s.NumberOfCredit) END,
			cp.CumulativeCredit = cp.CumulativeCredit + CASE WHEN s.IsCredit_GPA = 1 AND Calc.GradeTotal >= 4 THEN s.NumberOfCredit ELSE 0 END,
			cp.CumulativeAverageGrade10 = dbo.CalculateNewCumulativeAverageGrade10(Calc.GradeTotal, 
																				   s.NumberOfCredit, 
																				   cp.CumulativeAverageGrade10, 
																				   cp.CumulativeCredit, 
																				   cp.StudentId, 
																				   mc.ModuleClassId),
			cp.CumulativeAverageGrade4 = dbo.ChangeAverageGrade10(dbo.CalculateNewCumulativeAverageGrade10(Calc.GradeTotal, 
																										   s.NumberOfCredit, 
																										   cp.CumulativeAverageGrade10, 
																										   cp.CumulativeCredit, 
																										   cp.StudentId, 
																										   mc.ModuleClassId))
			FROM CumulativePoint cp
			JOIN inserted i ON cp.StudentId = i.StudentId
			CROSS APPLY (SELECT CONVERT(DECIMAL(3,1), (i.MidtermGrade * i.MidtermGradePercentage) + (i.FinalExamGrade * i.FinalExamGradePercentage)) AS GradeTotal) AS Calc
			JOIN ModuleClass mc ON i.ModuleClassId = mc.ModuleClassId
			JOIN Subject s ON mc.SubjectId = s.SubjectId
			WHERE cp.TrainingProgram_CourseId IN (
				SELECT tc.TrainingProgram_CourseId 
				FROM TrainingProgram_ModuleGroup_Subject tms
				JOIN TrainingProgram_ModuleGroup tm ON tms.TrainingProgram_ModuleGroupId = tm.TrainingProgram_ModuleGroupId
				JOIN TrainingProgram_Course tc ON tm.TrainingProgramId = tc.TrainingProgramId
				WHERE mc.ModuleClassId = i.ModuleClassId
				AND tms.SubjectId = mc.SubjectId)
	END
	ELSE
	BEGIN
		UPDATE cp
		SET 
			cp.TotalCredit = cp.TotalCredit + s.NumberOfCredit,
			cp.CreditPass = cp.CreditPass + CASE WHEN Calc.GradeTotal >= 4 THEN s.NumberOfCredit ELSE 0 END,
			cp.CreditFall = cp.CreditFall + CASE WHEN Calc.GradeTotal >= 4 THEN 0 ELSE s.NumberOfCredit END,
			cp.CumulativeCredit = cp.CumulativeCredit + CASE WHEN s.IsCredit_GPA = 1 AND Calc.GradeTotal >= 4 THEN s.NumberOfCredit ELSE 0 END,
			cp.CumulativeAverageGrade10 = dbo.CalculateNewCumulativeAverageGrade10(Calc.GradeTotal, 
																				   s.NumberOfCredit, 
																				   cp.CumulativeAverageGrade10, 
																				   cp.CumulativeCredit, 
																				   cp.StudentId, 
																				   mc.ModuleClassId),
			cp.CumulativeAverageGrade4 = dbo.ChangeAverageGrade10(dbo.CalculateNewCumulativeAverageGrade10(Calc.GradeTotal, 
																										   s.NumberOfCredit, 
																										   cp.CumulativeAverageGrade10, 
																										   cp.CumulativeCredit, 
																										   cp.StudentId, 
																										   mc.ModuleClassId))
		FROM CumulativePoint cp
		JOIN inserted i ON cp.StudentId = i.StudentId
		CROSS APPLY (SELECT CONVERT(DECIMAL(3,1), (i.MidtermGrade * i.MidtermGradePercentage) + (i.FinalExamGrade * i.FinalExamGradePercentage)) AS GradeTotal) AS Calc
		JOIN ModuleClass mc ON i.ModuleClassId = mc.ModuleClassId
		JOIN Subject s ON mc.SubjectId = s.SubjectId
		WHERE cp.TrainingProgram_CourseId IN (
			SELECT tc.TrainingProgram_CourseId 
			FROM TrainingProgram_ModuleGroup_Subject tms
			JOIN TrainingProgram_ModuleGroup tm ON tms.TrainingProgram_ModuleGroupId = tm.TrainingProgram_ModuleGroupId
			JOIN TrainingProgram_Course tc ON tm.TrainingProgramId = tc.TrainingProgramId
			WHERE mc.ModuleClassId = i.ModuleClassId
			AND tms.SubjectId = mc.SubjectId)
	END
END
GO

CREATE TRIGGER trg_AfterInsertNotifications
ON Notifications
AFTER INSERT
AS
BEGIN
    INSERT INTO StudentNotifications (NotificationId, StudentId, IsRead)
    SELECT i.NotificationsId, s.StudentId, 0
    FROM INSERTED i 
    CROSS JOIN Student s
END
GO
