import React, { useContext } from 'react';
import { Routes, Route, useRoutes } from 'react-router-dom';
import Advisor from "../../components/advisor";
import { UserRoles } from '../../components/enums/roles.enum';
import { AuthContext } from '../../context/Authentication';

const AdvisorLoginRoutes = () => useRoutes([
    { path: "/", element: <Advisor.Login /> },
    { path: "/login", element: <Advisor.Login /> },
])

export const AdvisorRoutes = () => {
    const { role, loggedin } = useContext(AuthContext)

    return (
        <>
            <AdvisorLoginRoutes/>
            <Routes>
                <Route path='/signup' element={<Advisor.Signup />} />
            
                {(role === UserRoles.ADVISOR && loggedin) &&
                    <>
                        <Route path='/dashboard' element={<Advisor.Dashboard />} />
                        <Route path='/requests/:status' element={<Advisor.RequestsList />} />
                    </>
                }
            </Routes>
        </>
    );
}