import React, { useEffect, useState, useCallback } from 'react';
import { debounce } from 'lodash';
import { getUserInfoLocal } from '../../helper/token';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FloatLabel } from 'primereact/floatlabel';
import { Dropdown } from 'primereact/dropdown';

const TimeTable = () => {
    const [username, setUsername] = useState('');
    const [moduleClasses, setModuleClasses] = useState([]);
    const [selectedYear, setSelectedYear] = useState(null);
    const [yearOptions, setYearOptions] = useState([]);
    const [selectedSemester, setSelectedSemester] = useState(null);
    const [semesterOptions, setSemesterOptions] = useState([]);
    const [selectedWeek, setSelectedWeek] = useState(null);
    const [mdStartDate, setMdStartDate] = useState(null);

    const weekOptions = ['Tuần 1', 'Tuần 2', 'Tuần 3', 'Tuần 4', 'Tuần 5', 'Tuần 6', 'Tuần 7', 'Tuần 8', 'Tuần 9', 'Tuần 10', 'Tuần 11', 'Tuần 12', 'Tuần 13', 'Tuần 14', 'Tuần 15'];

    useEffect(() => {
        setUsername(getUserInfoLocal().username);
    }, []);

    useEffect(() => {
        if (selectedYear && selectedSemester) {
            setSelectedWeek('Tuần 1');
        }
    }, [selectedYear, selectedSemester]);

    const fetchModuleData = useCallback(
        debounce((selectedYear, selectedSemester, selectedWeek, setModuleClasses) => {
            fetch('http://localhost:5065/api/ModuleClass')
                .then(response => response.json())
                .then((data) => {
                    const weekIndex = weekOptions.indexOf(selectedWeek);
                    const filteredData = data.filter(item => {
                        const itemStartDate = new Date(item.startDate);
                        itemStartDate.setDate(itemStartDate.getDate() + (weekIndex * 7));

                        setMdStartDate(itemStartDate);

                        const startDate = new Date(selectedYear.startDate);
                        const endDate = new Date(selectedYear.endDate);
                        const itemEndDate = new Date(item.endDate);

                        return (
                            itemStartDate >= startDate &&
                            itemStartDate <= endDate &&
                            itemEndDate >= itemStartDate &&
                            item.semesterId === selectedSemester
                        );
                    });

                    const transformedData = filteredData.reduce((acc, item) => {
                        const { classRoomId, dayOfWeek, subjectName, subjectId, moduleClassId, lessonStart, lessonEnd, fullName } = item;

                        let room = acc.find(r => r.classRoomId === classRoomId);
                        if (!room) {
                            room = {
                                classRoomId,
                                Monday: '',
                                Tuesday: '',
                                Wednesday: '',
                                Thursday: '',
                                Friday: '',
                                Saturday: ''
                            };
                            acc.push(room);
                        }

                        const subjectDetails = (
                            <>
                                <div>{subjectName}</div>
                                <div>({subjectId})</div>
                                <div>Mã LHP: {moduleClassId}</div>
                                <div>Tiết: {lessonStart} - {lessonEnd}</div>
                                <div>GV: {fullName}</div>
                            </>
                        );

                        switch (dayOfWeek) {
                        case 'Thứ hai':
                            room.Monday = subjectDetails;
                            break;
                        case 'Thứ ba':
                            room.Tuesday = subjectDetails;
                            break;
                        case 'Thứ tư':
                            room.Wednesday = subjectDetails;
                            break;
                        case 'Thứ năm':
                            room.Thursday = subjectDetails;
                            break;
                        case 'Thứ sáu':
                            room.Friday = subjectDetails;
                            break;
                        case 'Thứ bảy':
                            room.Saturday = subjectDetails;
                            break;
                        default:
                            break;
                        }
                        return acc;
                    }, []);

                    setModuleClasses(transformedData);
                })
                .catch(err => console.error('Lỗi', err));
        }, 300), 
        []
    );

    useEffect(() => {
        if (username && selectedYear && selectedSemester && selectedWeek) {
            fetchModuleData(selectedYear, selectedSemester, selectedWeek, setModuleClasses);
        }
    }, [username, selectedYear, selectedSemester, selectedWeek, fetchModuleData]);

    useEffect(() => {
        fetch('http://localhost:5065/SemesterPeriod')
            .then(response => response.json())
            .then((data) => {
                const options1 = data.map(item => ({
                    label: item.academicYear,
                    value: item.academicYear,
                    startDate: item.startDate,
                    endDate: item.endDate
                }));
                const uniqueOptions1 = Array.from(new Set(options1.map(option => option.value)))
                    .map(uniqueValue => options1.find(option => option.value === uniqueValue));
                setYearOptions(uniqueOptions1);

                const options2 = data.map(item => ({
                    label: item.semesterName,
                    value: item.semesterId
                }));
                const uniqueOptions2 = Array.from(new Set(options2.map(option => option.value)))
                    .map(uniqueValue => options2.find(option => option.value === uniqueValue));
                setSemesterOptions(uniqueOptions2);
            })
            .catch(err => console.error('Lỗi', err));
    }, []);

    const handleYearChange = (e) => {
        const selectedOption = yearOptions.find(option => option.value === e.value);
        setSelectedYear(selectedOption ? {
            academicYear: selectedOption.value,
            startDate: selectedOption.startDate,
            endDate: selectedOption.endDate
        } : null);
    };

    return (
        <div>
            <h1>Thời khóa biểu</h1>
            <div>
                <FloatLabel>
                    <Dropdown
                        value={selectedYear ? selectedYear.academicYear : null}
                        options={yearOptions}
                        onChange={handleYearChange}
                    />
                    <label htmlFor="selectedYear">Năm học</label>
                </FloatLabel>
                <FloatLabel>
                    <Dropdown
                        value={selectedSemester}
                        options={semesterOptions}
                        onChange={(e) => setSelectedSemester(e.value)}
                    />
                    <label htmlFor="selectedYear">Học kì</label>
                </FloatLabel>
                <FloatLabel>
                    <Dropdown
                        value={selectedWeek}
                        options={weekOptions}
                        onChange={(e) => setSelectedWeek(e.value)}
                    />
                    <label htmlFor="selectedWeek">Tuần</label>
                </FloatLabel>
            </div>
            <div>
                <DataTable value={moduleClasses}>
                    <Column field="classRoomId" header="Phòng" />
                    <Column
                        header={`Thứ hai ${mdStartDate ? mdStartDate.toLocaleDateString() : ''}`}
                        body={(data) => (
                            <div>
                                {data.Monday}
                            </div>
                        )}
                    />
                    <Column
                        header={() => {
                            const newDate = mdStartDate ? new Date(mdStartDate) : null;
                            if (newDate) {
                                newDate.setDate(newDate.getDate() + 1); 
                            }
                            return `Thứ ba ${newDate ? newDate.toLocaleDateString() : ''}`;
                        }}
                        body={(data) => (
                            <div>
                                {data.Tuesday}
                            </div>
                        )}
                    />
                    <Column
                        header={() => {
                            const newDate = mdStartDate ? new Date(mdStartDate) : null;
                            if (newDate) {
                                newDate.setDate(newDate.getDate() + 2); 
                            }
                            return `Thứ tư ${newDate ? newDate.toLocaleDateString() : ''}`;
                        }}
                        body={(data) => (
                            <div>
                                {data.Wednesday}
                            </div>
                        )}
                    />
                    <Column
                        header={() => {
                            const newDate = mdStartDate ? new Date(mdStartDate) : null;
                            if (newDate) {
                                newDate.setDate(newDate.getDate() + 3); 
                            }
                            return `Thứ năm ${newDate ? newDate.toLocaleDateString() : ''}`;
                        }}
                        body={(data) => (
                            <div>
                                {data.Thursday}
                            </div>
                        )}
                    />
                    <Column
                        header={() => {
                            const newDate = mdStartDate ? new Date(mdStartDate) : null;
                            if (newDate) {
                                newDate.setDate(newDate.getDate() + 4); 
                            }
                            return `Thứ sáu ${newDate ? newDate.toLocaleDateString() : ''}`;
                        }}
                        body={(data) => (
                            <div>
                                {data.Friday}
                            </div>
                        )}
                    />
                    <Column
                        header={() => {
                            const newDate = mdStartDate ? new Date(mdStartDate) : null;
                            if (newDate) {
                                newDate.setDate(newDate.getDate() + 5); 
                            }
                            return `Thứ bảy ${newDate ? newDate.toLocaleDateString() : ''}`;
                        }}
                        body={(data) => (
                            <div>
                                {data.Saturday}
                            </div>
                        )}
                    />
                </DataTable>
            </div>
        </div>
    );
};

export default TimeTable;