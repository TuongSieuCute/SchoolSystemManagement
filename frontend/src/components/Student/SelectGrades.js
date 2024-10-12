import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { getUserInfoLocal } from '../../helper/token';

const SelectGrades = () => {
    const [listGrades, setListGrades] = useState([]);
    const userInfo = getUserInfoLocal();
    const username = userInfo.username;

    useEffect(() => {
        fetch(`http://localhost:5065/api/CourseRegistration?studentId=${username}`)
            .then(response => response.json())
            .then(data => setListGrades(data))
            .catch(err => console.error('Lỗi', err));
    }, [username]);

    return (
        <div>
            <DataTable value={listGrades} paginator rows={10} header="Điểm">
                <Column field="subjectId" header="Mã học phần" />
                <Column field="subjectName" header="Tên học phần" />
                <Column field="numberOfCredit" header="Số tín chỉ" />
                <Column field="averageGrade10" header="Điểm hệ 10" />
                <Column field="averageGrade4" header="Điểm hệ 4" />
                <Column field="literacy" header="Điểm chữ" />
                <Column field="isPass" header="Kết quả" />
            </DataTable>
        </div>
    );
};

export default SelectGrades;