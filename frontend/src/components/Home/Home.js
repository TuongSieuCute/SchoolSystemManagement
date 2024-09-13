import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/login'); 
    };

    const handleLoginAzure = () => {
        navigate('/student');
    };

    return (
        <div>
            <button onClick={handleLogin}>Đăng nhập</button>
            <button onClick={handleLoginAzure}>Đăng nhập Azure</button>
        </div>
    );
};

export default Home;