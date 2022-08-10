import React from 'react';
import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom';
import '../styling/shared.css';

const Home = () => {
  return (
    <div className="jumbotron jumbotron-fluid">
      <div className="container">
          <div className="row">
            <div className="col-lg-12 d-flex align-items-center justify-content-center">
              <Link to="/student" className='col-lg-3 btn btn-dark border-rounded-5 mx-3 shadow-lg'>
                Student
              </Link>
              <Link to="/advisor" className='col-lg-3 btn btn-primary border-rounded-5 mx-3 shadow-lg'>
                Advisor
              </Link>
              <Link to="/panel" className='col-lg-3 btn btn-info border-rounded-5 mx-3 shadow-lg'>
                Panel
              </Link>
              <Link to="/admin" className='col-lg-3 btn btn-light border-rounded-5 mx-3 shadow-lg'>
                Admin
              </Link>
            </div>
          </div>
      </div>
    </div>
  );
}

export { Home };
