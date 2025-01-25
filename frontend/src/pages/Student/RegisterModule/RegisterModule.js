import { format } from 'date-fns';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dropdown } from 'primereact/dropdown';
import { FloatLabel } from 'primereact/floatlabel';
import { TreeTable } from 'primereact/treetable';
import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useMsal } from '@azure/msal-react';
import { getStudentId } from '../../../common/sevices/authService';
import { Button } from 'primereact/button';
import { formatDate } from '../../../helper/function';
import { Toast } from "primereact/toast";
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';

const RegisterModule = () => {
    const [studentId, setStudentId] = useState('');
    const [listSubject, setListSubject] = useState([]);
    const [listModuleClass, setListModuleClass] = useState([]);
    const [optionsProgram, setOptionsProgram] = useState([]);
    const [selectedProgram, setSelectedProgram] = useState('');
    const [rawData, setRawData] = useState([]);
    const [nodes, setNodes] = useState([]);
    const [nodes2, setNodes2] = useState([]);

    const { accounts } = useMsal();
    const toast = useRef(null);
    const confirmCreate = (moduleClassId, studentId) => {
        confirmDialog({
            message: 'Bạn có muốn đăng ký lớp học phần này không?',
            header: 'Xác nhận',
            icon: 'pi pi-info-circle',
            defaultFocus: 'reject',
            acceptClassName: 'p-button-danger',
            accept: () => create(moduleClassId, studentId),
            reject: () => { }
        });
    };
    const confirmDelete = (moduleClassId, studentId) => {
        confirmDialog({
            message: 'Bạn có muốn xóa lớp học phần không?',
            header: 'Xác nhận',
            icon: 'pi pi-info-circle',
            defaultFocus: 'reject',
            acceptClassName: 'p-button-danger',
            accept: () => deleteRegister(moduleClassId, teacherId),
            reject: () => { }
        });
    };

    useEffect(() => {
        if (!accounts?.length) {
            return;
        }
        setStudentId(getStudentId());
    }, [accounts]);
    const transformDataToTreeNodes = (data) => {
        // Nhóm dữ liệu theo subjectId
        const groupedData = data.reduce((acc, item) => {
            if (!acc[item.subjectId]) {
                acc[item.subjectId] = {
                    key: item.subjectId,
                    data: { subjectId: item.subjectId, subjectName: item.subjectName },
                    children: []
                };
            }
            acc[item.subjectId].children.push({
                key: item.moduleClassId,
                data: {
                    moduleClassId: item.moduleClassId,
                    fullName: item.fullName,
                    maximumNumberOfStudents: item.maximumNumberOfStudents,
                    dayOfWeek: item.dayOfWeek,
                    lessonTime: `${item.lessonStart} - ${item.lessonEnd}`,
                    timeRange: `${formatDate(item.startDate)} - ${formatDate(item.endDate)}`,
                    classRoomId: item.classRoomId
                }
            });
            return acc;
        }, {});
        // Chuyển đối tượng thành mảng
        return Object.values(groupedData);
    };
    useEffect(() => {
        const treeData = transformDataToTreeNodes(mandatorySubjects);
        setNodes(treeData);

        const treeData2 = transformDataToTreeNodes(electiveSubjects);
        setNodes2(treeData2);
    }, [listSubject]);
    useEffect(() => {
        fetch('https://localhost:7074/api/ModuleClass')
            .then(response => response.json())
            .then(data => {
                setRawData(data);
            })
            .catch(err => console.error('Lỗi', err));
    }, []);
    useEffect(() => {
        if (!studentId || !selectedProgram || !rawData.length) {
            return; // Không thực hiện khi thiếu dữ liệu
        }
        // Lấy dữ liệu Subject
        fetch(`https://localhost:7074/api/Subject/studentId?studentId=${studentId}`)
            .then(response => response.json())
            .then(data => {
                // Lọc dữ liệu từ Subject theo `selectedProgram`
                const filteredData = data.filter(item => item.trainingProgramName === selectedProgram);
                const combinedData = rawData
                    .filter(module =>
                        filteredData.some(subject => subject.subjectId === module.subjectId)
                    )
                    .map(module => {
                        const subject = filteredData.find(subject => subject.subjectId === module.subjectId);
                        return {
                            ...module, // Các trường từ ModuleClass
                            subjectName: subject?.subjectName || '', // Thêm trường từ Subject
                            trainingProgramName: subject?.trainingProgramName || '',
                        };
                    });

                setListSubject(combinedData);
            })
            .catch(err => console.error('Lỗi', err));
    }, [studentId, selectedProgram, rawData]);

    useEffect(() => {
        fetch(`https://localhost:7074/api/CourseRegistration?studentId=${studentId}`)
            .then(response => response.json())
            .then(data => setListModuleClass(data))
            .catch(err => console.error('Lỗi', err));
    }, [studentId]);

    const subjectCount = listSubject.reduce((acc, item) => {
        if (acc[item.subjectId]) {
            acc[item.subjectId].count += 1;
        } else {
            acc[item.subjectId] = { ...item, count: 1 };
        }
        return acc;
    }, {});

    const uniqueSubjects = Object.values(subjectCount);

    const mandatorySubjects = uniqueSubjects.filter(subject => subject.subjectType === 'Bắt buộc');
    const electiveSubjects = uniqueSubjects.filter(subject => subject.subjectType === 'Tự chọn');

    const create = async (moduleClassId, studentId) => {
        const url = 'https://localhost:7074/api/CourseRegistration';
        const dto = {
            'moduleClassId': moduleClassId,
            'studentId': studentId,
        };

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dto),
            });
            console.log(JSON.stringify(dto));

            if (response.ok) {
                toast.current.show({ severity: 'success', summary: 'Thành công', detail: 'Đăng ký thành công', life: 3000 });
            } else {
                const errorDetail = await response.text(); // Lấy chi tiết lỗi từ server nếu có
                toast.current.show({ severity: 'error', summary: 'Lỗi', detail: 'Đăng ký thất bại', life: 3000 });
                console.error('Server error:', errorDetail);
            }
        } catch (error) {
            toast.current.show({ severity: 'error', summary: 'Lỗi', detail: 'Đăng ký thất bại', life: 3000 });
            console.error('Server error:', error);
        }
    };

    const deleteRegister = async (moduleClassId) => {
        try {
            const response = await fetch(`https://localhost:7074/api/CourseRegistration?studentId=${studentId}&moduleClassId=${moduleClassId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                toast.current.show({ severity: 'success', summary: 'Thành công', detail: 'Xóa thành công', life: 3000 });
                console.log('Success:', await response.text());
            } else {
                const text = await response.text();
                console.error('Server Error Response:', text);
                toast.current.show({ severity: 'error', summary: 'Lỗi', detail: 'Xóa thất bại', life: 3000 });
            }
        } catch (error) {
            console.error('Error:', error);
            toast.current.show({ severity: 'error', summary: 'Lỗi', detail: 'Xóa thất bại', life: 3000 });
        }
    };

    useEffect(() => {
        if (studentId) {
            fetch('https://localhost:7074/api/Cumulative')
                .then(response => response.json())
                .then((data) => {
                    const filteredData = data.filter(item => item.studentId === studentId);
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
        }
    }, [studentId]);
    return (
        <div>
            <h3 className='title'>ĐĂNG KÝ HỌC PHẦN</h3>
            <Toast ref={toast} />
            <ConfirmDialog />
            <div className='dropdown-container'>
                <FloatLabel>
                    <Dropdown
                        value={selectedProgram}
                        options={optionsProgram}
                        onChange={(e) => setSelectedProgram(e.target.value)}
                        className='cus-dropdown'
                        panelClassName='cus-panel-dropdown'
                    />
                    <label htmlFor="defaultDropdown" className='cus-label-dropdown'>Chương trình đào tạo</label>
                </FloatLabel>
            </div>
            <div className='datatable-container'>
                <TreeTable
                    value={nodes}
                    className="custom-tree-table"
                    paginator rows={5}
                >
                    <Column
                        field="subjectId"
                        header="Mã học phần"
                        expander
                        body={(node) => (
                            node.data.subjectId || node.data.moduleClassId
                        )}
                        filter filterPlaceholder="Tìm kiếm"
                        style={{ width: '15%' }}
                    />
                    <Column field='subjectName' header="Tên học phần" filter filterPlaceholder="Tìm kiếm" style={{ width: '20%' }} />
                    <Column field='fullName' header="Tên Giảng viên" />
                    <Column field='maximumNumberOfStudents' header="Số lượng SV" />
                    <Column field="dayOfWeek" header="Thứ" style={{ width: '10%' }} />
                    <Column field='lessonTime' header="Tiết học" />
                    <Column field='timeRange' header="Thời gian" />
                    <Column field="classRoomId" header="Mã phòng học" />
                    <Column header="Hành động" body={(node) => (
                        node.data.moduleClassId ? (
                            <div>
                                <Button
                                    label='Đăng ký'
                                    className="p-button-rounded p-button-success mr-2 p-2"
                                    onClick={() => confirmCreate(node.data.moduleClassId, studentId)}
                                />
                            </div>
                        ) : null
                    )} />
                </TreeTable>
            </div>
            <div className='datatable-container'>
                <TreeTable
                    value={nodes2}
                    className="custom-tree-table"
                    paginator rows={5}
                >
                    <Column
                        field="subjectId"
                        header="Mã học phần"
                        expander
                        body={(node) => (
                            node.data.subjectId || node.data.moduleClassId
                        )}
                        filter filterPlaceholder="Tìm kiếm"
                        style={{ width: '15%' }}
                    />
                    <Column field='subjectName' header="Tên học phần" filter filterPlaceholder="Tìm kiếm" style={{ width: '20%' }} />
                    <Column field='fullName' header="Tên Giảng viên" />
                    <Column field='maximumNumberOfStudents' header="Số lượng SV" />
                    <Column field="dayOfWeek" header="Thứ" style={{ width: '10%' }} />
                    <Column field='lessonTime' header="Tiết học" />
                    <Column field='timeRange' header="Thời gian" />
                    <Column field="classRoomId" header="Mã phòng học" />
                    <Column header="Hành động" body={(node) => (
                        node.data.moduleClassId ? (
                            <div>
                                <Button
                                    label='Đăng ký'
                                    className="p-button-rounded p-button-success mr-2 p-2"
                                    onClick={() => confirmCreate(node.data.moduleClassId, studentId)}
                                />
                            </div>
                        ) : null
                    )} />
                </TreeTable>
            </div>
            <div className='datatable-container'>
                <DataTable value={listModuleClass} tableStyle={{ minWidth: '50rem' }} header="Kết quả đăng ký">
                    <Column field="moduleClassId" header="Mã lớp học phần" />
                    <Column field="subjectName" header="Tên học phần" />
                    <Column field="numberOfCredit" header="STC" />
                    <Column field="fullName" header="Tên GV" />
                    <Column
                        header="Lịch học"
                        body={(rowData) => (
                            <div>
                                <div>{rowData.dayOfWeek}, Tiết ({rowData.lessonStart} - {rowData.lessonEnd}), {rowData.classRoomId},</div>
                                <div>({format(new Date(rowData.startDate), 'dd/MM/yyyy')} {'->'} {format(new Date(rowData.endDate), 'dd/MM/yyyy')})</div>
                            </div>
                        )}
                    />
                    <Column header="Hành động" body={(rowData) => (
                        <div>
                            <Button
                                label='Hủy'
                                className="p-button-rounded p-button-danger mr-2 p-2"
                                onClick={() => confirmDelete(rowData.moduleClassId, studentId)}
                            />
                        </div>
                    )} />
                </DataTable>
            </div>
        </div>
    );
};

export default RegisterModule;