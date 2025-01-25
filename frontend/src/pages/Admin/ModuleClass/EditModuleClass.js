import React, { useState, useEffect, useRef } from 'react';
import { Toast } from 'primereact/toast';
import { FloatLabel } from 'primereact/floatlabel';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';

const EditModuleClass = ({ data }) => {
    const [inputMaximumNumberOfStudents, setInputMaximumNumberOfStudents] = useState('');
    const [dayOfWeek, setDayOfWeek] = useState('');
    const [inputLessonStart, setinputLessonStart] = useState('');
    const [inputLessonEnd, setinputLessonEnd] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [inputRoomId, setInputRoomId] = useState('');

    const toast = useRef(null);

    useEffect(() => {
        if (data) {
            setInputMaximumNumberOfStudents(data.maximumNumberOfStudents);
            setDayOfWeek(data.dayOfWeek);
            setinputLessonStart(getLessonStart(data.lessonTime));
            setinputLessonEnd(getLessonEnd(data.lessonTime));
            setInputRoomId(data.classRoomId); 
            if (data.timeRange) {
                const [start, end] = data.timeRange.split(" - ");
                const [startDay, startMonth, startYear] = start.split('/');
                const [endDay, endMonth, endYear] = end.split('/');
                const formattedStartDate = new Date(startYear, startMonth - 1, startDay);
                const formattedEndDate = new Date(endYear, endMonth - 1, endDay);
                setStartDate(formattedStartDate);
                setEndDate(formattedEndDate);
            }
        }
    }, [data])

    // Tách lessonTime để lấy lessonStart và lessonEnd
    const getLessonStart = (lessonTime) => {
        if (lessonTime) return lessonTime.split(' - ')[0];  // Lấy phần trước dấu " - "
        return null;
    };
    const getLessonEnd = (lessonTime) => {
        if (lessonTime) return lessonTime.split(' - ')[1];  // Lấy phần sau dấu " - "
        return null;
    };
    const updateModuleClass = async () => {
        const dataMC = {
            'moduleClassId': data.moduleClassId,
            'maximumNumberOfStudents': inputMaximumNumberOfStudents,
            'dayOfWeek': checkDaysAndUpdate(dayOfWeek),
            'lessonStart': parseInt(inputLessonStart),
            'lessonEnd': parseInt(inputLessonEnd),
            'startDate': formatDate(startDate),
            'endDate': formatDate(endDate),
            'classRoomId': inputRoomId,
        };
        try {
            const response = await fetch('https://localhost:7074/api/ModuleClass', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataMC),
            });
        
            if (response.ok) {
                toast.current.show({severity: 'success', summary: 'Thành công', detail: 'Cập nhật thành công', life: 3000});
            } else {
                const errorDetail = await response.text(); // Lấy chi tiết lỗi từ server nếu có
                toast.current.show({severity: 'error', summary: 'Lỗi', detail: 'Cập nhật thất bại', life: 3000});
            }
        } catch (error) {
            toast.current.show({severity: 'error', summary: 'Lỗi', detail: 'Cập nhật thất bại', life: 3000 });
        }
    };
    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Thêm 1 vào tháng vì tháng bắt đầu từ 0
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    };
    const handleStartDateChange = (newStartDate) => {
        if (startDate && endDate) {
            // Tính khoảng cách giữa ngày bắt đầu và ngày kết thúc cũ
            const differenceInTime = endDate.getTime() - startDate.getTime();
            const differenceInDays = differenceInTime / (1000 * 3600 * 24);
            // Cập nhật ngày bắt đầu mới
            setStartDate(newStartDate);
            // Cập nhật ngày kết thúc mới dựa trên sự chênh lệch
            const newEndDate = new Date(newStartDate);
            newEndDate.setDate(newStartDate.getDate() + differenceInDays);
            setEndDate(newEndDate);
        } else {
            // Nếu ngày kết thúc chưa được thiết lập, chỉ cập nhật ngày bắt đầu
            setStartDate(newStartDate);
        }
    };
    const checkDaysAndUpdate = () => {
        if (!startDate || !endDate) return '';
        const startDay = startDate.getDay();
        const endDay = endDate.getDay();
        if (startDay === endDay && startDay !== 0) {
            // Cùng thứ, lưu tên thứ vào biến
            const dayName = getDayName(startDay);
            setDayOfWeek(dayName);
            return dayName;
        } else {
            // Không cùng thứ, đặt giá trị mặc định
            setDayOfWeek('');
            return '';
        }
    };
    const getDayName = (day) => {
        const days = ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'];
        return days[day];
    };
    return (
        <div className='p-4'>
            <p className='mb-4'><strong>Mã lớp học phần: </strong>{data.moduleClassId}</p>
            <p className='mb-4'><strong>Tên giảng viên: </strong>{data.fullName}</p>
            <FloatLabel className='mb-4'>
                <InputNumber
                    id='inputMaximumNumberOfStudents'
                    value={inputMaximumNumberOfStudents}
                    onValueChange={(e) => setInputMaximumNumberOfStudents(e.value)}
                    min={15} max={200} step={1}
                    className='mt-3 w-full'
                />
                <label htmlFor="inputMaximumNumberOfStudents" className='cus-label-dropdown'>Số lượng sinh viên tối đa:</label>
            </FloatLabel>
            <FloatLabel className='mb-4'>
                <InputNumber
                    id='inputLessonStart'
                    value={inputLessonStart}
                    onValueChange={(e) => setinputLessonStart(e.value)}
                    min={1} max={12} step={1}
                    className='mt-3 w-full'
                />
                <label htmlFor="inputLessonStart" className='cus-label-dropdown'>Tiết bắt đầu</label>
            </FloatLabel>
            <FloatLabel className='mb-4'>
                <InputNumber
                    id='inputLessonEnd'
                    value={inputLessonEnd}
                    onValueChange={(e) => setinputLessonEnd(e.value)}
                    min={1} max={12} step={1}
                    className='mt-3 w-full'
                />
                <label htmlFor="inputLessonEnd" className='cus-label-dropdown'>Tiết Kết thúc</label>
            </FloatLabel>
            <label className='p-2 font-bold'>Ngày bắt đầu</label>
            <div className='mb-4 card flex justify-content-center'>
                <Calendar className='w-full' value={startDate} onChange={(e) => handleStartDateChange(e.value)} dateFormat="dd/mm/yy" showIcon />
            </div>
            <label className='p-2 font-bold'>Ngày kết thúc</label>
            <div className='mb-4 card flex justify-content-center'>
                <Calendar className='w-full' value={endDate} onChange={(e) => setEndDate(e.value)} dateFormat="dd/mm/yy" showIcon />
            </div>
            <FloatLabel className='mb-4'>
                <InputText
                    id='inputRoomId'
                    value={inputRoomId}
                    onChange={(e) => setInputRoomId(e.target.value)}
                    className='mt-3 w-full p-2'
                />
                <label htmlFor="inputRoomId" className='cus-label-dropdown'>Phòng học</label>
            </FloatLabel>
            <Toast ref={toast} />
            <div className='flex justify-content-end mt-4'>
                <Button label='Lưu' icon='pi pi-save' onClick={updateModuleClass} className='p-2 font-bold gap-2' style={{ background: 'var(--bg-red)' }} />
            </div>
        </div>
    );
};

export default EditModuleClass;