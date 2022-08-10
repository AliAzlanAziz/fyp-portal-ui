import React from 'react';
import { BrowserRouter as Router, Routes, Route, useRoutes } from 'react-router-dom';
import Advisor from "../../components/advisor";

const AdvisorLoginRoutes = () => useRoutes([
    { path: "/advisor", element: <Advisor.Login /> },
    { path: "/advisor/login", element: <Advisor.Login /> },
])

export const AdvisorRoutes = () => {
    return (
        <>
            <AdvisorLoginRoutes/>
            <Routes>
                <Route path='/advisor/signup' element={<Advisor.Signup />} />
                <Route path='/advisor/dashboard' element={<Advisor.Dashboard />} />
                <Route path='/advisor/requests/:status' element={<Advisor.RequestsList />} />
            </Routes>
        </>
    );
}