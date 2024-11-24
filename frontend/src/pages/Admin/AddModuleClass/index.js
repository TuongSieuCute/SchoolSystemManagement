import { Dropdown } from 'primereact/dropdown';
import React, { useEffect, useState } from 'react';
// import 'primereact/resources/themes/saga-blue/theme.css';
// import 'primereact/resources/primereact.min.css';
import { Button } from 'primereact/button';
import { Chip } from 'primereact/chip';
import { Column } from 'primereact/column';
import { DataTable, } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { addModuleClass } from '../../../common/sevices/moduleClassService';
import { getCourses } from '../../../common/sevices/subjectService';
import { getTrainingProgram } from '../../../common/sevices/trainingProgramCourseService';
const AddModuleClass = ({ visible, toggleModalInsert }) => {

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
    ];

    const daysAWeek = ['1', '2'];
    const lessonsPerDay = ['3', '4', '5', '6'];
    const roomType = ['Phòng máy tính'];

    useEffect(() => {
        getTrainingProgram()
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
    }, []);

    useEffect(() => {
        getCourses(trainingProgramCourseIds)
            .then(response => response.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setSubjects(data.map(item => ({
                        label: `${item.subjectId} - ${item.subjectName}`,
                        value: item,
                        name: item.subjectName,
                        id: item.subjectId,
                    })));
                } else {
                    console.error('Dữ liệu trả về không hợp lệ:', data);
                }
            })
            .catch(err => console.error('Lỗi khi gọi API:', err));
    }, [selectedTrainingProgramCourseId]);

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
        setSelectedSubjects(selectedSubjects.filter(subject => subject.subjectId !== id));

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
            const response = addModuleClass(data);
            if (response.ok) {
                alert('Thêm lớp học phần thành công!');
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


    const renderModalFooter = (
        <div>
            <Button onClick={postData}>Thêm </Button>
            <Button onClick={toggleModalInsert}>Thoát</Button>
        </div>
    );

    return (
        <Dialog visible={visible} header="Thêm lớp học phần" footer={renderModalFooter} className="w-6">
            <div className="formgrid">
                <div className="field">
                    <label htmlFor='hocKy'>Học kì:
                    </label>
                    <Dropdown
                        value={selectedSemester}
                        options={semester.map(s => ({ label: s.name, value: s.id }))}
                        onChange={(e) => setSelectedSemester(e.target.value)}
                        className='w-full'
                        required
                        name='hocKy'
                    />
                </div>

                <div className="field">
                    <label htmlFor="chuongTrinhDaoTao">Chương trình đào tạo</label>
                    <Dropdown
                        value={selectedTrainingProgramCourseId}
                        options={trainingProgramCourseIds}
                        onChange={handleSelectTrainingProgramCourseId}
                        appendTo="self"
                        required
                        className='w-full'
                        name="chuongTrinhDaoTao"
                    />

                    {selectedTrainingProgramCourseId.length > 0 && (
                        <div className="flex flex-wrap gap-3 mt-2">
                            {selectedTrainingProgramCourseId.map((item, index) => (
                                <Chip key={index} label={item} removable onRemove={() => handleRemoveTrainingProgramCourseId(item)} />
                            ))}
                        </div>
                    )}
                </div>

                <div className="field">
                    <label>Học phần:</label>
                    <Dropdown
                        value={selectedSubjects}
                        options={subjects}
                        optionLabel='label'
                        onChange={handleSelectSubject}
                        appendTo="self"
                        className='w-full'
                        required
                    />
                    {
                        selectedSubjects.length > 0 && (
                            <DataTable value={selectedSubjects} className="w-full mt-2">
                                <Column field="subjectId" header="Mã học phần" />
                                <Column field="subjectName" header="Tên học phần" />
                                <Column header="Số lượng lớp" body={(rowData) => (
                                    <InputNumber max={60} min={1} value={quantities[rowData.subjectId]} onChange={(e) => handleQuantityChange(rowData.subjectId, e.value)} />
                                )} />
                                <Column body={(rowData) => (
                                    <Button icon="pi pi-times" severity='danger' onClick={() => handleRemoveSubject(rowData.subjectId)} />
                                )} />
                            </DataTable>
                        )
                    }
                </div>

                <div className="field">
                    <label>Số lượng tuần học:</label>
                    <InputText
                        type='number'
                        value={numberOfWeek !== null ? numberOfWeek : ''}
                        onChange={(e) => setNumberOfWeek(e.target.value)}
                        min="0"
                        required
                        className='w-full'
                    />
                </div>

                <div className="field">
                    <label>Số ngày học trong 1 tuần:</label>
                    <Dropdown
                        value={selectedDayAWeek}
                        options={daysAWeek}
                        onChange={(e) => setSelectedDayAWeek(e.target.value)}
                        appendTo="self"
                        className='w-full'
                        required
                    />
                </div>

                <div className="field">
                    <label>Số tiết học trong 1 ngày:</label>
                    <Dropdown
                        value={selectedLessonPerday}
                        options={lessonsPerDay}
                        onChange={(e) => setSelectedLessonPerday(e.target.value)}
                        appendTo="self"
                        required
                        className='w-full'
                    />
                </div>

                <div className="field">
                    <label>Loại phòng học:</label>
                    <Dropdown
                        value={selectedRoomType}
                        options={roomType}
                        onChange={(e) => setSelectedRoomType(e.target.value)}
                        appendTo="self"
                        className='w-full'
                    />
                </div>

                <div className="field">
                    <label>Số lượng sinh viên tối đa:</label>
                    <InputText
                        type='number'
                        value={maximumNumberOfStudent !== null ? maximumNumberOfStudent : ''}
                        onChange={(e) => setMaximumNumberOfStudent(e.target.value)}
                        min="0"
                        className='w-full'
                        required
                    />
                </div>
            </div>

        </Dialog>

    );
};

export default AddModuleClass;