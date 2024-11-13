import React, { useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import Logout from './Logout';
import '../../index.css';
// import './Home.css';

const Sidebar = (props) => {
    // const [dropdownVisible, setDropdownVisible] = useState(false);
    // const location = useLocation();

    // const toggleDropdown = () => {
    //     setDropdownVisible(!dropdownVisible);
    // };

    // const handleChangePassword = () => {
    //     return <Link to="/changePassword"></Link>;
    // };


    // return (
    //     <div className="page-container">
    //         <div className="top-bar">
    //             <div className="user-profile" onClick={toggleDropdown}>
    //                 <div className="user-avatar"></div>
    //                 <span className="user-name">{props.username}</span>
    //             </div>
    //             {dropdownVisible && (
    //                 <div className="dropdown-menu">
    //                     <ul>
    //                         <li onClick={handleChangePassword}>Đổi mật khẩu</li>
    //                         <Logout />
    //                     </ul>
    //                 </div>
    //             )}
    //         </div>
    //         <div className="content-wrapper">
    //             <div className="sidebar-container">
    //                 <div className="sidebar-box">
    //                     <div className="logo">
    //                         <img src='/Images/logoHcmue.png' alt='logo Hcmue' />
    //                     </div>
    //                     <ul className="sidebarList">
    //                         {props.sidebardata?.map((value, index) => {
    //                             const isActive = location.pathname === value.link;
    //                             return (
    //                                 <li key={index} className={isActive ? 'active' : ''}>
    //                                     <Link to={value.link} className='link'>
    //                                         <div className="sidebarIcon">
    //                                             {value.icon}
    //                                         </div>
    //                                         <div className="sidebarTitle">
    //                                             {value.title}
    //                                         </div>
    //                                     </Link>
    //                                 </li>
    //                             );
    //                         })}
    //                     </ul>
    //                 </div>
    //             </div>
    //             <div className="main-content">
    //                 <Outlet />
    //             </div>
    //         </div>
    //     </div>
    // );

    return (
        <div>
            <div className='w-16rem h-screen pt-4 fixed top-0 left-0 z-1 flex flex-column sidebar-container'>
                <div className='flex flex-column md:flex-row justify-content pl-4'>
                    <i className='pi pi-bars text-2xl'></i>
                    <span className='pl-3 text-base font-bold'>Sư Phạm Hồ Chí Minh</span>
                </div>
                <div className='flex-1 p-2'>
                    <ul className='list-none pl-0'>
                        {props.sidebardata?.map((value, index) => {
                            return (
                                <li key={index}>
                                    <NavLink
                                        to={value.link}
                                        activeClassName="active"
                                        className='flex flex-column md:flex-row justify-content no-underline px-3 pt-2 mr-2 mt-2 border-round-xl sidebar-link'
                                    >
                                        <div className='text-2xl'>
                                            {value.icon}
                                        </div>
                                        <div className='pl-3 text-base'>
                                            {value.title}
                                        </div>
                                    </NavLink>
                                </li>
                            );
                        })}
                    </ul>
                </div>
                <ul className='flex flex-column p-3 list-none pl-2 mr-2'>
                    <li className='flex align-items-center mb-3'>
                        <div className='w-3rem h-3rem border-circle border-2 border-white flex justify-content-center align-items-center'>
                            <i className='pi pi-user text-3xl'></i>
                        </div>
                        <span className='pl-2'>Nguyễn Cát Tường</span>
                    </li>

                    <li className='flex align-items-center mb-3 pl-2 py-2 border-round-xl list-bottom'>
                        <i className='pi pi-key text-2xl'></i>
                        <span className='pl-3 text-base'>Đổi mật khẩu</span>
                    </li>

                    <li className='flex align-items-center pl-2 py-2 border-round-xl list-bottom'>
                        <i className='pi pi-sign-out text-2xl'></i>
                        <span className='pl-3 text-base'>Đăng xuất</span>
                    </li>
                </ul>

            </div>
            <div className=''>
                <Outlet />
            </div>
        </div>
    );
};

export default Sidebar;