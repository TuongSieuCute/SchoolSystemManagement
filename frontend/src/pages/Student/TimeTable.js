import React, { useEffect, useState } from 'react';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dropdown } from 'primereact/dropdown';
import { FloatLabel } from 'primereact/floatlabel';
import { useMsal } from '@azure/msal-react';
import { getStudentId } from '../../common/sevices/authService';
import { dropdownYearSemester, defaultYearSemester, checkTime } from '../../helper/function';
import { addDays } from 'date-fns';

const TimeTable = () => {
    const [studentId, setStudentId] = useState('');
    const [time, setTime] = useState([]);
    const [optionsYear, setOptionsYear] = useState([]);
    const [selectedYear, setSelectedYear] = useState('');
    const [optionsSemester, setOptionsSemester] = useState([]);
    const [selectedSemester, setSelectedSemester] = useState('');
    const [selectedWeek, setSelectedWeek] = useState('');
    const [moduleClassId, setModuleClassId] = useState([]);
    const [moduleClass, setModuleClass] = useState([]);
    const [showData, setShowData] = useState([]);

    const { accounts } = useMsal();
    const optionsWeek = Array.from({ length: 15 }, (_, i) => `Tuần ${i + 1}`);

    const calculateRowSpan = (data) => {
        return data.map((item, index) => {
            if (index === 0 || item.dayOfWeek !== data[index - 1].dayOfWeek) {
                // Đếm số hàng liên tiếp có cùng giá trị dayOfWeek
                let rowSpan = 1;
                for (let i = index + 1; i < data.length && data[i].dayOfWeek === item.dayOfWeek; i++) {
                    rowSpan++;
                }
                return { ...item, rowSpan };
            } else {
                return { ...item, rowSpan: 0 };
            }
        });
    };

    const processedData = calculateRowSpan(showData);

    useEffect(() => {
        if (!accounts?.length) {
            return;
        }
        setStudentId(getStudentId());
    }, [accounts]);

    useEffect(() => {
        dropdownYearSemester(setOptionsYear, setOptionsSemester);
        defaultYearSemester(setSelectedYear, setSelectedSemester);
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            const today = new Date();
            const filteredTime = await checkTime(selectedYear, selectedSemester);
            if (filteredTime.length > 0) {
                const startDate = new Date(filteredTime[0].startDate);
                if (startDate < today) {
                    const daysElapsed = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));
                    const currentWeek = Math.ceil(daysElapsed / 7);
                    const week = optionsWeek[Math.min(currentWeek - 1, optionsWeek.length - 1)];
                    setSelectedWeek(week);
                } else {
                    setSelectedWeek('Tuần 1');
                }
            }
        };
        fetchData();
    }, [selectedYear, selectedSemester]);

    useEffect(() => {
        if (studentId) {
            fetch('https://localhost:7074/api/CourseRegistration')
                .then(response => response.json())
                .then((data) => {
                    const filteredData = data.filter(item => item.studentId === studentId);
                    const id = filteredData.map(item => item.moduleClassId);
                    setModuleClassId(id);
                })
                .catch(err => console.error('Lỗi', err));
        }
    }, [studentId])

    useEffect(() => {
        if (moduleClassId) {
            fetch('https://localhost:7074/api/ModuleClass')
                .then(response => response.json())
                .then((data) => {
                    const filteredData = data.filter(item => moduleClassId.includes(item.moduleClassId));
                    setModuleClass(filteredData);
                })
                .catch(err => console.error('Lỗi', err));
        }
    }, [moduleClassId])

    useEffect(() => {
        const fetchData = async () => {
            const filteredTime = await checkTime(selectedYear, selectedSemester);
            if (filteredTime.length > 0) {
                const weekIndex = optionsWeek.indexOf(selectedWeek);
                const startDate = new Date(filteredTime[0].startDate);
                const calculatedStartDate = addDays(startDate, 7 * weekIndex);
                const formattedStartDate = calculatedStartDate.toISOString().split('T')[0];

                const filteredData = moduleClass.filter(item => item.endDate >= formattedStartDate);
                setShowData(filteredData);
            }
        };
        fetchData();
    }, [selectedYear, selectedSemester, selectedWeek, time, moduleClass])

    return (
        <div>
            <h3 className='title'>THỜI KHÓA BIỂU</h3>
            <div className='dropdown-container'>
                <FloatLabel>
                    <Dropdown
                        value={selectedYear}
                        options={optionsYear}
                        onChange={(e) => setSelectedYear(e.target.value)}
                        className='cus-dropdown'
                        panelClassName='cus-panel-dropdown'
                    />
                    <label htmlFor="selectedYear" className='cus-label-dropdown'>Năm học</label>
                </FloatLabel>
                <FloatLabel>
                    <Dropdown
                        value={selectedSemester}
                        options={optionsSemester}
                        onChange={(e) => setSelectedSemester(e.target.value)}
                        className='cus-dropdown'
                        panelClassName='cus-panel-dropdown'
                    />
                    <label htmlFor="selectedYear" className='cus-label-dropdown'>Học kì</label>
                </FloatLabel>
                <FloatLabel>
                    <Dropdown
                        value={selectedWeek}
                        options={optionsWeek}
                        onChange={(e) => setSelectedWeek(e.value)}
                        className='cus-dropdown'
                        panelClassName='cus-panel-dropdown'
                    />
                    <label htmlFor="selectedWeek" className='cus-label-dropdown'>Tuần</label>
                </FloatLabel>
            </div>
            <div className='datatable-container'>
                <DataTable value={processedData}>
                    <Column
                        header="Thứ"
                        body={(rowData) => {
                            if (rowData.rowSpan > 0) {
                                return (
                                    <div rowSpan={rowData.rowSpan}>
                                        {`${rowData.dayOfWeek}`}
                                    </div>
                                );
                            } else {
                                return null;
                            }
                        }}
                    />
                    <Column
                        header="Tiết học"
                        body={(rowData) => (
                            <div>
                                {`${rowData.lessonStart} - ${rowData.lessonEnd}`}
                            </div>
                        )}
                    />
                    <Column field="moduleClassId" header="Lớp học phần" />
                    <Column field="subjectName" header="Tên học phần" style={{ width: '30%' }} />
                    <Column field="fullName" header="Tên giảng viên" />
                    <Column field="classRoomId" header="Phòng học" />
                </DataTable>
            </div>
        </div>
    );
};

export default TimeTable;