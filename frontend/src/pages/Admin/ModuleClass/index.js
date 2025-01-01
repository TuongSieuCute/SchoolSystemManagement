import React, { useEffect, useState } from 'react';
import { TreeTable } from 'primereact/treetable';
import { Column } from 'primereact/column';
import { Dropdown } from 'primereact/dropdown';
import { FloatLabel } from 'primereact/floatlabel';
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import AddModuleClass from './AddModuleClass';
import { getModuleClass } from '../../../common/sevices/moduleClassService';
import { checkTime, defaultYearSemester, dropdownYearSemester, formatDate } from '../../../helper/function';
import EditModuleClass from './EditModuleClass';

const ModuleClass = () => {
    const [optionsYear, setOptionsYear] = useState([]);
    const [selectedYear, setSelectedYear] = useState('');
    const [optionsSemester, setOptionsSemester] = useState([]);
    const [selectedSemester, setSelectedSemester] = useState('');
    const [moduleClass, setModuleClass] = useState([]);
    const [nodes, setNodes] = useState([]);
    const [dialogOpenCreate, setDialogOpenCreate] = useState(false);
    const [dialogOpenEdit, setDialogOpenEdit] = useState(false);
    const [selectedRowData, setSelectedRowData] = useState(null);

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

    const toggleDialogCreate = () => {
        setDialogOpenCreate(!dialogOpenCreate);
    };
    const toggleDialogEdit = (rowData) => {
        setDialogOpenEdit(!dialogOpenEdit);
        setSelectedRowData(rowData)
    };

    const header = (
        <div style={{ background: 'var(--bg-white)', display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h3 style={{ margin: 0 }}>Danh sách lớp học phần</h3>
            <Button label="Thêm" icon='pi pi-plus' onClick={toggleDialogCreate} className='p-2 mt-1' style={{ gap: '5px', background: 'var(--bg-red)' }} />
        </div>
    );

    useEffect(() => {
        dropdownYearSemester(setOptionsYear, setOptionsSemester);
        defaultYearSemester(setSelectedYear, setSelectedSemester);
    }, []);

    useEffect(() => {
        const fetchModuleClass = async () => {
            try {
                const filteredTime = await checkTime(selectedYear, selectedSemester);

                if (filteredTime && filteredTime.length > 0) {
                    const startDate = filteredTime[0].startDate;
                    const endDate = filteredTime[0].endDate;

                    const response = await getModuleClass();
                    if (response.ok) {
                        const data = await response.json();
                        const filteredData = data.filter(item => item.startDate >= startDate && item.startDate <= endDate);
                        setModuleClass(filteredData);
                    } else {
                        throw new Error(`Lỗi ${response.status}`);
                    }
                }
            } catch (err) {
                console.error('Lỗi', err);
            }
        };
        fetchModuleClass();
    }, [selectedYear, selectedSemester]);

    useEffect(() => {
        const treeData = transformDataToTreeNodes(moduleClass);
        setNodes(treeData);
    }, [moduleClass]);

    return (
        <div>
            <h3 className='title'>LỚP HỌC PHẦN</h3>
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
            </div>
            <div className='datatable-container'>
                <TreeTable
                    value={nodes}
                    className="custom-tree-table"
                    header={header}
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
                                    icon="pi pi-pen-to-square"
                                    className="p-button-rounded p-button-success mr-2"
                                    onClick={() => toggleDialogEdit(node.data)}
                                />
                                <Button
                                    icon="pi pi-trash"
                                    className="p-button-rounded p-button-danger"
                                    onClick={() => handleDelete(node.data)}
                                />
                            </div>
                        ) : null
                    )} />
                </TreeTable>

                <Dialog
                    visible={dialogOpenCreate}
                    style={{ width: "50vw" }}
                    header="Thêm lớp học phần"
                    onHide={toggleDialogCreate}
                >
                    <AddModuleClass></AddModuleClass>
                </Dialog>

                <Dialog
                    visible={dialogOpenEdit}
                    style={{ width: "50vw" }}
                    header="Chỉnh sửa lớp học phần"
                    onHide={toggleDialogEdit}
                >
                    {selectedRowData ? (
                        <EditModuleClass data={selectedRowData} />
                    ) : (null)}
                </Dialog>

            </div>
        </div>
    );
};

export default ModuleClass;