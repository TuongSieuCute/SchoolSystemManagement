import React, { useEffect, useState } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { getUserInfoLocal } from '../../helper/token';

const Grades = () => {
    const [listModuleClass, setListModuleClass] = useState([]);
    const [selectedModuleClassId, setSelectedModuleClassId] = useState('');
    const [classDetails, setClassDetails] = useState([]);
    const [selectedClassDetail, setSelectedClassDetail] = useState(null);
    const [modal, setModal] = useState(false);
    const userInfo = getUserInfoLocal();
    const username = userInfo.username;

    useEffect(() => {
        fetch('http://localhost:5065/api/ModuleClass/subject')
            .then(response => response.json())
            .then(data => {
                const filteredData = data.filter(item => item.lecturerId === username);
                setListModuleClass(filteredData);
            })
            .catch(err => console.error('Lỗi', err));
    }, [username]);

    const handleModuleClassChange = (e) => {
        const selectedId = e.target.value;
        setSelectedModuleClassId(selectedId);

        // Gọi API để lấy thông tin chi tiết cho lớp học đã chọn
        if (selectedId) {
            fetch('http://localhost:5065/api/CourseRegistration')
                .then(response => response.json())
                .then(data => {
                    const filteredData = data.filter(item => item.moduleClassId === selectedId);
                    setClassDetails(filteredData);
                })
                .catch(err => console.error('Lỗi khi lấy thông tin chi tiết:', err));
        } else {
            setClassDetails([]);
        }
    };

    const toggleModal = () => {
        setModal(!modal);
    };

    const handleEdit = (rowData) => {
        setSelectedClassDetail(rowData);
        toggleModal();
    };

    const postData = async () => {
        // Sử dụng dữ liệu từ selectedClassDetail
        const data = {
            studentId: selectedClassDetail.studentId,
            moduleClassId: selectedClassDetail.moduleClassId,
            midtermGradePercentage: parseFloat(selectedClassDetail.midtermGradePercentage),
            finalExamGradePercentage: parseFloat(selectedClassDetail.finalExamGradePercentage),
            midtermGrade: parseFloat(selectedClassDetail.midtermGrade),
            finalExamGrade: parseFloat(selectedClassDetail.finalExamGrade),
        };

        try {
            const response = await fetch('http://localhost:5065/api/CourseRegistration', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                alert("Cập nhật thành công");
                const result = await response.json();
                console.log('Success:', result);
                // Cập nhật lại danh sách classDetails nếu cần sau khi cập nhật thành công
                setClassDetails((prevDetails) => prevDetails.map((item) =>
                    item.studentId === data.studentId ? { ...item, ...data } : item
                ));
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
                <label>Lớp học phần</label>
                <Dropdown
                    value={selectedModuleClassId}
                    onChange={handleModuleClassChange}
                    options={listModuleClass.map(mc => ({ value: mc.moduleClassId, label: mc.moduleClassId }))}
                />
            </div>
            <div>
                <DataTable value={classDetails} paginator rows={10} header="Thông tin lớp học">
                    <Column field="studentId" header="Mã số sinh viên" />
                    <Column field="fullNameStudent" header="Tên sinh viên" />
                    <Column field="midtermGradePercentage" header="% Giữa kì" />
                    <Column field="midtermGrade" header="Điểm giữa kì" />
                    <Column field="finalExamGradePercentage" header="% Cuối kì" />
                    <Column field="finalExamGrade" header="Điểm cuối kì" />
                    <Column field="averageGrade10" header="Điểm trung bình" />
                    <Column
                        body={(rowData) => (
                            <div>
                                <button onClick={() => handleEdit(rowData)}>Sửa</button>
                            </div>
                        )}
                    />
                </DataTable>
            </div>

            <div>
                {modal && (
                    <div className='modal'>
                        <div className='overlay'>
                            <div className='modal-content'>
                                <div>
                                    <p>Mã số sinh viên: {selectedClassDetail.studentId}</p>
                                    <p>Tên sinh viên: {selectedClassDetail.fullNameStudent}</p>
                                    <div>
                                        <label>% Giữa kì: </label>
                                        <input
                                            type="text"
                                            value={selectedClassDetail ? selectedClassDetail.midtermGradePercentage : ''}
                                            onChange={(e) => setSelectedClassDetail({ ...selectedClassDetail, midtermGradePercentage: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label>Điểm giữa kì: </label>
                                        <input
                                            type="text"
                                            value={selectedClassDetail ? selectedClassDetail.midtermGrade : ''}
                                            onChange={(e) => setSelectedClassDetail({ ...selectedClassDetail, midtermGrade: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label>% Cuối kì: </label>
                                        <input
                                            type="text"
                                            value={selectedClassDetail ? selectedClassDetail.finalExamGradePercentage : ''}
                                            onChange={(e) => setSelectedClassDetail({ ...selectedClassDetail, finalExamGradePercentage: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label>Điểm cuối kì: </label>
                                        <input
                                            type="text"
                                            value={selectedClassDetail ? selectedClassDetail.finalExamGrade : ''}
                                            onChange={(e) => setSelectedClassDetail({ ...selectedClassDetail, finalExamGrade: e.target.value })}
                                        />
                                    </div>
                                    <button onClick={postData}>Cập nhật</button>
                                    <button onClick={toggleModal}>Thoát</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

        </div>
    );
};

export default Grades;

