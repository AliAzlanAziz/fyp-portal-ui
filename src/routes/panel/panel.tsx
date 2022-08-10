import React from 'react';
import { BrowserRouter as Router, Routes, Route, useRoutes } from 'react-router-dom';
import Panel from "../../components/panel";

const PanelLoginRoutes = () => useRoutes([
    { path: "/panel", element: <Panel.Login /> },
    { path: "/panel/login", element: <Panel.Login /> },
])

export const PanelRoutes = () => {
    return (
        <>
            <PanelLoginRoutes/>
            <Routes>
                <Route path='/panel/signup' element={<Panel.Signup />} />
            </Routes>
        </>
    );
}