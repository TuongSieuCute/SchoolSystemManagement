import React, { useEffect, useState, useRef } from 'react';
import { TreeTable } from 'primereact/treetable';
import { Column } from 'primereact/column';
import { Dropdown } from 'primereact/dropdown';
import { FloatLabel } from 'primereact/floatlabel';
import { Button } from "primereact/button";
import { DataTable } from 'primereact/datatable';
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { formatDate } from '../../../helper/function';
import { useMsal } from '@azure/msal-react';
import { getUserName } from '../../../common/sevices/authService';

const TeachingRegistration = () => {
    const [teacherId, setTeachertId] = useState('');
    const [moduleClass, setModuleClass] = useState([]);
    const [register, setRegister] = useState([]);
    const [nodes, setNodes] = useState([]);
    const { accounts } = useMsal();
    const toast = useRef(null);
    const confirmUpdate = (moduleClassId, teacherId) => {
        confirmDialog({
            message: 'Bạn có muốn đăng ký lớp học phần này không?',
            header: 'Xác nhận',
            icon: 'pi pi-info-circle',
            defaultFocus: 'reject',
            acceptClassName: 'p-button-danger',
            accept: () => updateModuleClass(moduleClassId, teacherId),
            reject: () => { }
        });
    };
    const confirmDelete = (moduleClassId, teacherId) => {
        confirmDialog({
            message: 'Bạn có muốn xóa lớp học phần không?',
            header: 'Xác nhận',
            icon: 'pi pi-info-circle',
            defaultFocus: 'reject',
            acceptClassName: 'p-button-danger',
            accept: () => deleteModuleClass(moduleClassId, teacherId),
            reject: () => { }
        });
    };
    useEffect(() => {
        if (!accounts?.length) {
            return;
        }
        setTeachertId(getUserName());
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
        fetch('https://localhost:7074/api/ModuleClass')
            .then(response => response.json())
            .then((data) => {
                const filteredData = data.filter(item => item.lecturerId === null);
                setModuleClass(filteredData);

                const filteredData1 = data.filter(item => item.lecturerId === teacherId);
                setRegister(filteredData1);
            })
            .catch(err => console.error('Lỗi', err));
    }, [teacherId])

    useEffect(() => {
        const treeData = transformDataToTreeNodes(moduleClass);
        setNodes(treeData);
    }, [moduleClass]);
    const updateModuleClass = async (moduleClassId, lecturerId) => {
        const url = 'https://localhost:7074/api/ModuleClass/TeachingRegistration';
        const dto = {
            'moduleClassId': moduleClassId,
            'lecturerId': lecturerId,
        };

        try {
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dto),
            });

            if (response.ok) {
                toast.current.show({ severity: 'success', summary: 'Thành công', detail: 'Đăng ký thành công', life: 3000 });
            } else {
                const errorDetail = await response.text(); // Lấy chi tiết lỗi từ server nếu có
                toast.current.show({ severity: 'error', summary: 'Lỗi', detail: 'Đăng ký thất bại', life: 3000 });
            }
        } catch (error) {
            toast.current.show({ severity: 'error', summary: 'Lỗi', detail: 'Đăng ký thất bại', life: 3000 });
        }
    };
    const deleteModuleClass = async (moduleClassId, lecturerId) => {
        const url = 'https://localhost:7074/api/ModuleClass/CancelRegistration';
        const dto = {
            'moduleClassId': moduleClassId,
            'lecturerId': lecturerId,
        };

        try {
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dto),
            });

            if (response.ok) {
                toast.current.show({ severity: 'success', summary: 'Thành công', detail: 'Xóa thành công', life: 3000 });
            } else {
                const errorDetail = await response.text(); // Lấy chi tiết lỗi từ server nếu có
                toast.current.show({ severity: 'error', summary: 'Lỗi', detail: 'Xóa thất bại', life: 3000 });
            }
        } catch (error) {
            toast.current.show({ severity: 'error', summary: 'Lỗi', detail: 'Xóa thất bại', life: 3000 });
        }
    };
    return (
        <div>
            <h3 className='title'>ĐĂNG KÝ HỌC PHẦN</h3>
            <Toast ref={toast} />
            <ConfirmDialog />
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
                                    onClick={() => confirmUpdate(node.data.moduleClassId, teacherId)}
                                />
                            </div>
                        ) : null
                    )} />
                </TreeTable>
            </div>
            <div className='datatable-container'>
                <DataTable value={register} header='Kết quả đăng ký'>
                    <Column field="dayOfWeek" header="Thứ" />
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
                    <Column header="Hành động" body={(rowData) => (
                        <div>
                            <Button
                                label='Hủy'
                                className="p-button-rounded p-button-danger mr-2 p-2"
                                onClick={() => confirmDelete(rowData.moduleClassId, teacherId)}
                            />
                        </div>
                    )} />
                </DataTable>
            </div>
        </div>
    );
};

export default TeachingRegistration;