import React from 'react';
import { FaEdit, FaUser } from 'react-icons/fa';
import { GiTeacher } from 'react-icons/gi';
export const SidebarData = [
    {
        title: 'Thông tin cá nhân',
        icon: <FaUser />,
        link: '/teacher/'
    },
    {
        title: 'Đăng kí dạy học',
        icon: <GiTeacher />,
        link: '/teacher/teaching-registration'
    },
    {
        title: 'Nhập điểm',
        icon: <FaEdit />,
        link: '/teacher/grades'
    },
];