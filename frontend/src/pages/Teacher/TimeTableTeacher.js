import React, { useEffect, useState } from 'react';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dropdown } from 'primereact/dropdown';
import { FloatLabel } from 'primereact/floatlabel';
import { useMsal } from '@azure/msal-react';
import { getUserName } from '../../common/sevices/authService';
import { addDays } from 'date-fns';

const TimeTableTeacher = () => {
    const [teacherId, setTeachertId] = useState('');
    const [time, setTime] = useState([]);
    const [optionsYear, setOptionsYear] = useState([]);
    const [selectedYear, setSelectedYear] = useState('');
    const [optionsSemester, setOptionsSemester] = useState([]);
    const [selectedSemester, setSelectedSemester] = useState('');
    const [selectedWeek, setSelectedWeek] = useState('');
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
        setTeachertId(getUserName());
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
            const startDate = new Date(filteredTime[0].startDate);
            const daysElapsed = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));
            const currentWeek = Math.ceil(daysElapsed / 7);

            const weekArray = Array.from({ length: 15 }, (_, i) => `Tuần ${i + 1}`);
            const selectedWeek = weekArray[Math.min(currentWeek - 1, weekArray.length - 1)];

            setSelectedYear(filteredTime[0].academicYear);
            setSelectedSemester(filteredTime[0].semesterName);
            setSelectedWeek(selectedWeek);
        }
        else {
            const upcomingTime = time.filter(item => item.startDate > formattedToday);

            if (upcomingTime.length > 0) {
                setSelectedYear(upcomingTime[0].academicYear);
                setSelectedSemester(upcomingTime[0].semesterName);
                setSelectedWeek("Tuần 1");
            }
        }
    }, [time])

    useEffect(() => {
        fetch('https://localhost:7074/api/ModuleClass')
            .then(response => response.json())
            .then((data) => {
                const filteredData = data.filter(item => item.lecturerId === teacherId);
                setModuleClass(filteredData);
            })
            .catch(err => console.error('Lỗi', err));
    }, [teacherId])

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
                    <Column
                        header="Tiết học"
                        body={(rowData) => (
                            <div>
                                {`${rowData.lessonStart} - ${rowData.lessonEnd}`}
                            </div>
                        )}
                    />
                    <Column field="moduleClassId" header="Lớp học phần" />
                    <Column field="subjectName" header="Tên học phần" style={{ width: '40%' }} />
                    <Column field="classRoomId" header="Phòng học" />
                </DataTable>
            </div>
        </div>
    );
};

export default TimeTableTeacher;