import React, { useState } from 'react';
import { getUserInfoLocal } from '../../helper/token';
import { useNavigate } from 'react-router-dom';

const ChangePassword = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [againNewPassword, setAgainNewPassword] = useState('');
    const [error, setError] = useState('');

    const username = getUserInfoLocal().username;
    const navigate = useNavigate();

    const handleChangePassword = async (e) => {
        e.preventDefault();

        const setErrorAndReturn = (message) => {
            setError(message);
            return;
        };

        if (newPassword !== againNewPassword) {
            setErrorAndReturn('Mật khẩu mới không khớp. Vui lòng kiểm tra lại.');
            return;
        }

        if (oldPassword === newPassword) {
            setErrorAndReturn('Mật khẩu mới không thể trùng với mật khẩu cũ.');
            return;
        }

        const ChangePasswordData = { UserName: username, PasswordHash: oldPassword, NewPassword: newPassword };

        try {
            const response = await fetch('http://localhost:5065/api/Account/changePassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(ChangePasswordData),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.removeItem('token');
                localStorage.removeItem('role');
                localStorage.removeItem('username');
                alert(data.message);
                navigate('/login');
            } else {
                setError(data.message || 'Đổi mật khẩu thất bại');
            }
        } catch (err) {
            console.error('Error:', err);
            setError('Có lỗi xảy ra, vui lòng thử lại!');
        }
    };

    return (
        <div>
            <h2>Đổi mật khẩu</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleChangePassword}>
                <div>
                    <label>Tên đăng nhập:</label>
                    <label>{username}</label>
                </div>
                <div>
                    <label>Nhập mật khẩu cũ:</label>
                    <input
                        type="password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Nhập mật khẩu mới:</label>
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Nhập mật khẩu mới lần nữa:</label>
                    <input
                        type="password"
                        value={againNewPassword}
                        onChange={(e) => setAgainNewPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Đổi mật khẩu</button>
            </form>
        </div>
    );
};

export default ChangePassword;