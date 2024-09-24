import React from 'react';

const TeachingRegistration = () => {
    const registerTeaching = async () => {
        const data = {
            "moduleClassId": "COMP1320887",
            "lecturerId": "GV.0001",
        };

        try {
            const response = await fetch('http://localhost:5065/api/ModuleClass', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                alert("Thành công");
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
            <h1>Teaching Registration</h1>
            <button onClick={registerTeaching}>Register Teaching</button>
        </div>
    );
}
export default TeachingRegistration;