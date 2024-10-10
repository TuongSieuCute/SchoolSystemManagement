import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import Logout from './Logout';
import '../../index.css'
import './Home.css'

const Sidebar = (props) => {
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const location = useLocation();

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    const handleChangePassword = () => {
        return <Link to="/changePassword"></Link>;
    };

    
    return (
        <div className="page-container">
            <div className="top-bar">
                <div className="user-profile" onClick={toggleDropdown}>
                    <div className="user-avatar"></div>
                    <span className="user-name">{props.username}</span>
                </div>
                {dropdownVisible && (
                    <div className="dropdown-menu">
                        <ul>
                            <li onClick={handleChangePassword}>Đổi mật khẩu</li>
                            <Logout />
                        </ul>
                    </div>
                )}
            </div>
            <div className="content-wrapper">
                <div className="sidebar-container">
                    <div className="sidebar-box">
                        <div className="logo">
                            <img src='/Images/logoHcmue.png' alt='logo Hcmue' />
                        </div>
                        <ul className="sidebarList">
                            {props.sidebardata?.map((value, index) => {
                                const isActive = location.pathname === value.link;
                                return (
                                    <li key={index} className={isActive ? "active" : ""}>
                                        <Link to={value.link} className='link'>
                                            <div className="sidebarIcon">
                                                {value.icon}
                                            </div>
                                            <div className="sidebarTitle">
                                                {value.title}
                                            </div>
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
                <div className="main-content">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Sidebar;