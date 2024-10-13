import React from 'react';
import { Link } from 'react-router-dom';
import { useMsal } from '@azure/msal-react';

const Logout = () => {
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
        <Link to="/" onClick={handleLogout} replace>
            <li>Đăng xuất</li>
        </Link>
    );
};

export default Logout;