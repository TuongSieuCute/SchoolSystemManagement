import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import './Student.css'

const Student = () => {
    return (
        <div>
            <nav className='sidebar'>
                <Link to={"/student/information"}>
                    <span>Thông tin cá nhân</span>
                </Link>
            </nav>
            <div className='content'>
                <Outlet />
            </div>
        </div>
    );
};

export default Student;