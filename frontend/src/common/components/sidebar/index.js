import { useMsal } from '@azure/msal-react';
import { Tooltip } from 'primereact/tooltip';
import React, { useEffect, useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { getName } from '../../sevices/authService';
import './styles.css';
export const Sidebar = (props) => {
    const { accounts, instance } = useMsal();
    const [isOpen, setIsOpen] = useState(true);
    const [studentId, setStudentId] = useState('');

    useEffect(() => {
        if (!accounts?.length) {
            return;
        }
        setStudentId(getName());
    }, [accounts]);
    const handleAzureLogout = () => {
        instance.logoutPopup({
            postLogoutRedirectUri: '/',
            mainWindowRedirectUri: '/',
        });
    };
    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <div className={`${isOpen ? 'sidebar-open' : 'sidebar-close'} h-screen pt-4 fixed top-0 left-0 z-1 flex flex-column sidebar-container`}>
                <div className='flex flex-column md:flex-row justify-content pl-4'>
                    <i className='pi pi-bars text-3xl cursor-pointer' onClick={toggleSidebar}></i>
                    {isOpen && <span className='pl-3 text-lg font-bold'>Sư Phạm Hồ Chí Minh</span>}
                </div>
                <div className='flex-1 p-2'>
                    <ul className='list-none pl-0'>
                        {props.sidebardata?.map((value, index) => {
                            return (
                                <li key={index}>
                                    <NavLink
                                        end
                                        to={value.link}
                                        className='flex flex-column md:flex-row justify-content no-underline px-3 pt-2 mr-2 mt-2 border-round-xl sidebar-link'
                                    >
                                        {isOpen ? (
                                            <>
                                                <div className='text-3xl'>{value.icon}</div>
                                                <div className='pl-3 mt-1 text-lg'>{value.title}</div>
                                            </>
                                        ) : (
                                            <div className='relative'>
                                                <Tooltip target=".custom-target-icon" />
                                                <i
                                                    className='text-3xl cursor-pointer custom-target-icon'
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
                        {isOpen && <span className='pl-2 text-lg'>{studentId}</span>}
                    </li>

                    <li className='flex align-items-center pl-3 py-2 border-round-xl cursor-pointer list-bottom mt-1'>
                        {isOpen ? (
                            <>
                                <i className='pi pi-sign-out text-3xl'></i>
                                <span className='pl-3 text-lg' onClick={handleAzureLogout}>Đăng xuất</span>
                            </>
                        ) : (
                            <div className='relative'>
                                <Tooltip target=".custom-target-icon" />
                                <i
                                    className='pi pi-sign-out text-2xl cursor-pointer custom-target-icon'
                                    data-pr-tooltip='Đăng xuất'
                                    onClick={handleAzureLogout}
                                ></i>
                            </div>
                        )}
                    </li>
                </ul>
            </div>
            <div className={`${isOpen ? 'main-open' : 'main-close'} mb-3`}>
                <Outlet />
            </div>
        </>
    );
};
