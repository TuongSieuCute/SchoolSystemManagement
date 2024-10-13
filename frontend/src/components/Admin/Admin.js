import React, { useState, useEffect } from 'react';
import { getUserInfoLocal, getUserInfoAzure } from '../../helper/token.js';
import { useMsal } from "@azure/msal-react";
import { SidebarData } from './SidebarData.js';
import Sidebar from '../Home/Sidebar.js';

const Admin = () => {
    const [username, setUsername] = useState("");
    const { accounts } = useMsal();

    useEffect(() => {
        const userInfo = getUserInfoLocal();

        if (userInfo && userInfo.username) {
            setUsername(userInfo.username);
        }
        else {
            const azureUserInfo = getUserInfoAzure(accounts);
            if (azureUserInfo) {
                setUsername(azureUserInfo.username);
            }
        }
    }, [accounts]);

    if (!username) {
        return null;
    }

    return (
        <div>
            <Sidebar username={username} sidebardata={SidebarData}></Sidebar>
        </div>
    );
};

export default Admin;