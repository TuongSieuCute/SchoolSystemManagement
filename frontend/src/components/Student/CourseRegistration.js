import React from 'react';

const CourseRegistration = () => {
    const postData = async () => {
        const data = {
            "studentId": "47.01.104.233",
            "moduleClassId": "COMP1320562"
        };

        try {
            const response = await fetch('http://localhost:5065/api/CourseRegistration', {
                method: 'POST',
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
            <h1>Test POST Đăng kí học phần</h1>
            <button onClick={postData}>Send Test Data</button>
        </div>
    );
};

export default CourseRegistration;