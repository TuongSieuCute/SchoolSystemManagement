import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <button>
                <Link to="/login">Đăng nhập</Link>
            </button>
        </div>
    );
};

export default Home;