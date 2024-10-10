import React, { useEffect, useState } from 'react';
import { Dropdown } from 'primereact/dropdown';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';

const AddModuleClass = ( {toggleModalInsert} ) => {
    const [selectedSemester, setSelectedSemester] = useState(null);
    const [trainingProgramCourseIds, setTrainingProgramCourseIds] = useState([]);
    const [selectedTrainingProgramCourseId, setSelectedTrainingProgramCourseId] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [selectedSubjects, setSelectedSubjects] = useState([]);
    const [quantities, setQuantities] = useState({});
    const [numberOfWeek, setNumberOfWeek] = useState(null);
    const [selectedDayAWeek, setSelectedDayAWeek] = useState(null);
    const [selectedLessonPerday, setSelectedLessonPerday] = useState(null);
    const [selectedRoomType, setSelectedRoomType] = useState(null);
    const [maximumNumberOfStudent, setMaximumNumberOfStudent] = useState(null);

    const semester = [
        { id: 'HK1', name: 'Học kì 1' },
        { id: 'HK2', name: 'Học kì 2' },
        { id: 'HKH', name: 'Học kì hè' },
    ]

    const daysAWeek = ['1', '2'];
    const lessonsPerDay = ['3', '4', '5', '6'];
    const roomType = ['Phòng máy tính'];

    useEffect(() => {
        fetch('http://localhost:5065/api/TrainingProgramCourse')
            .then(response => response.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setTrainingProgramCourseIds(data.map(item => ({
                        label: item.trainingProgramCourseId,
                        value: item.trainingProgramCourseId
                    })));
                } else {
                    console.error('Dữ liệu trả về không hợp lệ:', data);
                }
            })
            .catch(err => console.error('Lỗi khi gọi API:', err));
    }, [])

    useEffect(() => {
        const trainingProgramCourseIdsString = selectedTrainingProgramCourseId.join(',');

        fetch(`http://localhost:5065/api/Subject?trainingProgramCourseIds=${trainingProgramCourseIdsString}`)
            .then(response => response.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setSubjects(data.map(item => ({
                        label: item.subjectName,
                        value: item.subjectId
                    })));
                } else {
                    console.error('Dữ liệu trả về không hợp lệ:', data);
                }
            })
            .catch(err => console.error('Lỗi khi gọi API:', err));
    }, [selectedTrainingProgramCourseId])

    const handleSelectTrainingProgramCourseId = (e) => {
        const value = e.value;

        // Nếu ID đã tồn tại trong mảng thì không thay đổi
        if (selectedTrainingProgramCourseId.includes(value)) {
            return; // Không làm gì cả nếu ID đã có
        }

        // Nếu ID chưa tồn tại, thêm ID vào danh sách
        setSelectedTrainingProgramCourseId([...selectedTrainingProgramCourseId, value]);
    };

    const handleRemoveTrainingProgramCourseId = (id) => {
        // Xóa ID khỏi danh sách đã chọn
        setSelectedTrainingProgramCourseId(selectedTrainingProgramCourseId.filter(existingId => existingId !== id));
    };

    const handleSelectSubject = (e) => {
        const value = e.value;

        if (selectedSubjects.includes(value)) {
            return;
        }

        setSelectedSubjects([...selectedSubjects, value]);
        setQuantities((prev) => ({ ...prev, [value]: 1 }));
    };

    const handleQuantityChange = (id, value) => {
        setQuantities((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const handleRemoveSubject = (id) => {
        setSelectedSubjects(selectedSubjects.filter(existingId => existingId !== id));

        const newQuantities = { ...quantities };
        delete newQuantities[id];
        setQuantities(newQuantities);
    };

    const postData = async () => {
        const data = {
            maximumNumberOfStudents: maximumNumberOfStudent,
            semesterId: selectedSemester,
            trainingProgramCourseIds: selectedTrainingProgramCourseId,
            subjectIds: selectedSubjects.map(subjectId => ({
                subjectId,
                count: quantities[subjectId] || 0
            })),
            numberOfWeek: numberOfWeek,
            daysAWeek: selectedDayAWeek,
            lessonsPerDay: selectedLessonPerday,
            roomType: selectedRoomType,
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
                alert("Thêm lớp học phần thành công!");
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
            <h1>Thêm lớp học phần:</h1>
            <div>
                <label>Học kì:</label>
                <Dropdown
                    value={selectedSemester}
                    options={semester.map(s => ({ label: s.name, value: s.id }))}
                    onChange={(e) => setSelectedSemester(e.target.value)}
                    appendTo="self"
                    required
                />
            </div>

            <div>
                <label>Chương trình đào tạo</label>
                <Dropdown
                    value={selectedTrainingProgramCourseId}
                    options={trainingProgramCourseIds}
                    onChange={handleSelectTrainingProgramCourseId}
                    appendTo="self"
                    required
                />

                {selectedTrainingProgramCourseId.length > 0 && (
                    <div>
                        <ul>
                            {selectedTrainingProgramCourseId.map((item, index) => (
                                <li key={index}>
                                    {item}
                                    <button onClick={() => handleRemoveTrainingProgramCourseId(item)}>x</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            <div>
                <label>Học phần:</label>
                <Dropdown
                    value={selectedSubjects}
                    options={subjects}
                    onChange={handleSelectSubject}
                    appendTo="self"
                    required
                    itemTemplate={(item) => (
                        <div>
                            {item.value} - {item.label}
                        </div>
                    )}
                />

                {selectedSubjects.length > 0 && (
                    <div>
                        <ul>
                            {selectedSubjects.map((item, index) => {
                                const subject = subjects.find(s => s.value === item);
                                return (
                                    <li key={index}>
                                        {subject ? `${subject.value} - ${subject.label}` : item}
                                        <input
                                            type="number"
                                            value={quantities[item] || 1}
                                            onChange={(e) => handleQuantityChange(item, e.target.value)}
                                        />
                                        <button onClick={() => handleRemoveSubject(item)}>x</button>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                )}
            </div>

            <div>
                <label>Số lượng tuần học:</label>
                <input
                    type='number'
                    value={numberOfWeek !== null ? numberOfWeek : ""}
                    onChange={(e) => setNumberOfWeek(e.target.value)}
                    min="0"
                    required
                />
            </div>

            <div>
                <label>Số ngày học trong 1 tuần:</label>
                <Dropdown
                    value={selectedDayAWeek}
                    options={daysAWeek}
                    onChange={(e) => setSelectedDayAWeek(e.target.value)}
                    appendTo="self"
                    required
                />
            </div>

            <div>
                <label>Số tiết học trong 1 ngày:</label>
                <Dropdown
                    value={selectedLessonPerday}
                    options={lessonsPerDay}
                    onChange={(e) => setSelectedLessonPerday(e.target.value)}
                    appendTo="self"
                    required
                />
            </div>

            <div>
                <label>Loại phòng học:</label>
                <Dropdown
                    value={selectedRoomType}
                    options={roomType}
                    onChange={(e) => setSelectedRoomType(e.target.value)}
                    appendTo="self"
                />
            </div>

            <div>
                <label>Số lượng sinh viên tối đa:</label>
                <input
                    type='number'
                    value={maximumNumberOfStudent !== null ? maximumNumberOfStudent : ""}
                    onChange={(e) => setMaximumNumberOfStudent(e.target.value)}
                    min="0"
                    required
                />
            </div>
            <button onClick={postData}>Thêm lớp học phần</button>
            <button onClick={toggleModalInsert}>Thoát</button>
        </div >
    );
};

export default AddModuleClass;