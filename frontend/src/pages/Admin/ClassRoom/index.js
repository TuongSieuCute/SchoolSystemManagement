import React, { useEffect, useState } from 'react';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Calendar } from 'primereact/calendar';
import './styles.css';
import { Button } from 'primereact/button';
import { formatDate } from '../../../helper/function';

const classRoom = () => {
    const [classRoom, setClassRoom] = useState([]);
    const [moduleClass, setModuleClass] = useState([]);
    const [day, setDay] = useState('');
    const [checkSearch, setCheckSearch] = useState(false);
    const [classRoomId, setClassRoomId] = useState([]);
    useEffect(() => {
        fetch('https://localhost:7074/api/ClassRoom')
            .then(response => response.json())
            .then((data) => {
                setClassRoom(data);
            })
            .catch(err => console.error('Lỗi', err));
    }, [])
    useEffect(() => {
        if (classRoomId) {
            setCheckSearch(true);
        }
    }, [classRoomId]);

    const toggleSearch = (classRoomId) => {
        setClassRoomId(classRoomId);
        const fetchDataMC = () => {
            fetch('https://localhost:7074/api/ModuleClass')
                .then(response => response.json())
                .then((data) => {
                    let filteredData = [];
                    if (day === '') filteredData = data.filter(item => item.classRoomId === classRoomId); 
                    else {
                        filteredData = data.filter(item => {
                            const startDate = new Date(item.startDate);
                            const endDate = new Date(item.endDate); 
                            return (
                                item.classRoomId === classRoomId &&
                                startDate.getTime() <= day.getTime() &&
                                endDate.getTime() >= day.getTime()
                            );
                        });
                    }
                    console.log(filteredData);
                    setModuleClass(filteredData);
                })
                .catch(err => console.error('Lỗi', err));
        }
        fetchDataMC();
    }
    return (
        <div>
            <h3 className='title'>PHÒNG HỌC</h3>
            <div className='datatable-container'>
                <DataTable value={classRoom} stripedRows paginator rows={5}>
                    <Column field="classRoomId" header="Mã phòng học" filter />
                    <Column field="sector" header="Khu" />
                    <Column field="floor" header="Tầng" />
                    <Column field="roomType" header="Loại phòng học" filter />
                    <Column field="capacity" header="Sức chứa" />
                    <Column header="Hành động" body={(rowData) => (
                        <Button icon='pi pi-search' onClick={() => toggleSearch(rowData.classRoomId)} />
                    )} />
                </DataTable>
            </div>
            <div className='dropdown-container'>
                <Calendar value={day} onChange={(e) => setDay(e.value)} dateFormat="dd/mm/yy" showIcon />
            </div>
            {checkSearch && (
                <div className='datatable-container'>
                    <DataTable value={moduleClass} stripedRows>
                        <Column field="moduleClassId" header="Mã lớp học phần" />
                        <Column
                            header="Tiết học"
                            body={(rowData) => (
                                <div>
                                    {`${rowData.lessonStart} - ${rowData.lessonEnd}`}
                                </div>
                            )}
                        />
                        <Column
                            header="Thời gian"
                            body={(rowData) => (
                                <div>
                                    {`${formatDate(rowData.startDate)} - ${formatDate(rowData.endDate)}`}
                                </div>
                            )}
                        />
                        <Column field="classRoomId" header="Mã phòng học" />
                    </DataTable>
                </div>
            )}
        </div>
    );
};

export default classRoom;