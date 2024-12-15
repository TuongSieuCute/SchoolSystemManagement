import React from 'react';
import { FaEdit, FaUser } from 'react-icons/fa';
import { RiTimeLine } from "react-icons/ri";
import { GiTeacher } from 'react-icons/gi';
export const SidebarData = [
    {
        title: 'Thông tin cá nhân',
        icon: <FaUser />,
        link: '/teacher/'
    },
    {
        title: 'Thời khóa biểu',
        icon: <RiTimeLine />,
        link: '/teacher/timetable'
    },
    {
        title: 'Nhập điểm',
        icon: <FaEdit />,
        link: '/teacher/grades'
    },
    {
        title: 'Đăng kí dạy học',
        icon: <GiTeacher />,
        link: '/teacher/teaching-registration'
    },
];