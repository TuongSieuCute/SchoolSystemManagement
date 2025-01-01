import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from '@azure/msal-react';
import { Button } from 'primereact/button';
import React, { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { scopes } from '../../../helper/authConfig';
import { getName } from './../../sevices/authService';
import './styles.css';
export const AppHeader = () => {
    const { accounts, instance } = useMsal();
    const [ username, setUsername] = useState('');
    const navigate = useNavigate();
    const getLinkBaseOnRole = useCallback((role) => {
        switch (role) {
        case 'Admin':
            return '/admin';
        case 'Teacher':
            return '/teacher';
        default:
            return '/student';
        }
    }, []);
    useEffect(() => {
        if (!accounts?.length) {
            return;
        }
        setUsername(getName());
    }, [accounts]);

    const handleRoleNavigation = useCallback((role) => {
        navigate(getLinkBaseOnRole(role));
    }, [navigate]);

    const handleAzureLogin = async () => {
        try {
            const loginResponse = await instance.loginPopup(scopes.microsoft);
            if (loginResponse.account && loginResponse.idTokenClaims.roles?.length) {
                handleRoleNavigation(loginResponse.idTokenClaims.roles[0]);
            }
        } catch (error) {
            console.error('Azure login error:', error);
        }
    };
    return (
        <div className="app-header flex justify-content-between p-3">
            <div className="flex align-items-center gap-3">
                <img
                    src="public/images/logoHcmue.png"
                    className="image-logo "
                    alt="logo"
                />
                <Link to="" className="font-bold text-lg no-underline">
                    Trang Chủ
                </Link>
                <Link to="" className="font-bold text-lg no-underline">
                    Giới Thiệu
                </Link>

                <Link to="" className="font-bold text-lg no-underline">
                    Tuyển sinh
                </Link>
                <Link to="" className="font-bold text-lg no-underline">
                    Đào tạo
                </Link>
            </div>
            <div className="flex align-items-center">
                <UnauthenticatedTemplate>
                    <Button onClick={handleAzureLogin} label='Đăng nhập' className='btn-login' />
                </UnauthenticatedTemplate>
                <AuthenticatedTemplate>
                    <Link to={getLinkBaseOnRole(accounts[0]?.idTokenClaims.roles?.[0])} className='no-underline'>
                        {username}
                    </Link>
                </AuthenticatedTemplate>
            </div>
        </div>
    );
};
