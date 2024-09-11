import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../components/Home/Home';
import Login from '../components/Login/Login';
import Admin from '../components/Admin/Admin';
import Student from '../components/Student/Student';
import Teacher from '../components/Teacher/Teacher';

const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path='/admin' element={<Admin />}></Route>
                <Route path='/student' element={<Student />}></Route>
                <Route path='/teacher' element={<Teacher />}></Route>
            </Routes>
        </Router>
    );
};

export default AppRouter;