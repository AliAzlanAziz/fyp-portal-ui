import React, { useContext } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Basic from '../components/index';
import { HomeRoutes } from './common/common';
import { StudentRoutes } from './student/student';
import { AdminRoutes } from './admin/admin';
import { AdvisorRoutes } from './advisor/advisor';
import { PanelRoutes } from './panel/panel';
import { AuthContext } from '../context/Authentication';
import { UserRoles } from '../components/enums/roles.enum';


const Main = () => {
  const { role, loggedin } = useContext(AuthContext);

  return (
    <Router>
      <Basic.Navbar />
      {(role === UserRoles.NONE || !loggedin) && <HomeRoutes />}
      <AdminRoutes /> 
      <AdvisorRoutes />
      <PanelRoutes />
      <StudentRoutes />
    </Router>
  );
}

export default Main;
