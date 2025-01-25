import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Admin from './pages/Admin';
import ClassRoom from './pages/Admin/ClassRoom';
import ModuleClass from './pages/Admin/ModuleClass';
import Home from './pages/Home';
import Student from './pages/Student';
import InstructionalPlan from './pages/Student/InstructionalPlan';
import RegisterModule from './pages/Student/RegisterModule/RegisterModule';
import SelectGrades from './pages/Student/SelectGrades';
import TimeTable from './pages/Student/TimeTable';
import Money from './pages/Student/Money';
import TimeTableTeacher from './pages/Teacher/TimeTableTeacher';
import Teacher from './pages/Teacher';
import Grades from './pages/Teacher/Grades';
import TeachingRegistration from './pages/Teacher/TeachingRegistration';
import { User } from './pages/User';
import Notification from './pages/Admin/Notification';

export const router = createBrowserRouter([
    { path: '/', element: <Home /> },
    {
        path: '/admin', element: <Admin />,
        children: [
            { path: '', index: true, element: <User /> },
            { path: 'classroom', index: true, element: <ClassRoom />, },
            { path: 'moduleClass', element: <ModuleClass />, },
            { path: 'notification', element: <Notification />, }
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
            { path: 'registermodule', element: <RegisterModule /> }
        ]
    },
    {
        path: '/teacher', element: <Teacher />,
        children: [
            { path: '', index: true, element: <User /> },
            { path: 'timetable', element: <TimeTableTeacher /> },
            { path: 'teaching-registration', element: <TeachingRegistration /> },
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
