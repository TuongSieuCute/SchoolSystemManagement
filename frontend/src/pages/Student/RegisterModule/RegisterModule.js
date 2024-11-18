import { format } from 'date-fns';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getUserInfoLocal } from '../../../helper/token';

const RegisterModule = () => {
    const [listSubject, setListSubject] = useState([]);
    const [listModuleClass, setListModuleClass] = useState([]);
    const userInfo = getUserInfoLocal();
    const username = userInfo.username;

    useEffect(() => {
        fetch('http://localhost:5065/api/ModuleClass/subject')
            .then(response => response.json())
            .then(data => setListSubject(data))
            .catch(err => console.error('Lỗi', err));
    }, []);

    useEffect(() => {
        fetch(`http://localhost:5065/api/CourseRegistration?studentId=${username}`)
            .then(response => response.json())
            .then(data => setListModuleClass(data))
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

    const deleteRegister = async (moduleClassId) => {
        try {
            const response = await fetch(`http://localhost:5065/api/CourseRegistration?studentId=${username}&moduleClassId=${moduleClassId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                alert('Đã xóa thành công!');
                console.log('Success:', await response.text()); 
            } else {
                const text = await response.text();
                console.error('Server Error Response:', text);
                alert('Có lỗi xảy ra khi xóa!');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Có lỗi xảy ra trong quá trình xử lý!');
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
                                    to="/student/register-module-detail"
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
                                <a href="/student/register-module-detail" >Đăng kí</a>
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
                    <Column field="numberOfCredit" header="STC" />
                    <Column field="fullName" header="Tên GV" />
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
                            <button onClick={() => deleteRegister(rowData.moduleClassId)}>Hủy</button>
                        )}
                        header="Hủy đăng ký"
                    />
                </DataTable>
            </div>
        </div>
    );
};

export default RegisterModule;