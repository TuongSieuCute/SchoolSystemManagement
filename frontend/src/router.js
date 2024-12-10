import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Admin from './pages/Admin';
import ClassRoom from './pages/Admin/ClassRoom';
import ModuleClass from './pages/Admin/ModuleClass';
import Home from './pages/Home';
import ChangePassword from './pages/Home/ChangePassword';
import Login from './pages/Home/Login';
import Student from './pages/Student';
import InstructionalPlan from './pages/Student/InstructionalPlan';
import RegisterModule from './pages/Student/RegisterModule/RegisterModule';
import RegisterModuleDetail from './pages/Student/RegisterModule/RegisterModuleDetail';
import SelectGrades from './pages/Student/SelectGrades';
import TimeTable from './pages/Student/TimeTable';
import Money from './pages/Student/Money';
import { default as Teacher, default as TeachingRegistrationDetail } from './pages/Teacher';
import Grades from './pages/Teacher/Grades';
import TeachingRegistration from './pages/Teacher/TeachingRegistration';
import { User } from './pages/User';

export const router = createBrowserRouter([
    { path: '/', element: <Home /> },
    { path: '/login', element: <Login /> },
    { path: '/changePassword', element: <ChangePassword /> },
    {
        path: '/admin', element: <Admin />,
        children: [
            { path: '', index: true, element: <User /> },
            { path: 'classroom', index: true, element: <ClassRoom />, },
            { path: 'moduleClass', element: <ModuleClass />, }
        ]
    },
    {
        path: '/student', element: <Student />,
        children: [
            { path: '', index: true, element: <User />, },
            { path: 'instructionalplan', element: <InstructionalPlan /> },
            { path: 'grades', element: <SelectGrades /> },
            { path: 'timetable', element: <TimeTable /> },
            { path: 'tuition', element: <Money /> },
            { path: 'registermodule', element: <RegisterModule /> },
            { path: 'register-module-detail', element: <RegisterModuleDetail /> },
        ]
    },
    {
        path: '/teacher', element: <Teacher />,
        children: [
            { path: '', index: true, element: <User /> },
            { path: 'teaching-registration', element: <TeachingRegistration /> },
            { path: 'teaching-registration-detail', element: <TeachingRegistrationDetail /> },
            { path: 'grades', element: <Grades /> },
        ]
    },
], {
    future: {
        v7_fetcherPersist: true,
        v7_partialHydration: true,
        v7_skipActionErrorRevalidation: true,
        v7_relativeSplatPath: true,
        v7_startTransition: true,
        v7_normalizeFormMethod: true
    }
});
