import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginButton } from './LoginButton';
import { AuthenticatedTemplate, UnauthenticatedTemplate, useIsAuthenticated, useMsal } from '@azure/msal-react';
import { LogOutButton } from './LogoutButton';
const Home = () => {
    const navigate = useNavigate();
    const isAuthenticated = useIsAuthenticated();
    const { accounts } = useMsal();
    const handleLogin = () => {
        navigate('/login');
    };
    return (
        <>
            <div>
                <button onClick={handleLogin}>Đăng nhập</button>
                {/* {!isAuthenticated ? <LoginButton /> : <LogOutButton />} */}
            </div>

            <AuthenticatedTemplate>
                {accounts[0]?.idTokenClaims.roles}
            </AuthenticatedTemplate>
            <UnauthenticatedTemplate>

            </UnauthenticatedTemplate>
        </>
    );
};

export default Home;