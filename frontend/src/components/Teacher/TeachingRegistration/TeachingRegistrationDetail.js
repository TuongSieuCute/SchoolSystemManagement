import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import { format } from 'date-fns';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Checkbox } from "primereact/checkbox";
import { getUserInfoLocal } from '../../../helper/token';

const TeachingRegistrationDetail = () => {
    const [listModuleClass, setListModuleClass] = useState([]);
    const location = useLocation();
    const { subject } = location.state || {};
    const userInfo = getUserInfoLocal();
    const username = userInfo.username;

    useEffect(() => {
        fetch(`http://localhost:5065/api/ModuleClass/subject?subjectId=${subject.subjectId}`)
            .then(response => response.json())
            .then(data => {
                const updatedData = data.map(item => ({
                    ...item,
                    isChecked: item.lecturerId !== null
                }));
                setListModuleClass(updatedData);
            })
            .catch(err => console.error('Lỗi', err));
    }, [subject.subjectId]);

    const handleCheckboxChange = (rowData) => {
        if (rowData.lecturerId === null) {
            setListModuleClass(prevList =>
                prevList.map(item =>
                    item.moduleClassId === rowData.moduleClassId
                        ? { ...item, isChecked: !item.isChecked }
                        : item
                )
            );
        }
    };

    const registerTeaching = async (moduleClassId) => {
        const data = {
            moduleClassId: moduleClassId,
            lecturerId: username,
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

                setListModuleClass(prev => prev.map(item =>
                    item.moduleClassId === moduleClassId
                        ? { ...item, lecturerId: username, isChecked: true }
                        : item
                ));
            } else {
                const text = await response.text();
                console.error('Server Error Response:', text);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleRegisterClick = () => {
        const selectedModuleClasses = listModuleClass.filter(
            item => item.isChecked && item.lecturerId === null
        );

        selectedModuleClasses.forEach(item => {
            registerTeaching(item.moduleClassId);
        });
    };

    return (
        <div>
            <DataTable value={listModuleClass} tableStyle={{ minWidth: '50rem' }} header="Danh sách lớp học phần">
                <Column
                    header="Chọn"
                    body={(rowData) => (
                        <Checkbox
                            onChange={() => handleCheckboxChange(rowData)}
                            checked={rowData.isChecked}
                            disabled={rowData.lecturerId !== null}
                        />
                    )}
                />
                <Column field="moduleClassId" header="Mã lớp học phần" />
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
            <button onClick={handleRegisterClick}>Đăng kí</button>
        </div>
    );
};

export default TeachingRegistrationDetail;