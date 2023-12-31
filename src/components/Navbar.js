import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';



const Navbar = () => {
  let navigate = useNavigate();
  let location = useLocation();
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');    
  };

  return (
    <>
    <nav className="navbar navbar-expand-lg" style={{backgroundColor: "#7CB9E8"}}>
    <div className="container-fluid">
      <Link className="navbar-brand" to="/">
        <img src="/favicon.png" alt="logo" width="30" height="24" className="mx-2" />
        iNotes
      </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
         <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className={`nav-link ${location.pathname==='/'? "active": ""}`} aria-current="page" to="/">Home </Link>
          </li>
          <li className="nav-item">
            <Link className={`nav-link ${location.pathname==='/about'? "active": ""}`} aria-current="page" to="/about">About</Link>
          </li>
        </ul>
        {!localStorage.getItem('token') ? <form className="d-flex">
          <Link className="btn btn-success" to="/login" role="button">Login</Link>
          <Link className="btn btn-warning mx-2" to="/signup" role="button">Signup</Link>
        </form>: <button onClick={handleLogout} className="btn-btn-primary">Logout</button> }
        </div>
    </div>
    </nav>
  </>
  )
}

export default Navbar
