import React, { useState, useEffect, useRef } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { FloatLabel } from 'primereact/floatlabel';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import { InputSwitch } from 'primereact/inputswitch';
import { Toast } from 'primereact/toast';
import { dropdownTrainingProgramName } from '../../../../helper/function';
import { getSubject } from '../../../../common/sevices/subjectService';
import { getClassrooms } from '../../../../common/sevices/classroomService';
import * as XLSX from 'xlsx';

const AddModuleClass = () => {
    const [optionsTrainingProgramName, setOptionsTrainingProgramName] = useState([]);
    const [selectedTrainingProgramName, setSelectedTrainingProgramName] = useState('');
    const [optionsSubject, setOptionsSubject] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState('');
    const [tableSubjects, setTableSubjects] = useState([]); // value, label
    const [subjectDataDTO, setSubjectDataDTO] = useState([]); // subjectIds, Count
    const [inputMaximumNumberOfStudents, setInputMaximumNumberOfStudents] = useState('');
    const [inputNumberOfWeeks, setInputNumberOfWeeks] = useState('');
    const [inputNumberOfDaysAWeek, setInputNumberOfDaysAWeek] = useState('');
    const [selectedNumberOfLessons, setSelectedNumberOfLessons] = useState('');
    const [optionsRoomType, setOptionsRoomType] = useState([]);
    const [selectedRoomType, setSelectedRoomType] = useState('');
    const [excelData, setExcelData] = useState('');
    const [checked, setChecked] = useState(false);

    const toast = useRef(null);
    const showToast = (severity) => {
        switch (severity) {
        case 'success':
            toast.current.show({
                severity: 'success',
                summary: 'Success',
                detail: 'Thành công',
                life: 3000
            });
            break;
        default:
            toast.current.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Đã xảy ra lỗi',
                life: 3000
            });
            break;
        }
    };
    const data = {
        'subjectDataDTO': subjectDataDTO.length > 0 ? subjectDataDTO.map((item) => ({
            'SubjectIds': item.SubjectIds,
            'Count': item.Count,
        })) : [],
        'maximumNumberOfStudents': inputMaximumNumberOfStudents || 40,
        'numberOfWeeks': inputNumberOfWeeks || 10,
        'numberOfDaysAWeek': inputNumberOfDaysAWeek || 1,
        'numberOfLessons': selectedNumberOfLessons,
        'roomType': selectedRoomType
    };
    const optionsNumberOfLessons = [3, 4, 5, 6];

    const handleTable = (e) => {
        const isDuplicate = tableSubjects.some(item => item.value === e.value);
        if (!isDuplicate) {
            setSelectedSubject(e.value);
            const selectedOption = optionsSubject.find(option => option.value === e.value);
            setTableSubjects([...tableSubjects, { value: e.value, label: selectedOption.label }]);
            setSubjectDataDTO(prev => [...prev, { SubjectIds: e.value, Count: 1 }]);
        }
    };
    const handleRemoveRow = (data) => {
        setTableSubjects(tableSubjects.filter(subject => subject.value !== data.value));
        setSubjectDataDTO(subjectDataDTO.filter(item => item.SubjectIds !== data.value));
    };
    const handleCountChange = (rowData, newValue) => {
        setSubjectDataDTO(prev =>
            prev.map(item =>
                item.SubjectIds === rowData.value
                    ? { ...item, Count: newValue }
                    : item
            )
        );
    };
    const readExcelFile = async (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const arrayBuffer = e.target.result;
                const workbook = XLSX.read(arrayBuffer, { type: 'array' });
                const sheetName = workbook.SheetNames[0];
                const sheet = workbook.Sheets[sheetName];
                const jsonData = XLSX.utils.sheet_to_json(sheet, { raw: true });
                let groupedData = [];
                let currentGroup = {
                    'subjectDataDTO': [],
                    'maximumNumberOfStudents': '',
                    'numberOfWeeks': '',
                    'numberOfDaysAWeek': '',
                    'numberOfLessons': '',
                    'roomType': ''
                };
                // Duyệt qua từng dòng dữ liệu
                jsonData.forEach((row) => {
                    // Kiểm tra nếu dòng có dữ liệu đầy đủ
                    if (row.SubjectIds && row.SubjectName && row.maximumNumberOfStudents && row.numberOfWeeks && row.numberOfDaysAWeek && row.numberOfLessons && row.roomType) {
                        // Thêm nhóm hiện tại vào kết quả nếu có dữ liệu
                        if (currentGroup.subjectDataDTO.length > 0) {
                            groupedData.push({ ...currentGroup });
                        }
                        // Tạo nhóm mới từ dòng đầy đủ
                        currentGroup = {
                            'subjectDataDTO': [{
                                'SubjectIds': row.SubjectIds,
                                'Count': row.Count
                            }],
                            'maximumNumberOfStudents': row.maximumNumberOfStudents,
                            'numberOfWeeks': row.numberOfWeeks,
                            'numberOfDaysAWeek': row.numberOfDaysAWeek,
                            'numberOfLessons': row.numberOfLessons,
                            'roomType': row.roomType
                        };
                    } else if (row.SubjectIds) {
                        // Nếu dòng chỉ có SubjectIds và Count, thêm vào nhóm hiện tại
                        currentGroup.subjectDataDTO.push({
                            'SubjectIds': row.SubjectIds,
                            'Count': row.Count
                        });
                    }
                });
                // Lưu nhóm cuối cùng vào groupedData
                if (currentGroup.subjectDataDTO.length > 0) {
                    groupedData.push({ ...currentGroup });
                }
                // Trả về mảng object
                resolve(groupedData);
            };
            reader.onerror = (error) => reject(error);
            reader.readAsArrayBuffer(file);
        });
    };
    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (file) {
            try {
                const jsonData = await readExcelFile(file);
                setExcelData(jsonData);
            } catch (error) {
                console.error('Lỗi khi đọc file:', error);
                showToast('error');
            }
        }
    };
    const handleUpload = async () => {
        if (excelData) {
            try {
                const dataToSend = JSON.stringify(excelData);
                const parsedData = JSON.parse(dataToSend);
                // Duyệt qua từng object trong parsedData và gửi từng object
                for (const singleObject of parsedData) {
                    const jsonPayload = JSON.stringify(singleObject);
                    const response = await fetch('https://localhost:7074/api/ModuleClass', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: jsonPayload,
                    });
                    if (response.ok) {
                        console.log('Đã lưu object:', singleObject);
                        showToast('success');
                    } else {
                        console.error('Lỗi lưu dữ liệu:', response.statusText, singleObject);
                        showToast('error');
                    }
                }
            } catch (error) {
                console.error('Lỗi gửi dữ liệu:', error);
                showToast('error');
            }
        } else {
            console.log('Chưa có dữ liệu để gửi!');
            showToast('error');
        }
    };
    const CreateModuleClass = async () => {
        try {
            const response = await fetch('https://localhost:7074/api/ModuleClass', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                console.log('Thành công!');
                showToast('error');
            } else {
                console.error(response.statusText);
                showToast('error');
            }
        } catch (error) {
            console.error(error);
            showToast('error');
        }
    };

    useEffect(() => {
        dropdownTrainingProgramName(setOptionsTrainingProgramName);
    }, []);
    useEffect(() => {
        const fetchSubject = async () => {
            try {
                const response = await getSubject();
                const data = await response.json();
                if (data) {
                    const filtered = data.filter(item => item.trainingProgramName === selectedTrainingProgramName);
                    const options = filtered.map(item => ({
                        label: item.subjectName,
                        value: item.subjectId
                    }));
                    const uniqueOptions = [...new Map(options.map(item => [item.value, item])).values()];
                    setOptionsSubject(uniqueOptions);
                } else {
                    console.log('Dữ liệu rỗng');
                }
            } catch (error) {
                console.error('Lỗi', error);
            }
        };
        fetchSubject();
    }, [selectedTrainingProgramName]);
    useEffect(() => {
        const fetchClassRoom = async () => {
            try {
                const response = await getClassrooms();
                const data = await response.json();
                if (data?.length) {
                    const options = [...new Set(data.map(item => item.roomType))].map(room => ({ label: room, value: room }));
                    setOptionsRoomType(options);
                } else {
                    console.log('Dữ liệu rỗng');
                }
            } catch (error) {
                console.error('Lỗi', error);
            }
        };
        fetchClassRoom();
    }, []);

    return (
        <div className='p-4'>
            <div className='pb-4'>
                <input
                    type="file"
                    accept=".xlsx, .xls"
                    onChange={handleFileUpload}
                />
                <Button label='Tải lên' onClick={handleUpload} className='p-2' style={{ background: 'var(--bg-red)' }} />
            </div>
            <div>
                <InputSwitch checked={checked} onChange={(e) => setChecked(e.value)} />
            </div>
            {checked && (
                <div>
                    <FloatLabel>
                        <Dropdown
                            value={selectedTrainingProgramName}
                            options={optionsTrainingProgramName}
                            onChange={(e) => setSelectedTrainingProgramName(e.target.value)}
                            className='cus-dropdown w-full'
                            panelClassName='cus-panel-dropdown'
                        />
                        <label htmlFor="selectedTrainingProgramName" className='cus-label-dropdown'>Chương trình đào tạo</label>
                    </FloatLabel>
                    <FloatLabel className='mt-4'>
                        <Dropdown
                            value={selectedSubject}
                            options={optionsSubject}
                            onChange={handleTable}
                            optionLabel={(option) => `${option.value} - ${option.label}`}
                            filter
                            filterBy="label,value"
                            className='cus-dropdown w-full'
                            panelClassName='cus-panel-dropdown'
                        />
                        <label htmlFor="selectedSubject" className='cus-label-dropdown'>Học phần</label>
                        {tableSubjects.length > 0 && (
                            <DataTable value={tableSubjects}>
                                <Column field="value" header="Mã học phần" />
                                <Column field="label" header="Tên học phần" style={{ width: '40%' }} />
                                <Column
                                    header="Số lượng lớp học"
                                    body={(rowData) => (
                                        <InputNumber
                                            value={subjectDataDTO.find((data) => data.SubjectIds === rowData.value)?.Count || 1}
                                            onValueChange={(e) => handleCountChange(rowData, e.value)}
                                            min={0} max={100} step={1}
                                        />
                                    )}
                                />
                                <Column body={(rowData) => (
                                    <Button icon='pi pi-times' onClick={() => handleRemoveRow(rowData)} style={{ background: 'var(--bg-red)' }} />
                                )} />
                            </DataTable>
                        )}
                    </FloatLabel>
                    <FloatLabel className='mt-5'>
                        <InputNumber
                            id='maximumNumberOfStudents'
                            value={inputMaximumNumberOfStudents || 40}
                            onValueChange={(e) => setInputMaximumNumberOfStudents(e.value)}
                            min={15} max={200} step={1}
                            className='mt-3'
                        />
                        <label htmlFor="maximumNumberOfStudents" className='cus-label-dropdown'>Số lượng sinh viên tối đa</label>
                    </FloatLabel>
                    <FloatLabel className='mt-5'>
                        <InputNumber
                            id='numberOfWeeks'
                            value={inputNumberOfWeeks || 10}
                            onValueChange={(e) => setInputNumberOfWeeks(e.value)}
                            min={5} max={15} step={1}
                            className='mt-3'
                        />
                        <label htmlFor="numberOfWeeks" className='cus-label-dropdown'>Số lượng tuần học</label>
                    </FloatLabel>
                    <FloatLabel className='mt-5'>
                        <InputNumber
                            id='numberOfDaysAWeek'
                            value={inputNumberOfDaysAWeek || 1}
                            onValueChange={(e) => setInputNumberOfDaysAWeek(e.value)}
                            min={1} max={2} step={1}
                            className='mt-3'
                        />
                        <label htmlFor="numberOfDaysAWeek" className='cus-label-dropdown'>Số ngày học trong một tuần</label>
                    </FloatLabel>
                    <FloatLabel className='mt-4'>
                        <Dropdown
                            value={selectedNumberOfLessons}
                            options={optionsNumberOfLessons}
                            onChange={(e) => setSelectedNumberOfLessons(e.value)}
                            className='cus-dropdown w-full'
                            panelClassName='cus-panel-dropdown'
                        />
                        <label htmlFor="selectedNumberOfLessons" className='cus-label-dropdown'>Số tiết học</label>
                    </FloatLabel>
                    <FloatLabel className='mt-4'>
                        <Dropdown
                            value={selectedRoomType}
                            options={optionsRoomType}
                            onChange={(e) => setSelectedRoomType(e.target.value)}
                            className='cus-dropdown w-full'
                            panelClassName='cus-panel-dropdown'
                        />
                        <label htmlFor="selectedRoomType" className='cus-label-dropdown'>Loại phòng học</label>
                    </FloatLabel>
                    <div className='flex justify-content-end mt-4'>
                        <Button label='Tạo mới' onClick={CreateModuleClass} className='p-2 font-bold' style={{ background: 'var(--bg-red)' }} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddModuleClass;