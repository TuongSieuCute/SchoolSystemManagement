import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Tooltip } from 'primereact/tooltip';
import '../../index.css';

const Sidebar = (props) => {
    const [isOpen, setIsOpen] = useState(true);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            <div className={`${isOpen ? 'w-16rem' : 'w-5rem'} h-screen pt-4 fixed top-0 left-0 z-1 flex flex-column sidebar-container`}>
                <div className='flex flex-column md:flex-row justify-content pl-4'>
                    <i className='pi pi-bars text-2xl cursor-pointer' onClick={toggleSidebar}></i>
                    {isOpen && <span className='pl-3 text-base font-bold'>Sư Phạm Hồ Chí Minh</span>}
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
                                        {isOpen ? (
                                            <>
                                                <div className='text-2xl'>{value.icon}</div>
                                                <div className='pl-3 text-base'>{value.title}</div>
                                            </>
                                        ) : (
                                            <div className='relative'>
                                                <Tooltip target=".custom-target-icon" />
                                                <i
                                                    className='text-2xl cursor-pointer custom-target-icon'
                                                    data-pr-tooltip={value.title}
                                                >
                                                    {value.icon}
                                                </i>
                                            </div>
                                        )}
                                    </NavLink>
                                </li>
                            );
                        })}
                    </ul>
                </div>
                <ul className='flex flex-column p-3 list-none pl-2 mr-1'>
                    <li className='flex align-items-center mb-2 pl-2'>
                        <div className='w-3rem h-3rem border-circle border-2 border-white flex justify-content-center align-items-center'>
                            <i className='pi pi-user text-3xl'></i>
                        </div>
                        {isOpen && <span className='pl-2'>Nguyễn Cát Tường</span>}
                    </li>

                    <li className='flex align-items-center mb-2 pl-3 py-2 border-round-xl cursor-pointer list-bottom'>
                        {isOpen ? (
                            <>
                                <i className='pi pi-key text-2xl'></i>
                                <span className='pl-3 text-base'>Đổi mật khẩu</span>
                            </>
                        ) : (
                            <div className='relative'>
                                <Tooltip target=".custom-target-icon" />
                                <i
                                    className='pi pi-key text-2xl cursor-pointer custom-target-icon'
                                    data-pr-tooltip='Đổi mật khẩu'
                                ></i>
                            </div>
                        )}
                    </li>

                    <li className='flex align-items-center pl-3 py-2 border-round-xl cursor-pointer list-bottom'>
                        {isOpen ? (
                            <>
                                <i className='pi pi-sign-out text-2xl'></i>
                                <span className='pl-3 text-base'>Đăng xuất</span>
                            </>
                        ) : (
                            <div className='relative'>
                                <Tooltip target=".custom-target-icon" />
                                <i
                                    className='pi pi-sign-out text-2xl cursor-pointer custom-target-icon'
                                    data-pr-tooltip='Đăng xuất'
                                ></i>
                            </div>
                        )}
                    </li>
                </ul>

            </div>
            <div className={`${isOpen ? 'sidebar-open' : 'sidebar-close'}`}>
                <Outlet />
            </div>
        </div>
    );
};

export default Sidebar;