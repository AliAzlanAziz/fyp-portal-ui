import React, { useContext } from 'react';
import { Routes, Route, useRoutes } from 'react-router-dom';
import { UserRoles } from '../../components/enums/roles.enum';
import Student from "../../components/student";
import { AuthContext } from '../../context/Authentication';

const StudentLoginRoutes = () => useRoutes([
    { path: "/", element: <Student.Login /> },
    { path: "/login", element: <Student.Login /> },
])

export const StudentRoutes = () => {
    const { profile, loggedin } = useContext(AuthContext)

    return (
        <>
            <StudentLoginRoutes/>
            <Routes>
                <Route path='/signup' element={<Student.Signup />} />

                {(profile && profile.role == UserRoles.STUDENT && loggedin) &&
                    <>
                        <Route path='/dashboard' element={<Student.Dashboard />} />
                        <Route path='/advisors' element={<Student.AdvisorsList />} />
                        <Route path='/requests/:status' element={<Student.RequestsList />} />
                    </>
                }
            </Routes>
        </>
    );
}