import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import './Student.css'
import CourseRegistration from './CourseRegistration';

const Student = () => {
    return (
        <div>
            {/* <div className='sidebar'>
                <ul>
                    <li>
                        <Link to={"/student/information"}>
                            <span>Thông tin cá nhân</span>
                        </Link>
                    </li>
                    <li>
                        <Link to={"/student/curriculum"}>
                            <span>Chương trình đào tạo</span>
                        </Link>
                    </li>
                </ul>
            </div>
            <div className='content'>
                <Outlet />
            </div> */}
            <CourseRegistration></CourseRegistration>
        </div>
    );
};

export default Student;