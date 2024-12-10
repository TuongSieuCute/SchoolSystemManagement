import React from 'react';
import { IoPerson } from "react-icons/io5";
import { FaBook } from "react-icons/fa";
import { RiTimeLine } from "react-icons/ri";
import { FaGraduationCap } from "react-icons/fa6";
import { LiaMoneyBillWaveAltSolid } from "react-icons/lia";
import { FaClipboardList } from "react-icons/fa";
export const SidebarData = [
    {
        title: 'Thông tin cá nhân',
        icon: <IoPerson />,
        link: '/student/'
    },
    {
        title: 'Chương trình đào tạo',
        icon: <FaBook />,
        link: '/student/instructionalplan'
    },
    {
        title: 'Thời khóa biểu',
        icon: <RiTimeLine />,
        link: '/student/timetable'
    },
    {
        title: 'Kết quả học tập',
        icon: <FaGraduationCap />,
        link: '/student/grades'
    },
    {
        title: 'Học phí',
        icon: <LiaMoneyBillWaveAltSolid />,
        link: '/student/tuition'
    },
    {
        title: 'Đăng kí học phần',
        icon: <FaClipboardList />,
        link: '/student/registermodule'
    },
];