import React from 'react';
import { BrowserRouter as Router, Routes, Route, useRoutes } from 'react-router-dom';
import Student from "../../components/student";

const StudentLoginRoutes = () => useRoutes([
    { path: "/student", element: <Student.Login /> },
    { path: "/student/login", element: <Student.Login /> },
])

export const StudentRoutes = () => {
    return (
        <>
            <StudentLoginRoutes/>
            <Routes>
                <Route path='/student/signup' element={<Student.Signup />} />
                <Route path='/student/dashboard' element={<Student.Dashboard />} />
                <Route path='/student/advisors' element={<Student.AdvisorsList />} />
            </Routes>
        </>
    );
}