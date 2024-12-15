import React, { useEffect, useState } from 'react';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dropdown } from 'primereact/dropdown';
import { FloatLabel } from 'primereact/floatlabel';
import { useMsal } from '@azure/msal-react';
import { getUserId } from '../../common/sevices/authService';
import { addDays } from 'date-fns';

const TimeTableTeacher = () => {
    return (
        <div>
            <h3 className='title'>THỜI KHÓA BIỂU</h3>
            {/* <div className='dropdown-container'>
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
            </div> */}
            {/* <div className='datatable-container'>
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
                    <Column field="fullName" header="Tên giảng viên" />
                    <Column field="classRoomId" header="Phòng học" />
                </DataTable>
            </div> */}
        </div>
    );
};

export default TimeTableTeacher;