import React from 'react';
import { MdOutlineMeetingRoom } from "react-icons/md";
import { GiTeacher } from 'react-icons/gi';
import { IoIosNotifications } from "react-icons/io";

export const SidebarData = [
    {
        title: 'Phòng học',
        icon: <MdOutlineMeetingRoom />,
        link: '/admin/classroom'
    },
    {
        title: 'Lớp học phần',
        icon: <GiTeacher />,
        link: '/admin/moduleClass'
    },
    {
        title: 'Thông báo',
        icon: <IoIosNotifications />,
        link: '/admin/notification'
    },
];