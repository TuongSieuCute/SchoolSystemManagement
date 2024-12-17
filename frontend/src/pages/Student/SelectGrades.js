import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FloatLabel } from 'primereact/floatlabel';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { useMsal } from '@azure/msal-react';
import { getStudentId } from '../../common/sevices/authService';
import { FaCheck } from 'react-icons/fa';
import { MdCancel } from "react-icons/md";

// Hàm tính GPA hệ 4 từ GPA hệ 10
const calculateGPA = (cumulativeGPA10) => {
    let GPA4 = 0;
    if (cumulativeGPA10 >= 8.5 && cumulativeGPA10 <= 10) GPA4 = 4.0;
    else if (cumulativeGPA10 >= 8.0 && cumulativeGPA10 < 8.5) GPA4 = 3.5;
    else if (cumulativeGPA10 >= 7.0 && cumulativeGPA10 < 8.0) GPA4 = 3.0;
    else if (cumulativeGPA10 >= 6.5 && cumulativeGPA10 < 7.0) GPA4 = 2.5;
    else if (cumulativeGPA10 >= 5.5 && cumulativeGPA10 < 6.5) GPA4 = 2.0;
    else if (cumulativeGPA10 >= 5.0 && cumulativeGPA10 < 5.5) GPA4 = 1.5;
    else if (cumulativeGPA10 >= 4.0 && cumulativeGPA10 < 5.0) GPA4 = 1.0;
    return GPA4.toFixed(1);
};

// Thành phần hiển thị bảng điểm cho từng năm
const YearDataTable = ({ year, grades, isDataVisible, toggleDataVisibility }) => {
    const filteredGrades = grades.filter(item => item.startDate >= year.startDate && item.endDate <= year.endDate);
    const hasDataForYear = filteredGrades.length > 0;
    const totalCredits = filteredGrades.reduce((sum, item) => sum + item.numberOfCredit, 0);
    const totalCreditsPass = filteredGrades.filter(item => item.isPass).reduce((sum, item) => sum + item.numberOfCredit, 0);
    const totalWeightedGrades = filteredGrades.filter(item => item.isCreditGpa).reduce((sum, item) => sum + (item.averageGrade10 * item.numberOfCredit), 0);
    const totalCreditGPA = filteredGrades.filter(item => item.isCreditGpa).reduce((sum, item) => sum + item.numberOfCredit, 0);
    const cumulativeGPA10 = totalCreditGPA > 0 ? (totalWeightedGrades / totalCreditGPA).toFixed(1) : 'N/A';

    const renderIsPass = (rowData) => {
        const isRequired = rowData.isPass;
        return (
            <span>
                {isRequired ? (
                    <p><FaCheck style={{ color: 'green', fontSize: '20px' }} /></p>
                ) : (
                    <p><MdCancel style={{ color: 'red', fontSize: '20px' }} /></p>
                )}
            </span>
        );
    };

    const renderLiteracy = (rowData) => {
        const literacy = rowData.literacy;
        let gradeClass = '';
        let gradeLabel = literacy;

        switch (literacy) {
            case 'A ':
                gradeClass = 'grade-A';
                break;
            case 'B+':
                gradeClass = 'grade-Bplus';
                break;
            case 'B ':
                gradeClass = 'grade-B';
                break;
            case 'C+':
                gradeClass = 'grade-Cplus';
                break;
            case 'C ':
                gradeClass = 'grade-C';
                break;
            case 'D+':
                gradeClass = 'grade-Dplus';
                break;
            case 'D ':
                gradeClass = 'grade-D';
                break;
            case 'F ':
                gradeClass = 'grade-F';
                break;
            default:
                gradeClass = 'grade-default';
        }
        return <span className={gradeClass}>{gradeLabel}</span>;
    };

    return (
        hasDataForYear && (
            <div key={year.label} className='datatable-container'>
                <DataTable
                    emptyMessage=" "
                    value={isDataVisible ? filteredGrades : []}
                    header={
                        <div className="flex flex-wrap align-items-center justify-content-between gap-2">
                            <span>{'Năm học: ' + year.label + ' - ' + year.semesterName}</span>
                            <Button 
                                style={{ background: 'var(--bg-red)'}} 
                                onClick={toggleDataVisibility} 
                                icon={isDataVisible ? 'pi pi-angle-down' : 'pi pi-angle-up'} 
                            />
                        </div>
                    }
                    footer={
                        <div className='flex flex-wrap justify-content-between gap-1 p-2' style={{ background: 'white' }}>
                            <p>Số tín chỉ đăng kí học kì: {totalCredits}</p>
                            <p>Số tín chỉ đạt: {totalCreditsPass}</p>
                            <p>Điểm trung bình học kì (hệ 10): {cumulativeGPA10}</p>
                            <p>Điểm trung bình học kì (hệ 4): {calculateGPA(cumulativeGPA10)}</p>
                        </div>
                    }
                >
                    <Column field="subjectId" header="Mã học phần" />
                    <Column field="subjectName" header="Tên học phần" style={{ width: '40%' }} />
                    <Column field="numberOfCredit" header="Số tín chỉ" />
                    <Column field="averageGrade10" header="Điểm hệ 10" />
                    <Column field="averageGrade4" header="Điểm hệ 4" />
                    <Column header="Điểm chữ" body={renderLiteracy} />
                    <Column header="kết quả" body={renderIsPass} />
                </DataTable>
            </div>
        )
    );
};

// Thành phần chính
const SelectGrades = () => {
    const [studentId, setStudentId] = useState('');
    const [optionsProgram, setOptionsProgram] = useState([]);
    const [selectedProgram, setSelectedProgram] = useState('');
    const [isDataVisible, setIsDataVisible] = useState(false);
    const [listGrades, setListGrades] = useState([]);
    const [rawData, setRawData] = useState([]);
    const [yearOptions, setYearOptions] = useState([]);

    const { accounts } = useMsal();
    const toggleDataVisibility = () => setIsDataVisible(!isDataVisible);

    useEffect(() => {
        if (!accounts?.length) {
            return;
        }
        setStudentId(getStudentId());
    }, [accounts]);

    useEffect(() => {
        fetch(`https://localhost:7074/api/CourseRegistration`)
            .then(response => response.json())
            .then(data => {
                const filteredData = data.filter(item => item.studentId === studentId);
                setRawData(filteredData);
                const options = filteredData.map(item => ({
                    label: item.trainingProgramName,
                    value: item.trainingProgramName
                }));
                const uniqueOptions = Array.from(new Set(options.map(option => option.value)))
                    .map(uniqueValue => options.find(option => option.value === uniqueValue));
                setOptionsProgram(uniqueOptions);
                setSelectedProgram(uniqueOptions[0]?.value);
            })
            .catch(err => console.error('Lỗi', err));
    }, [studentId]);

    useEffect(() => {
        const filteredData = rawData.filter(item => item.trainingProgramName === selectedProgram);
        setListGrades(filteredData);
    }, [rawData, selectedProgram]);

    useEffect(() => {
        fetch('https://localhost:7074/Semester')
            .then(response => response.json())
            .then((data) => {
                const options = Array.from(new Set(data.map(item => item.academicYear)))
                    .map(year => data.find(item => item.academicYear === year))
                    .map(item => ({
                        label: item.academicYear,
                        value: item.academicYear,
                        startDate: item.startDate,
                        endDate: item.endDate,
                        semesterName: item.semesterName,
                    }));
                setYearOptions(options);
            })
            .catch(err => console.error('Lỗi', err));
    }, []);

    return (
        <div>
            <h3 className='title'>KẾT QUẢ HỌC TẬP</h3>
            <div className='dropdown-container'>
                <FloatLabel>
                    <Dropdown
                        value={selectedProgram}
                        options={optionsProgram}
                        onChange={(e) => setSelectedProgram(e.target.value)}
                        className='cus-dropdown'
                        panelClassName='cus-panel-dropdown'
                    />
                    <label htmlFor="selectedRegistration" className='cus-label-dropdown'>Chương trình đào tạo</label>
                </FloatLabel>
            </div>
            <div className='datatable-container'>
                {listGrades && listGrades.length > 0 && (
                    <div>
                        <div className='flex flex-wrap gap-6 p-2'>
                            <p><strong>Mã số sinh viên: </strong>{studentId}</p>
                            <p><strong>Họ và tên: </strong>{listGrades[0].fullName}</p>
                            <p><strong>Ngành: </strong>{listGrades[0].majorName}</p>
                        </div>
                        <div className='flex flex-wrap gap-6 p-2'>
                            <p><strong>Tổng số tín chỉ đăng ký: </strong>{listGrades[0].totalCredit}</p>
                            <p><strong>Số tín chỉ đạt: </strong>{listGrades[0].creditPass}</p>
                            <p><strong>Số tín chỉ không đạt: </strong>{listGrades[0].creditFall}</p>
                            <p><strong>Điểm TB tích lũy hệ 10: </strong>{listGrades[0].cumulativeAverageGrade10}</p>
                            <p><strong>Điểm TB tích lũy hệ 4: </strong>{listGrades[0].cumulativeAverageGrade4}</p>
                        </div>
                    </div>
                )}
            </div>
            <div>
                {yearOptions.map((year) => (
                    <YearDataTable
                        key={year.value}
                        year={year}
                        grades={listGrades}
                        isDataVisible={isDataVisible}
                        toggleDataVisibility={toggleDataVisibility}
                    />
                ))}
            </div>
        </div>
    );
};

export default SelectGrades;
