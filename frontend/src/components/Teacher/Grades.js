import React from 'react';

const Grades = () => {
    const postData = async () => {
        const data = {
            "studentId": "47.01.104.233",
            "moduleClassId": "COMP1320998",
            "midtermGradePercentage": 0.4,
            "finalExamGradePercentage": 0.6,
            "midtermGrade": 7,
            "finalExamGrade": 2.5,
        };

        try {
            const response = await fetch('http://localhost:5065/api/CourseRegistration', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                alert("thành công")
                const result = await response.json();
                console.log('Success:', result);
            } else {
                const text = await response.text();
                console.error('Server Error Response:', text);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    return (
        <div>
            <h1>Test PUT Nhập điểm</h1>
            <button onClick={postData}>Send Test Data</button>
        </div>
    );
};

export default Grades;

