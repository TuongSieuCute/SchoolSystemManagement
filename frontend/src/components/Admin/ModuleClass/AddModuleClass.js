import React from 'react';

const AddModuleClass = () => {
  const postData = async () => {
    const data = {
      "maximumNumberOfStudents": 50,
      "subjectIds": [
        { "subjectId": "COMP1814", "count": 10 },
        { "subjectId": "COMP1813", "count": 10 },
        { "subjectId": "COMP1811", "count": 10 }
      ],
      "semesterId": "HK2",
      "daysAWeek": 2, // so ngay trong tuan
      "lessonsPerDay": 3,
      "numberOfWeek": 10,
      "roomType": "Phòng máy tính",
    };
    
    try {
      const response = await fetch('http://localhost:5065/api/ModuleClass', {
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
      <h1>Test POST Module Class</h1>
      <button onClick={postData}>Send Test Data</button>
    </div>
  );
};

export default AddModuleClass;
