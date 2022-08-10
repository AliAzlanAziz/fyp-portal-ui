import React from 'react';
import { BrowserRouter as Router, Routes, Route, useRoutes } from 'react-router-dom';
import Admin from "../../components/admin";

const AdminLoginRoutes = () => useRoutes([
    { path: "/admin", element: <Admin.Login /> },
    { path: "/admin/login", element: <Admin.Login /> },
])

export const AdminRoutes = () => {
    return (
        <>
            <AdminLoginRoutes/>
            <Routes>
                <Route path='/admin/signup' element={<Admin.Signup />} />
                <Route path='/admin/signup' element={<Admin.Signup />} />
            </Routes>
        </>
    );
}