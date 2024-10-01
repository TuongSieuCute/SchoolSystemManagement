import React, { useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock } from "react-icons/fa";
import '../../index.css'
import './style.css'
import { useIsAuthenticated, useMsal } from '@azure/msal-react';
import { loginRequest } from "../../helper/authConfig";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const isAuthenticated = useIsAuthenticated();
    const { accounts, instance } = useMsal();

    useEffect(() => {
        if (isAuthenticated && accounts.length > 0) {
            const decodedToken = jwtDecode(accounts[0].idToken);
            handleRoleNavigation(decodedToken.role);
        }
    }, [isAuthenticated, accounts]);

    const handleAzureLogin = async () => {
        try {
            const loginResponse = await instance.loginPopup(loginRequest);

            if (loginResponse.idToken) {
                const decodedToken = jwtDecode(loginResponse.idToken);
                handleRoleNavigation(decodedToken.role);
            }
        } catch (error) {
            console.error('Azure login error:', error);
            setError('Đăng nhập bằng Azure không thành công');
        }
    };

    const handleRoleNavigation = (role) => {
        switch (role) {
            case '0':
                navigate('/admin');
                break;
            case '1':
                navigate('/teacher');
                break;
            case 'Admin':
                navigate('/admin');
                break;
            case 'Teacher':
                navigate('/teacher');
                break;
            case 'Student':
                navigate('/student');
                break;
            default:
                navigate('/student');
        }
    };

    const setUserInfo = (token) => {
        const decodedToken = jwtDecode(token);
        localStorage.setItem('token', token);
        localStorage.setItem('role', decodedToken.role);
        localStorage.setItem('username', decodedToken.username || username);
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
                setUserInfo(data.token);
                const decodedToken = jwtDecode(data.token);
                handleRoleNavigation(decodedToken.role);
            }

        } catch (err) {
            console.error('Error:', err);
            setError('Tên đăng nhập hoặc mật khẩu không chính xác!');
        }
    };

    return (
        <div className='container'>
            <div className='login-container'>
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
                    <p class="or">--- or ---</p>
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