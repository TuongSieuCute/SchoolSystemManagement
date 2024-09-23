import React from 'react';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from '../components/Home/Home';
import Login from '../components/Login/Login';
import Admin from '../components/Admin/Admin';
import Student from '../components/Student/Student';
import Information from '../components/Student/Information/Information';
import Teacher from '../components/Teacher/Teacher';
import ChangePassword from '../components/Student/Information/ChangePassword';
import CurriculumList from '../components/Student/Curriculum/CurriculumList';

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/admin" element={<Admin />}></Route>
                <Route path="/student" element={<Student />}>
                    <Route path="information" element={<Information />}/>
                    <Route path="changePassword" element={<ChangePassword />}/>
                    <Route path="curriculum" element={<CurriculumList />}/>
                </Route>
                <Route path="/teacher" element={<Teacher />}></Route>
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;