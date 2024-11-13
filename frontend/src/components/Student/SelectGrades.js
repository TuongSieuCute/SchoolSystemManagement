import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FloatLabel } from 'primereact/floatlabel';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import 'primeicons/primeicons.css';
import { getUserInfoLocal } from '../../helper/token';

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
    const filteredGrades = grades.filter(item => item.startDate >= year.startDate);
    const hasDataForYear = filteredGrades.length > 0;
    const totalCredits = filteredGrades.reduce((sum, item) => sum + item.numberOfCredit, 0);
    const totalCreditsPass = filteredGrades.filter(item => item.isPass).reduce((sum, item) => sum + item.numberOfCredit, 0);
    const totalWeightedGrades = filteredGrades.filter(item => item.isCreditGpa).reduce((sum, item) => sum + (item.averageGrade10 * item.numberOfCredit), 0);
    const totalCreditGPA = filteredGrades.filter(item => item.isCreditGpa).reduce((sum, item) => sum + item.numberOfCredit, 0);
    const cumulativeGPA10 = totalCreditGPA > 0 ? (totalWeightedGrades / totalCreditGPA).toFixed(2) : 'N/A';

    return (
        hasDataForYear && (
            <div key={year.label}>
                <DataTable
                    emptyMessage=" "
                    value={isDataVisible ? filteredGrades : []}
                    header={
                        <div className="flex flex-wrap align-items-center justify-content-between gap-2">
                            <span>{'Năm học: ' + year.label + ' - ' + year.semesterName}</span>
                            <Button onClick={toggleDataVisibility} icon={isDataVisible ? 'pi pi-angle-down' : 'pi pi-angle-up'} />
                        </div>
                    }
                    footer={
                        <div>
                            <p>Số tín chỉ đăng kí học kì: {totalCredits}</p>
                            <p>Số tín chỉ đạt: {totalCreditsPass}</p>
                            <p>Điểm trung bình học kì (hệ 10): {cumulativeGPA10}</p>
                            <p>Điểm trung bình học kì (hệ 4): {calculateGPA(cumulativeGPA10)}</p>
                        </div>
                    }
                >
                    <Column field="subjectId" header="Mã học phần" />
                    <Column field="subjectName" header="Tên học phần" />
                    <Column field="numberOfCredit" header="Số tín chỉ" />
                    <Column field="averageGrade10" header="Điểm hệ 10" />
                    <Column field="averageGrade4" header="Điểm hệ 4" />
                    <Column field="literacy" header="Điểm chữ" />
                    <Column field="isPass" header="Kết quả" />
                </DataTable>
            </div>
        )
    );
};

// Thành phần chính
const SelectGrades = () => {
    const [isDataVisible, setIsDataVisible] = useState(false);
    const [listGrades, setListGrades] = useState([]);
    const [registrationOptions, setRegistrationOptions] = useState([]);
    const [selectedRegistration, setSelectedRegistration] = useState(null);
    const [rawData, setRawData] = useState({});
    const [yearOptions, setYearOptions] = useState([]);
    const username = getUserInfoLocal().username;

    const toggleDataVisibility = () => setIsDataVisible(!isDataVisible);

    useEffect(() => {
        fetch(`http://localhost:5065/api/CourseRegistration?studentId=${username}`)
            .then(response => response.json())
            .then(data => {
                const options = Array.from(new Set(data.map(item => item.trainingProgramId)))
                    .map(id => data.find(item => item.trainingProgramId === id))
                    .map(item => ({ label: item.trainingProgramName, value: item.trainingProgramId }));
                setRegistrationOptions(options);
                setSelectedRegistration(options[0]?.value || null);
                setRawData(data);
            })
            .catch(err => console.error('Lỗi', err));
    }, [username]);

    useEffect(() => {
        if (selectedRegistration && rawData) {
            const filteredData = rawData.filter(item => item.trainingProgramId === selectedRegistration);
            setListGrades(filteredData);
        }
    }, [selectedRegistration, rawData]);

    useEffect(() => {
        fetch('http://localhost:5065/SemesterPeriod')
            .then(response => response.json())
            .then((data) => {
                const options = Array.from(new Set(data.map(item => item.academicYear)))
                    .map(year => data.find(item => item.academicYear === year))
                    .map(item => ({
                        label: item.academicYear,
                        value: item.academicYear,
                        startDate: item.startDate,
                        semesterName: item.semesterName,
                    }));
                setYearOptions(options);
            })
            .catch(err => console.error('Lỗi', err));
    }, []);

    return (
        <div>
            <h1>Điểm</h1>
            <div>
                <FloatLabel>
                    <Dropdown
                        value={selectedRegistration}
                        options={registrationOptions}
                        onChange={(e) => setSelectedRegistration(e.value)}
                    />
                    <label htmlFor="selectedRegistration">Chương trình đào tạo</label>
                </FloatLabel>
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
