import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Combobox from 'react-widgets/Combobox';
import 'react-widgets/styles.css';
import { getClassrooms, searchClassroom } from '../../../common/sevices/classroomService';
import './styles.css';

const classRoom = () => {
    const [startDate, setStartDate] = useState(null);
    const [lessonStart, setLessonStart] = useState(null);
    const [lessonEnd, setLessonEnd] = useState(null);
    const [typeRoom, setTypeRoom] = useState(null);
    const [roomId, setRoomId] = useState(null);
    const [listRooms, setListRooms] = useState([]);
    const [error, setError] = useState('');

    const lessons = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
    const typeRooms = ['Phòng lý thuyết', 'Giảng đường', 'Phòng máy tính'];

    const formatDate = (date) => {
        if (!date) return '';
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const fetchListRoom = async () => {
        const isAllNull = !startDate && !lessonStart && !lessonEnd;
        const isAllValid = startDate && lessonStart && lessonEnd;
        if (isAllNull || isAllValid) {
            try {
                const searchParams = {
                    date: formatDate(startDate),
                    lessonStart,
                    lessonEnd,
                    typeRoom,
                    classRoomId: roomId
                };

                const response = await searchClassroom(searchParams);
                const data = await response.json();

                if (response.ok) {
                    setListRooms(data);
                } else {
                    setError(data.message);
                }
            } catch (err) {
                console.log(err);
                setError('Có lỗi xảy ra khi gọi API.');
            }
        }
        else {
            setError('Vui lòng điền đầy đủ thông tin ngày, tiết bắt đầu và tiết kết thúc.');
        }
    };

    useEffect(() => {
        getClassrooms()
            .then(response => response.json())
            .then(data => setListRooms(data))
            .catch(err => console.error('Lỗi', err));
    }, []);

    return (
        <div className='admin-container'>
            <div className='box'>
                <div className='schedule-form'>
                    <div className='lesson-schedule'>
                        <label>Chọn ngày:</label>
                        <DatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            dateFormat="dd/MM/yyyy"
                            className='custom-datepicker' />
                    </div>
                    <div className='lesson-schedule'>
                        <label>Tiết bắt đầu:</label>
                        <Combobox
                            data={lessons}
                            value={lessonStart}
                            onChange={(value) => setLessonStart(value)} />
                    </div>
                    <div className='lesson-schedule'>
                        <label>Tiết kết thúc:</label>
                        <Combobox
                            data={lessons}
                            value={lessonEnd}
                            onChange={(value) => setLessonEnd(value)} />
                    </div>
                    <div className='lesson-schedule'>
                        <label>Loại phòng:</label>
                        <Combobox
                            data={typeRooms}
                            value={typeRoom}
                            onChange={(value) => setTypeRoom(value)} />
                    </div>
                    <div className='lesson-schedule'>
                        <label>Mã phòng học:</label>
                        <input
                            type='text'
                            value={roomId}
                            onChange={(e) => setRoomId(e.target.value)}
                            className='custom-datepicker' />
                    </div>
                    <button className='button-search' onClick={fetchListRoom}>Tìm kiếm</button>
                </div>
                <div className='table'>
                    <h1>Danh sách phòng học:</h1>
                    <table>
                        <thead>
                            <tr>Mã phòng</tr>
                            <tr>Khu vực</tr>
                            <tr>Tầng</tr>
                            <tr>Loại phòng</tr>
                            <tr>Số lượng</tr>
                        </thead>
                        <tbody>
                            {listRooms.length === 0 ? (
                                <tr>
                                    <td colSpan={6} style={{ textAlign: 'center', color: 'red' }}>
                                        Không tìm thấy phòng hoặc phòng đã có tiết học
                                    </td>
                                </tr>
                            ) : (
                                listRooms.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.classRoomId}</td>
                                        <td>{item.sector}</td>
                                        <td>{item.floor}</td>
                                        <td>{item.roomType}</td>
                                        <td>{item.capacity}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                        {error && <p className='error'>{error}</p>}
                    </table>
                </div>
            </div>
        </div>
    );
};

export default classRoom;