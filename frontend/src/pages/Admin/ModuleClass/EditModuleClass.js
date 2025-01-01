import React, { useState, useEffect } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { FloatLabel } from 'primereact/floatlabel';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';

const EditModuleClass = ({ data }) => {
    const [editData, setEditData] = useState('');
    const [selectedDayOfWeek, setSelectedDayOfWeek] = useState('');
    const [inputLessonStart, setinputLessonStart] = useState('');
    const [inputLessonEnd, setinputLessonEnd] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [inputRoomId, setInputRoomId] = useState('');

    const optionsDayOfWeek = ['Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'];
    useEffect(() => {
        if (data) {
            setEditData(data);
            if (data.timeRange) {
                const [start, end] = data.timeRange.split(" - ");
                setStartDate(new Date(start));
                setEndDate(new Date(end));
            }
        }
    }, [data])

    if (!editData) {
        return <div>Loading...</div>;
    }
    // Tách lessonTime để lấy lessonStart và lessonEnd
    const getLessonStart = (lessonTime) => {
        if (lessonTime) return lessonTime.split(' - ')[0];  // Lấy phần trước dấu " - "
        return null;
    };
    const getLessonEnd = (lessonTime) => {
        if (lessonTime) return lessonTime.split(' - ')[1];  // Lấy phần sau dấu " - "
        return null;
    };
    return (
        <div className='p-4'>
            <p className='mb-4'><strong>Mã lớp học phần: </strong>{editData.moduleClassId}</p>
            <p className='mb-4'><strong>Tên giảng viên: </strong>{editData.fullName}</p>
            <p className='mb-4'><strong>Số lượng sinh viên tối đa: </strong>{editData.maximumNumberOfStudents}</p>
            <FloatLabel className='mb-4'>
                <Dropdown
                    value={selectedDayOfWeek || editData.dayOfWeek}
                    options={optionsDayOfWeek}
                    onChange={(e) => setSelectedDayOfWeek(e.value)}
                    className='cus-dropdown w-full'
                    panelClassName='cus-panel-dropdown'
                />
                <label htmlFor="selectedDayOfWeek" className='cus-label-dropdown'>Thứ</label>
            </FloatLabel>
            <FloatLabel className='mb-4'>
                <InputNumber
                    id='inputLessonStart'
                    value={inputLessonStart || getLessonStart(editData.lessonTime)}
                    onValueChange={(e) => setinputLessonStart(e.value)}
                    min={1} max={12} step={1}
                    className='mt-3 w-full'
                />
                <label htmlFor="inputLessonStart" className='cus-label-dropdown'>Tiết bắt đầu</label>
            </FloatLabel>
            <FloatLabel className='mb-4'>
                <InputNumber
                    id='inputLessonEnd'
                    value={inputLessonEnd || getLessonEnd(editData.lessonTime)}
                    onValueChange={(e) => setinputLessonEnd(e.value)}
                    min={1} max={12} step={1}
                    className='mt-3 w-full'
                />
                <label htmlFor="inputLessonEnd" className='cus-label-dropdown'>Tiết Kết thúc</label>
            </FloatLabel>
            <label className='p-2 font-bold'>Ngày bắt đầu</label>
            <div className='mb-4 card flex justify-content-center'>
                <Calendar className='w-full' value={startDate} onChange={(e) => setStartDate(e.value)} dateFormat="dd/mm/yy" showIcon />
            </div>
            <label className='p-2 font-bold'>Ngày kết thúc</label>
            <div className='mb-4 card flex justify-content-center'>
                <Calendar className='w-full' value={endDate} onChange={(e) => setEndDate(e.value)} dateFormat="dd/mm/yy" showIcon />
            </div>
            <FloatLabel className='mb-4'>
                <InputText
                    id='inputRoomId'
                    value={inputRoomId || editData.classRoomId}
                    onValueChange={(e) => setInputRoomId(e.value)}
                    className='mt-3 w-full p-2'
                />
                <label htmlFor="inputRoomId" className='cus-label-dropdown'>Phòng học</label>
            </FloatLabel>
            <div className='flex justify-content-end mt-4'>
                <Button label='Lưu' icon='pi pi-save' className='p-2 font-bold gap-2' style={{ background: 'var(--bg-red)' }} />
            </div>
        </div>
    );
};

export default EditModuleClass;