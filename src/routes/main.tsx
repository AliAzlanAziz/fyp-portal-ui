import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Basic from '../components/index';
import { HomeRoutes } from './common/common';
import { StudentRoutes } from './student/student';
import { AdminRoutes } from './admin/admin';
import { AdvisorRoutes } from './advisor/advisor';
import { PanelRoutes } from './panel/panel';
import { AuthContext } from '../context/Authentication';
import { UserRoles } from '../components/enums/roles.enum';


const Main = () => {
  const { role, loggedin, profile } = useContext(AuthContext);

  return (
    <Router>
      <Basic.Navbar />
      <Routes>
        {
          (
            (profile.role !== undefined && profile.role !== null && profile.role === UserRoles.NONE) 
            || (role === UserRoles.NONE || !loggedin)
          ) &&
            <Route path='/*' element={<HomeRoutes />} />
        }
        <Route path='/admin/*' element={<AdminRoutes /> } />
        <Route path='/advisor/*' element={<AdvisorRoutes /> } />
        <Route path='/panel/*' element={<PanelRoutes /> } />
        <Route path='/student/*' element={<StudentRoutes /> } />
      </Routes>
    </Router>
  );
}

export default Main;
