USE SchoolSystemManagement
GO

CREATE OR ALTER TRIGGER trgAfterUpdateStudent
ON CourseRegistration
AFTER UPDATE
AS
BEGIN
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
END
GO


drop trigger trgAfterUpdateStudent

