import React from 'react';
import { GiTeacher } from 'react-icons/gi';
export const SidebarData = [
    {
        title: 'Thông tin cá nhân',
        icon: <GiTeacher />,
        link: '/student/'
    },
    {
        title: 'Chương trình đào tạo',
        icon: <GiTeacher />,
        link: '/student/instructionalPlan'
    },
    {
        title: 'Thời khóa biểu',
        icon: <GiTeacher />,
        link: '/student/timetable'
    },
    {
        title: 'Kết quả học tập',
        icon: <GiTeacher />,
        link: '/student/select-grades'
    },
    {
        title: 'Đăng kí học phần',
        icon: <GiTeacher />,
        link: '/student/register-module'
    },
];