import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dropdown } from 'primereact/dropdown';
import { FloatLabel } from 'primereact/floatlabel';
import React, { useEffect, useState } from 'react';
import { useMsal } from '@azure/msal-react';
import { getUserId } from '../../common/sevices/authService';
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
    const optionsWeek = ['Tuần 1', 'Tuần 2', 'Tuần 3', 'Tuần 4', 'Tuần 5', 'Tuần 6', 'Tuần 7', 'Tuần 8', 'Tuần 9', 'Tuần 10', 'Tuần 11', 'Tuần 12', 'Tuần 13', 'Tuần 14', 'Tuần 15'];

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
        setStudentId(getUserId());
    }, [accounts]);

    useEffect(() => {
        fetch('https://localhost:7074/Semester')
            .then(response => response.json())
            .then((data) => {
                setTime(data);
                // dropdown Year
                const options = data.map(item => ({
                    label: item.academicYear,
                    value: item.academicYear
                }));
                const uniqueOptions = Array.from(new Set(options.map(option => option.value)))
                    .map(uniqueValue => options.find(option => option.value === uniqueValue));
                setOptionsYear(uniqueOptions);
                // dropdown Semester
                const options1 = data.map(item => ({
                    label: item.semesterName,
                    value: item.semesterName
                }));
                const uniqueOptions1 = Array.from(new Set(options1.map(option => option.value)))
                    .map(uniqueValue => options1.find(option => option.value === uniqueValue));
                setOptionsSemester(uniqueOptions1);
            })
            .catch(err => console.error('Lỗi', err));
    }, [])

    useEffect(() => {
        const today = new Date();
        const formattedToday = today.toISOString().split('T')[0];
        const filteredTime = time.filter(item => item.startDate <= formattedToday && item.endDate >= formattedToday);
        if (filteredTime.length > 0) {
            setSelectedYear(filteredTime[0].academicYear);
            setSelectedSemester(filteredTime[0].semesterName);
            setSelectedWeek("Tuần 1");
        }
    }, [time])

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
        const filteredTime = time.filter(item => item.academicYear === selectedYear && item.semesterName === selectedSemester);
        if (filteredTime.length > 0) {
            // Vị trí của Tuần
            const weekIndex = optionsWeek.indexOf(selectedWeek);
            const startDate = new Date(filteredTime[0].startDate);
            const calculatedStartDate = addDays(startDate, 7 * weekIndex);
            const formattedStartDate = calculatedStartDate.toISOString().split('T')[0];

            const filteredData = moduleClass.filter(item => item.endDate >= formattedStartDate);
            setShowData(filteredData);
        }
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
                    <Column field="moduleClassId" header="Lớp học phần"></Column>
                    <Column field="subjectName" header="Tên học phần"></Column>
                    <Column field="fullName" header="Tên giảng viên"></Column>
                    <Column field="classRoomId" header="Phòng học"></Column>
                </DataTable>
            </div>
        </div>
    );
};

export default TimeTable;