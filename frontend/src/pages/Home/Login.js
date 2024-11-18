import { useIsAuthenticated, useMsal } from '@azure/msal-react';
import { jwtDecode } from 'jwt-decode';
import React, { useCallback, useEffect, useState } from 'react';
import { FaLock, FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { scopes } from '../../helper/authConfig';
import './styles.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const isAuthenticated = useIsAuthenticated();
    const { accounts, instance } = useMsal();

    const handleRoleNavigation = useCallback((role) => {
        switch (role) {
        case '0':
        case 'Admin':
            navigate('/admin');
            break;
        case '1':
        case 'Teacher':
            navigate('/teacher');
            break;
        default:
            navigate('/student');
        }
    }, [navigate]);

    const setUserInfoAzure = (role, username) => {
        localStorage.setItem('loginMethod', 'azure');
        localStorage.setItem('role', role);
        localStorage.setItem('username', username);
    };

    useEffect(() => {
        if (isAuthenticated && accounts.length > 0) {

            const roles = accounts[0]?.idTokenClaims?.roles || [];

            if (roles.length > 0) {
                handleRoleNavigation(roles[0]);
            }
        }
    }, [isAuthenticated, accounts, handleRoleNavigation]);

    const handleAzureLogin = async () => {
        try {
            const loginResponse = await instance.loginPopup(scopes);

            if (loginResponse.account) {

                const roles = loginResponse.account.idTokenClaims?.roles || [];
                const username = loginResponse.account.username;

                if (roles.length > 0) {
                    setUserInfoAzure(roles[0], username);
                    handleRoleNavigation(roles[0]);
                }
            }
        } catch (error) {
            console.error('Azure login error:', error);
            setError('Đăng nhập bằng Azure không thành công');
        }
    };

    const setUserInfoLocal = (token) => {
        const decodedToken = jwtDecode(token);
        localStorage.setItem('token', token);
        localStorage.setItem('role', decodedToken.role);
        localStorage.setItem('username', decodedToken.username || username);
        localStorage.setItem('loginMethod', 'local');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const loginData = { UserName: username, PasswordHash: password };

        try {
            const response = await fetch('http://localhost:5065/api/Account/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
            });

            const data = await response.json();

            if (response.ok) {
                setUserInfoLocal(data.token);
                const decodedToken = jwtDecode(data.token); // Giải mã Token
                handleRoleNavigation(decodedToken.role);
            }

        } catch (err) {
            console.error('Error:', err);
            setError('Tên đăng nhập hoặc mật khẩu không chính xác!');
        }
    };

    return (
        <div className='login-container'>
            <div className='login-box'>
                <div className='login-image'>
                    <img src='/Images/login.png' alt='hcmue' />
                </div>
                <div className='login-form'>
                    <form onSubmit={handleSubmit}>
                        <h1>Đăng nhập</h1>
                        <div className='login-input'>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                            <label>Tên đăng nhập</label>
                            <FaUser className='login-icon' />
                        </div>
                        <div className='login-input'>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <label>Mật khẩu</label>
                            <FaLock className='login-icon' />
                        </div>
                        {error && <p className='error'>{error}</p>}
                        <button type="submit">Đăng nhập</button>
                    </form>
                    <p className="or">--- or ---</p>
                    <button className='button-microsoft' onClick={handleAzureLogin}>
                        <img src='/Images/icon-microsoft.svg' alt='icon microsoft' />
                        <span className='text-microsoft'>Đăng nhập bằng Microsoft</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;