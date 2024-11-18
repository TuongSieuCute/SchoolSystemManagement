import { useMsal } from '@azure/msal-react';
import React, { useEffect, useState } from 'react';
import { Sidebar } from '../../common/components/sidebar/index.js';
import { getUserInfoAzure, getUserInfoLocal } from '../../helper/token.js';
import { SidebarData } from './SidebarData.js';
import './styles.css';

const Student = () => {
    const [username, setUsername] = useState('');
    const { accounts } = useMsal();

    useEffect(() => {
        const userInfo = getUserInfoLocal();

        if (userInfo && userInfo.username) {
            setUsername(userInfo.username);
        } else {
            const azureUserInfo = getUserInfoAzure(accounts);
            if (azureUserInfo) {
                setUsername(azureUserInfo.username);
            }
        }
    }, [accounts]);

    return (
        <div>
            <Sidebar username={username} sidebardata={SidebarData}></Sidebar>
        </div>
    );
};

export default Student;
