import React, { useContext, useLayoutEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/Authentication";
import { UserRoles } from "./enums/roles.enum";

const Navbar = () => {
  const navigate = useNavigate();
  const { removeAuthState, loggedin, getProfile, profile } = useContext(AuthContext);

  const handleLogout = (e: any) => {
    e.preventDefault();
    removeAuthState();
    navigate('/home');
  }

  useLayoutEffect(() => {
    getProfile()
  }, [loggedin])

  return (
    <nav className="navbar navbar-expand-lg fixed-top navbar-light bg-light mb-3" style={{marginTop: '50px !important'}}>
      <div className="container">
        <span className="navbar-brand fw-bold">Szabist FYP Portal</span>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse d-flex" id="navbarNav">
          <ul className="navbar-nav">
            {!loggedin && <li className="nav-item">
              <Link className="nav-link text-dark" aria-current="page" to="/home">
                Home
              </Link>
            </li>}
            {loggedin && 
            (<>
              <li className="nav-item">
                <Link className="nav-link text-dark" aria-current="page" to='/home' onClick={(e) => handleLogout(e)}>
                  Logout
                </Link>
              </li>
              {profile.role === UserRoles.ADMIN && <li className="nav-item">
                <Link className="nav-link text-dark" aria-current="page" to='/admin/dashboard'>
                  {profile.name}
                </Link>
              </li>}
              {profile.role === UserRoles.ADVISOR && <li className="nav-item">
                <Link className="nav-link text-dark" aria-current="page"  to='/advisor/dashboard'>
                  {profile.name}
                </Link>
              </li>}
              {profile.role === UserRoles.PANEL && <li className="nav-item">
                <Link className="nav-link text-dark" aria-current="page"  to='/panel/dashboard'>
                  {profile.name}
                </Link>
              </li>}
              {profile.role === UserRoles.STUDENT && <li className="nav-item">
                <Link className="nav-link text-dark" aria-current="page"  to='/student/dashboard'>
                  {profile.name}
                </Link>
              </li>}
            </>)}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export { Navbar };
