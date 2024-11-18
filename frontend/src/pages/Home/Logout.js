import { useMsal } from '@azure/msal-react';
import { Button } from 'primereact/button';
import React from 'react';
const Logout = ({ className }) => {
    const { instance } = useMsal();

    const handleAzureLogout = () => {
        instance.logoutPopup({
            postLogoutRedirectUri: '/',
            mainWindowRedirectUri: '/',
        }).then(() => {
            clearLocalStorage();
        });
    };

    const handleLocalLogout = () => {
        clearLocalStorage();
    };

    const clearLocalStorage = () => {
        localStorage.removeItem('loginMethod');
        localStorage.removeItem('role');
        localStorage.removeItem('username');
        localStorage.removeItem('token');
    };

    const handleLogout = () => {
        const loginMethod = localStorage.getItem('loginMethod');

        if (loginMethod === 'azure') {
            handleAzureLogout();
        } else {
            handleLocalLogout();
        }
    };

    return (
        <Button onClick={handleLogout} className={className}>
            Đăng xuất
        </Button>
    );
};

export default Logout;