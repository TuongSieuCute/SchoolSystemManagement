import { useMsal } from '@azure/msal-react';
import React, { useEffect, useState } from 'react';
import { Sidebar } from '../../common/components/sidebar/index.js';
import { getUserInfoAzure } from '../../helper/token.js';
import { SidebarData } from './SidebarData.js';
const Admin = () => {
    const [username, setUsername] = useState('');
    const { accounts } = useMsal();

    useEffect(() => {
        const azureUserInfo = getUserInfoAzure(accounts);
        if (azureUserInfo) {
            setUsername(azureUserInfo.username);
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