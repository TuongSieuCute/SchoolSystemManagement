import React, { useEffect, useState, useRef } from 'react';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dropdown } from 'primereact/dropdown';
import { FloatLabel } from 'primereact/floatlabel';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { useMsal } from '@azure/msal-react';
import { getUserName } from '../../common/sevices/authService';

const Grades = () => {
    const [teacherId, setTeachertId] = useState('');
    const [time, setTime] = useState([]);
    const [optionsYear, setOptionsYear] = useState([]);
    const [selectedYear, setSelectedYear] = useState('');
    const [optionsSemester, setOptionsSemester] = useState([]);
    const [selectedSemester, setSelectedSemester] = useState('');
    const [selectedModuleClass, setSelectedModuleClass] = useState('');
    const [optionsModuleClass, setOptionsModuleClass] = useState([]);
    const [moduleClass, setModuleClass] = useState([]);
    const [commonPercentages, setCommonPercentages] = useState({
        midtermGradePercentage: '',
        finalExamGradePercentage: ''
    });
    const [editedValues, setEditedValues] = useState({});
    const [modifiedRows, setModifiedRows] = useState({});

    const { accounts } = useMsal();
    const toast = useRef(null);

    // Hàm thay đổi input
    const handleInputChange = (e, rowData, field) => {
        const newValue = e.value;
        const id = rowData?.id || rowData?.studentId;
        // Kiểm tra nếu là các cột phần trăm
        const isPercentageField =
            field === 'midtermGradePercentage' ||
            field === 'finalExamGradePercentage';
        // Cập nhật trạng thái modified rows
        setModifiedRows(prev => {
            if (isPercentageField) {
                // Nếu là cột phần trăm, đánh dấu tất cả các dòng
                return moduleClass.reduce((acc, row) => {
                    acc[row.studentId] = true;
                    return acc;
                }, {});
            } else {
                // Nếu không phải, chỉ đánh dấu dòng hiện tại
                return {
                    ...prev,
                    [id]: true,
                };
            }
        });
        // Cập nhật giá trị chung cho các cột phần trăm
        if (isPercentageField) {
            setCommonPercentages(prev => ({
                ...prev,
                [field]: newValue
            }));
        }
        // Cập nhật moduleClass
        setModuleClass(prevModuleClass =>
            prevModuleClass.map(row => {
                // Nếu là cột phần trăm, cập nhật toàn bộ các dòng
                if (isPercentageField) {
                    return {
                        ...row,
                        [field]: newValue
                    };
                }
                // Nếu không phải, chỉ cập nhật dòng hiện tại
                return row.studentId === id
                    ? { ...row, [field]: newValue }
                    : row;
            })
        );
    };

    const getValueToDisplay = (rowData, field) => {
        const isPercentageField =
            field === 'midtermGradePercentage' ||
            field === 'finalExamGradePercentage';
        // Ưu tiên hiển thị giá trị chung nếu có
        if (isPercentageField && commonPercentages[field] !== '') {
            return commonPercentages[field];
        }
        // Ưu tiên giá trị đã chỉnh sửa, sau đó là giá trị gốc
        return editedValues[rowData.id]?.[field] ?? rowData[field];
    };

    const saveStudentData = async (rowData, selectedModuleClass) => {
        const midtermGradePercentage = commonPercentages.midtermGradePercentage !== ''
            ? commonPercentages.midtermGradePercentage
            : rowData.midtermGradePercentage;

        const finalExamGradePercentage = commonPercentages.finalExamGradePercentage !== ''
            ? commonPercentages.finalExamGradePercentage
            : rowData.finalExamGradePercentage;

        const midtermPercent = Number(midtermGradePercentage) * 10;
        const finalExamPercent = Number(finalExamGradePercentage) * 10;
        const totalPercentTimes10 = midtermPercent + finalExamPercent;

        // Kiểm tra tổng phần trăm
        if (totalPercentTimes10 !== 10) {
            toast.current.show({severity: 'error', summary: 'Lỗi', detail: 'Tổng % GK và % CK không bằng 1', life: 3000});
            return false;
        }

        const response = await fetch('https://localhost:7074/api/CourseRegistration', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "studentId": rowData.studentId,
                "moduleClassId": selectedModuleClass,
                "midtermGradePercentage": midtermGradePercentage,
                "finalExamGradePercentage": finalExamGradePercentage,
                "midtermGrade": rowData.midtermGrade,
                "finalExamGrade": rowData.finalExamGrade,
            }),
        });

        if (response.ok) {
            toast.current.show({ severity: 'success', summary: 'Success', detail: 'Cập nhật thành công', life: 3000 });
            const id = rowData?.id || rowData?.studentId;
            setModifiedRows(prev => {
                const newModifiedRows = { ...prev };
                delete newModifiedRows[id];
                console.log(modifiedRows);
                return newModifiedRows;
            });
            return true;
        }
        return false;
    };

    useEffect(() => {
        if (!accounts?.length) {
            return;
        }
        setTeachertId(getUserName());
    }, [accounts]);

    useEffect(() => {
        fetch('https://localhost:7074/api/Semester')
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
        }
        else {
            const upcomingTime = time.filter(item => item.startDate < formattedToday);

            if (upcomingTime.length > 0) {
                setSelectedYear(upcomingTime[upcomingTime.length - 1].academicYear);
                setSelectedSemester(upcomingTime[upcomingTime.length - 1].semesterName);
            }
        }
    }, [time])

    useEffect(() => {
        if (selectedYear && selectedSemester) {
            fetch('https://localhost:7074/api/ModuleClass')
                .then(response => response.json())
                .then((data) => {
                    const filteredTime = time.filter(item => item.academicYear === selectedYear && item.semesterName === selectedSemester);
                    if (filteredTime.length > 0) {
                        const startDate = filteredTime[0].startDate;
                        const endDate = filteredTime[0].endDate;

                        const filteredData = data.filter(item => item.lecturerId === teacherId && item.startDate >= startDate && item.startDate <= endDate);
                        const options = filteredData.map(item => ({
                            label: item.subjectName,
                            value: item.moduleClassId
                        }));
                        const uniqueOptions = Array.from(new Set(options.map(option => option.value)))
                            .map(uniqueValue => options.find(option => option.value === uniqueValue));
                        setOptionsModuleClass(uniqueOptions);
                    }
                })
                .catch(err => console.error('Lỗi', err));
        }
    }, [time, selectedYear, selectedSemester, teacherId])

    useEffect(() => {
        fetch('https://localhost:7074/api/CourseRegistration')
            .then(response => response.json())
            .then((data) => {
                const studentIds = new Set();
                const filteredData = data
                    .filter(item => item.moduleClassId === selectedModuleClass)
                    .filter(item => {
                        if (!studentIds.has(item.studentId)) {
                            studentIds.add(item.studentId);
                            return true;
                        }
                        return false;
                    });
                setModuleClass(filteredData);
            })
            .catch(err => console.error('Lỗi', err));

    }, [selectedModuleClass])

    return (
        <div>
            <Toast ref={toast} />
            <h3 className='title'>NHẬP ĐIỂM</h3>
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
                        value={selectedModuleClass}
                        options={optionsModuleClass}
                        onChange={(e) => setSelectedModuleClass(e.target.value)}
                        optionLabel={(option) => `${option.value} - ${option.label}`}
                        className='cus-dropdown'
                        panelClassName='cus-panel-dropdown'
                    />
                    <label htmlFor="selectedWeek" className='cus-label-dropdown'>Lớp học phần</label>
                </FloatLabel>
            </div>
            <div className='datatable-container'>
                <DataTable value={moduleClass}>
                    <Column field="studentId" header="Mã số sinh viên" />
                    <Column field="fullName" header="Họ và tên" />
                    <Column
                        header="% Điểm Giữa kỳ"
                        body={(rowData) => (
                            <InputNumber
                                mode='decimal'
                                minFractionDigits={1}
                                min={0.1}
                                max={0.9}
                                step={0.1}
                                value={getValueToDisplay(rowData, "midtermGradePercentage") || ''}
                                onChange={(e) => handleInputChange(e, rowData, "midtermGradePercentage")}
                                className='w-9'
                            />
                        )}
                    />
                    <Column
                        header="% Điểm Cuối kỳ"
                        body={(rowData) => (
                            <InputNumber
                                mode='decimal'
                                minFractionDigits={1}
                                min={0.1}
                                max={0.9}
                                step={0.1}
                                value={getValueToDisplay(rowData, "finalExamGradePercentage") || ''}
                                onChange={(e) => handleInputChange(e, rowData, "finalExamGradePercentage")}
                                className='w-9'
                            />
                        )}
                    />
                    <Column
                        header="Điểm Giữa kỳ"
                        body={(rowData) => (
                            <InputNumber
                                mode='decimal'
                                minFractionDigits={1}
                                min={0}
                                max={10}
                                step={0.1}
                                value={getValueToDisplay(rowData, "midtermGrade") || ''}
                                onChange={(e) => handleInputChange(e, rowData, "midtermGrade")}
                                className='w-9'
                            />
                        )}
                    />
                    <Column
                        header="Điểm Cuối kỳ"
                        body={(rowData) => (
                            <InputNumber
                                mode='decimal'
                                minFractionDigits={1}
                                min={0}
                                max={10}
                                step={0.1}
                                value={getValueToDisplay(rowData, "finalExamGrade") || ''}
                                onChange={(e) => handleInputChange(e, rowData, "finalExamGrade")}
                                className='w-9'
                            />
                        )}
                    />
                    <Column
                        header="Hành động"
                        body={(rowData) => {
                            const isModified = modifiedRows[rowData.studentId];
                            return (
                                <Button
                                    icon="pi pi-save"
                                    className={`p-button-lg ${isModified ? 'p-button-danger' : 'p-button-success'}`}
                                    onClick={() => saveStudentData(rowData, selectedModuleClass)}
                                    disabled={!isModified}
                                />
                            );
                        }}
                    />
                </DataTable>
            </div>
        </div>
    );
};

export default Grades;