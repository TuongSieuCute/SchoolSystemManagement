import React, { useState } from 'react';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRoleNavigation = (role) => {
        switch (role) {
            case '0':
                navigate('/admin');
                break;
            case '1':
                navigate('/student');
                break;
            default:
                navigate('/teacher');
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
            const response = await fetch('http://localhost:5065/Account/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
            });

            const data = await response.json();

            if (response.ok) {
                alert(data.message);
                setUserInfo(data.token);
                const decodedToken = jwtDecode(data.token);
                handleRoleNavigation(decodedToken.role);
            } else {
                setError(data.message || 'Đăng nhập thất bại');
            }
        } catch (err) {
            console.error('Error:', err);
            setError('Có lỗi xảy ra, vui lòng thử lại!');
        }
    };
    
    return (
        <div>
            <h2>Đăng nhập</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Tên đăng nhập:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Mật khẩu:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Đăng nhập</button>
            </form>
        </div>
    );
};

export default Login;