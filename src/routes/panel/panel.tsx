import React from 'react';
import {Routes, Route, useRoutes } from 'react-router-dom';
import Panel from "../../components/panel";

const PanelLoginRoutes = () => useRoutes([
    { path: "/", element: <Panel.Login /> },
    { path: "/login", element: <Panel.Login /> },
])

export const PanelRoutes = () => {
    return (
        <>
            <PanelLoginRoutes/>
            <Routes>
                <Route path='/signup' element={<Panel.Signup />} />
            </Routes>
        </>
    );
}