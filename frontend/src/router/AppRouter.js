import React from 'react';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from '../components/Home/Home';
import Admin from '../components/Admin/Admin';
import Student from '../components/Student/Student';
import Information from '../components/Student/Information/Information';
import Teacher from '../components/Teacher/Teacher';
import CurriculumList from '../components/Student/Curriculum/CurriculumList';
import Login from '../components/Home/Login';
import ClassRoom from '../components/Admin/ClassRoom';
import AddModuleClass from '../components/Admin/AddModuleClass';
import ChangePassword from '../components/Home/ChangePassword';
import Logout from '../components/Home/Logout';

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/changePassword" element={<ChangePassword />}></Route>
                <Route path="/admin" element={<Admin />}>
                    <Route path="classroom" element={<ClassRoom />}/>
                    <Route path="add-module-class" element={<AddModuleClass />}/>
                </Route>
                <Route path="/student" element={<Student />}>
                    <Route path="information" element={<Information />}/>
                    <Route path="curriculum" element={<CurriculumList />}/>
                </Route>
                <Route path="/teacher" element={<Teacher />}></Route>
                <Route path="/logout" element={<Logout />}></Route>
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;