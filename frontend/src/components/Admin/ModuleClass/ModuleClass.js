import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import AddModuleClass from './AddModuleClass';

const ModuleClass = () => {
    const [modal, setModal] = useState(false);
    const [modalInsert, setModalInsert] = useState(false);
    const [listModuleClass, setListModuleClass] = useState([]);
    const [selectedClass, setSelectedClass] = useState(null);

    const dayOfWeek = ['Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'];
    const lesson = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];

    const toggleModalInsert = () => {
        setModalInsert(!modalInsert);
    }

    const toggleModal = () => {
        setModal(!modal)
    }

    const handleEditClick = (rowData) => {
        setSelectedClass(rowData);
        toggleModal();
    };

    useEffect(() => {
        fetch('http://localhost:5065/api/ModuleClass')
            .then(response => response.json())
            .then(data => setListModuleClass(data))
            .catch(err => console.error('Lỗi', err));
    }, []);

    return (
        <>
            <div className='admin-container'>
                <div className='box'>
                    <button onClick={toggleModalInsert}>Thêm Lớp học phần</button>
                    <div className='table'>
                        <DataTable value={listModuleClass} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }} header="Danh sách lớp học phần">
                            <Column field="moduleClassId" header="Mã lớp học phần" />
                            <Column field="subjectId" header="Mã học phần" />
                            <Column field="subjectName" header="Tên học phần" />
                            <Column field="fullName" header="Tên giảng viên" />
                            <Column field="dayOfWeek" header="Thứ trong tuần" />
                            <Column field="lessonStart" header="Tiết bắt đầu" />
                            <Column field="lessonEnd" header="Tiết kết thúc" />
                            <Column field="numberOfWeek" header="Số tuần học" />
                            <Column field="startDate" header="Ngày bắt đầu" />
                            <Column field="endDate" header="Ngày kết thúc" />
                            <Column field="classRoomId" header="Mã phòng học" />
                            <Column field="maximumNumberOfStudents" header="Số lượng sinh viên tối đa" />
                            <Column
                                header="Chỉnh sửa/Xóa"
                                body={(rowData) => (
                                    <div>
                                        <button onClick={() => handleEditClick(rowData)}>Chỉnh sửa</button>
                                        <button>Xóa</button>
                                    </div>
                                )}
                            />
                        </DataTable>
                    </div>
                </div>
            </div>
            
            {/* Modal Thêm */}
            {modalInsert && (
                <div className='modal'>
                    <div className='overlay'>
                        <div className='modal-content'>
                            <AddModuleClass toggleModalInsert={toggleModalInsert}></AddModuleClass>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal Chỉnh sửa */}
            {modal && (
                <div className='modal'>
                    <div className='overlay'>
                        <div className='modal-content'>
                            <h1>Chỉnh sửa lớp học phần</h1>
                            {selectedClass && (
                                <div className='form-edit'>
                                    <label>Mã lớp học phần:</label>
                                    <InputText value={selectedClass.moduleClassId} onChange={(e) => setSelectedClass(e.target.value)} disabled />

                                    <label>Mã học phần:</label>
                                    <InputText value={selectedClass.subjectId} onChange={(e) => setSelectedClass(e.target.value)} disabled />

                                    <label>Tên học phần:</label>
                                    <InputText value={selectedClass.subjectName} onChange={(e) => setSelectedClass(e.target.value)} disabled />

                                    <label>Tên giảng viên:</label>
                                    <InputText value={selectedClass.fullName} onChange={(e) => setSelectedClass(e.target.value)} disabled />

                                    <label>Thứ trong tuần:</label>
                                    <Dropdown value={selectedClass.dayOfWeek} onChange={(e) => setSelectedClass({ ...selectedClass, dayOfWeek: e.value })} options={dayOfWeek} appendTo="self" />

                                    <label>Tiết bắt đầu:</label>
                                    <Dropdown value={selectedClass.lessonStart} onChange={(e) => setSelectedClass({ ...selectedClass, lessonStart: e.value })} options={lesson} appendTo="self" />

                                    <label>Tiết kết thúc:</label>
                                    <Dropdown value={selectedClass.lessonEnd} onChange={(e) => setSelectedClass({ ...selectedClass, lessonEnd: e.value })} options={lesson} appendTo="self" />

                                    <label>Số tuần học:</label>
                                    <InputText value={selectedClass.numberOfWeek} onChange={(e) => setSelectedClass(e.target.value)} />

                                    <label>Ngày bắt đầu:</label>
                                    <Calendar value={selectedClass.startDate} onChange={(e) => setSelectedClass(e.target.value)} appendTo="self" />

                                    <label>Ngày kết thúc:</label>
                                    <Calendar value={selectedClass.startEnd} onChange={(e) => setSelectedClass(e.target.value)} disabled />

                                    <label>Mã phòng học:</label>
                                    <InputText value={selectedClass.classRoomId} onChange={(e) => setSelectedClass(e.target.value)} />

                                    <label>Số lượng sinh viên tối đa:</label>
                                    <InputText value={selectedClass.maximumNumberOfStudents} onChange={(e) => setSelectedClass(e.target.value)} />
                                </div>
                            )}
                            <button>Cập nhật</button>
                            <button onClick={toggleModal}>Thoát</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ModuleClass;