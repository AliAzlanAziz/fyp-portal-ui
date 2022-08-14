import React, { useContext } from 'react';
import { Routes, Route, useRoutes } from 'react-router-dom';
import Admin from "../../components/admin";
import { UserRoles } from '../../components/enums/roles.enum';
import { AuthContext } from '../../context/Authentication';

const AdminLoginRoutes = () => useRoutes([
    { path: "/", element: <Admin.Login /> },
    { path: "/login", element: <Admin.Login /> },
])

export const AdminRoutes = () => {
    const { role, loggedin } = useContext(AuthContext)

    return (
        <>
            <AdminLoginRoutes/>
            <Routes>
                <Route path='/signup' element={<Admin.Signup />} />

                {(role === UserRoles.ADMIN && loggedin) &&
                    <>
                        <Route path='/dashboard' element={<Admin.Dashboard />} />
                        <Route path='/students' element={<Admin.StudentsList />} />
                        <Route path='/advisors' element={<Admin.AdvisorsList />} />
                    </>
                }
            </Routes>
        </>
    );
}