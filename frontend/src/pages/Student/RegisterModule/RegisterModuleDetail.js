import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { format } from 'date-fns';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { RadioButton } from 'primereact/radiobutton';
import { getUserInfoLocal } from '../../../helper/token';

const RegisterModuleDetail = () => {
    const [listModuleClass, setListModuleClass] = useState([]);
    const [selectedModuleClass, setSelectedModuleClass] = useState(null);
    const [registeredModuleClasses, setRegisteredModuleClasses] = useState([]);
    const location = useLocation();
    const { subject } = location.state || {};
    const userInfo = getUserInfoLocal();
    const username = userInfo.username;

    useEffect(() => {
        fetch(`http://localhost:5065/api/ModuleClass/subject?subjectId=${subject.subjectId}`)
            .then(response => response.json())
            .then(data => setListModuleClass(data))
            .catch(err => console.error('Lỗi', err));
    }, [subject.subjectId]);

    useEffect(() => {
        fetch(`http://localhost:5065/api/CourseRegistration?studentId=${username}`)
            .then(response => response.json())
            .then(data => setRegisteredModuleClasses(data.map(item => item.moduleClassId)))
            .catch(err => console.error('Lỗi', err));
    }, [username]);

    const handleRadioChange = (moduleClassId) => {
        setSelectedModuleClass(moduleClassId);
    };

    const registerModule = async (moduleClassId) => {
        const data = {
            moduleClassId: moduleClassId,
            studentId: username,
        };

        try {
            const response = await fetch('http://localhost:5065/api/CourseRegistration', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                alert('Thành công');
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
            <DataTable value={listModuleClass} tableStyle={{ minWidth: '50rem' }} header="Danh sách lớp học phần">
                <Column
                    header="Chọn"
                    body={(rowData) => (
                        <RadioButton
                            value={rowData.moduleClassId}
                            onChange={() => handleRadioChange(rowData.moduleClassId)}
                            checked={selectedModuleClass === rowData.moduleClassId || registeredModuleClasses.includes(rowData.moduleClassId)}
                            disabled={registeredModuleClasses.includes(rowData.moduleClassId)}
                        />
                    )}
                />
                <Column field="moduleClassId" header="Mã lớp học phần" />
                <Column
                    header="Giới hạn"
                    body={(rowData) => (
                        <div>15 - {rowData.maximumNumberOfStudents}</div>
                    )}
                />
                <Column header="SLĐK" />
                <Column field="fullName" header="Tên giảng viên" />
                <Column
                    header="Lịch học"
                    body={(rowData) => (
                        <div>
                            <div>{rowData.dayOfWeek}, Tiết ({rowData.lessonStart} - {rowData.lessonEnd}), {rowData.classRoomId},</div>
                            <div>({format(new Date(rowData.startDate), 'dd/MM/yyyy')} {'->'} {format(new Date(rowData.endDate), 'dd/MM/yyyy')})</div>
                        </div>
                    )}
                />
            </DataTable>
            <button onClick={() => registerModule(selectedModuleClass)}>Đăng kí</button>
        </div>
    );
};

export default RegisterModuleDetail;