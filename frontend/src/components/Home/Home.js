import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/login'); 
    };

    return (
        <div>
            <button onClick={handleLogin}>Đăng nhập</button>
        </div>
    );
};

export default Home;