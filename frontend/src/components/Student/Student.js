import React, { useState, useEffect } from 'react';
import Sidebar from '../Home/Sidebar';
import { getUserInfoLocal, getUserInfoAzure } from '../../helper/token';
import { useMsal } from "@azure/msal-react";
import { SidebarData } from './SidebarData.js'


const Student = () => {
    const [username, setUsername] = useState("");
    const { accounts } = useMsal();

    useEffect(() => {
        const userInfo = getUserInfoLocal();

        if (userInfo && userInfo.username) 
        {
            setUsername(userInfo.username);
        } 
        else 
        {
            const azureUserInfo = getUserInfoAzure(accounts);
            if (azureUserInfo) {
                setUsername(azureUserInfo.username);
            }
        }
    }, [accounts]);

    if (!username) {
        return null; // Hoặc một component loading
    }

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
            <Sidebar username={username} sidebardata={SidebarData}></Sidebar>
        </div>
    );
};

export default Student;