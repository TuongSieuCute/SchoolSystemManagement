import React from 'react';

const AddModuleClass = () => {
  const postData = async () => {
    const data = {
      "maximumNumberOfStudents": 50,
      "subjectIds": [
        { "subjectId": "COMP1320", "count": 6 },
      ],
      "semesterId": "HK2",
      "daysAWeek": 1, // so ngay trong tuan
      "lessonsPerDay": 5,
      "numberOfWeek": 10,
      "roomType": "Phòng máy tính",
      "trainingProgramCourseIds": ["K47.CNTT.2021"]
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
    <div className='admin-container'>
      <div className='box'>
        <button>Thêm Lớp học phần</button>
      </div>
    </div>
  );
};

export default AddModuleClass;
