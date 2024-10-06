import React, { useEffect, useState } from 'react';

const ModuleClass = () => {
    const [listModuleClass, setListModuleClass] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5065/api/ModuleClass')
                .then(response => response.json())
                .then(data => setListModuleClass(data))
                .catch(err => console.error('Lỗi', err));
    }, []);

    return (
        <div className='admin-container'>
            <div className='box'>
                <button>Thêm Lớp học phần</button>
                <div className='table'>
                    <h1>Danh sách lớp học phần:</h1>
                    <table>
                        <thead>
                            <th>Mã lớp học phần</th>
                            <th>Mã học phần</th>
                            <th>Thứ trong tuần</th>
                            <th>Tiết bắt đầu</th>
                            <th>Tiết kết thúc</th>
                            <th>Số tuần học</th>
                            <th>Ngày bắt đầu</th>
                            <th>Ngày kết thúc</th>
                            <th>Mã phòng học</th>
                        </thead>
                        <tbody>
                            {listModuleClass.map((item, index) => {
                                <tr key={index}>
                                    <td>{item.moduleClassId}</td>
                                    <td>{item.moduleClassId}</td>
                                    <td>{item.moduleClassId}</td>
                                    <td>{item.moduleClassId}</td>
                                    <td>{item.moduleClassId}</td>
                                    <td>{item.moduleClassId}</td>
                                    <td>{item.moduleClassId}</td>
                                    <td>{item.moduleClassId}</td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ModuleClass;