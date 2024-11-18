import { format } from 'date-fns';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { getUsername } from '../../../common/sevices/authService';
import { getSubjects } from '../../../common/sevices/moduleClassService';

const TeachingRegistration = () => {
    const [listSubject, setListSubject] = useState([]);
    const [listModuleClass, setListModuleClass] = useState([]);
    const username = useMemo(() => getUsername(), []);

    useEffect(() => {
        const fetchingData = async () => {
            const response = await getSubjects();
            if (response.ok) {
                const subjects = response.json();
                setListSubject(subjects);
            }
            else {
                alert('failed to fetch');
            }
        };
        fetchingData();
    }, []);

    useEffect(() => {
        getSubjects()
            .then(response => response.json())
            .then(data => {
                const filteredData = data.filter(item => item.lecturerId === username);
                setListModuleClass(filteredData);
            })
            .catch(err => console.error('Lỗi', err));
    }, [username]);

    const subjectCount = listSubject.reduce((acc, item) => {
        if (acc[item.subjectId]) {
            acc[item.subjectId].count += 1;
        } else {
            acc[item.subjectId] = { ...item, count: 1 };
        }
        return acc;
    }, {});

    const uniqueSubjects = Object.values(subjectCount);

    const mandatorySubjects = uniqueSubjects.filter(subject => subject.subjectType === 'Bắt buộc');
    const electiveSubjects = uniqueSubjects.filter(subject => subject.subjectType === 'Tự chọn');

    const deleteRegisterTeaching = async (moduleClassId) => {
        const data = {
            moduleClassId: moduleClassId,
            lecturerId: null,
        };

        try {
            const response = await fetch('http://localhost:5065/api/ModuleClass/delete-LectureId', {
                method: 'PUT',
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
            <div>
                <h3>Bắt buộc</h3>
                <DataTable value={mandatorySubjects} tableStyle={{ minWidth: '50rem' }} header="Danh sách lớp học phần">
                    <Column field="subjectId" header="Mã học phần" />
                    <Column field="subjectName" header="Tên học phần" />
                    <Column field="numberOfCredit" header="Số tín chỉ" />
                    <Column field="count" header="Số lượng LHP" />
                    <Column
                        body={(rowData) => (
                            <div>
                                <Link
                                    to="/teacher/teaching-registration-detail"
                                    state={{ subject: rowData }}
                                >
                                    Đăng kí
                                </Link>
                            </div>
                        )}
                    />
                </DataTable>

                <h3>Tự chọn</h3>
                <DataTable value={electiveSubjects} tableStyle={{ minWidth: '50rem' }} header="Danh sách lớp học phần">
                    <Column field="subjectId" header="Mã học phần" />
                    <Column field="subjectName" header="Tên học phần" />
                    <Column field="numberOfCredit" header="Số tín chỉ" />
                    <Column field="count" header="Số lượng LHP" />
                    <Column
                        body={() => (
                            <div>
                                <a href="/teacher/teaching-registration-detail" >Đăng kí</a>
                            </div>
                        )}
                    />
                </DataTable>
            </div>

            <div>
                <h3>Kết quả đăng kí:</h3>
                <DataTable value={listModuleClass} tableStyle={{ minWidth: '50rem' }} header="Danh sách lớp học phần">
                    <Column field="moduleClassId" header="Mã lớp học phần" />
                    <Column field="subjectName" header="Tên học phần" />
                    <Column
                        header="Lịch học"
                        body={(rowData) => (
                            <div>
                                <div>{rowData.dayOfWeek}, Tiết ({rowData.lessonStart} - {rowData.lessonEnd}), {rowData.classRoomId},</div>
                                <div>({format(new Date(rowData.startDate), 'dd/MM/yyyy')} {'->'} {format(new Date(rowData.endDate), 'dd/MM/yyyy')})</div>
                            </div>
                        )}
                    />
                    <Column
                        body={(rowData) => (
                            <button onClick={() => deleteRegisterTeaching(rowData.moduleClassId)}>Hủy</button>
                        )}
                        header="Hủy đăng ký"
                    />
                </DataTable>
            </div>
        </div>
    );
};
export default TeachingRegistration;