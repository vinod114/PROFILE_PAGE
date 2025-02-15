import React from "react";
import NKRLOGO from "../media/images/LOGO_ORIGINAL.png";
import PHONE from '../media/images/phone-call.png';
import PROFILE from '../media/images/user.png';
import '../Styles/header.css';

function Header() {
  return (
    <nav className="navbar navbar-expand-md navbar-light bg-white shadow-sm">
      <div className="container">
        <a className="navbar-brand mx-auto mx-md-0" href="/">
          <img src={NKRLOGO} alt="NKR Logo" height="80" className="nkr-logo" />
        </a>
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
        <div className="collapse navbar-collapse justify-content-md-end text-center" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <div className="d-flex align-items-center gap-2">
              <a className="nav-link" href="/become-a-member">
                Become a Member
              </a>
              </div>
              
            </li>
            <li className="nav-item">
              <div  className="d-flex align-items-center gap-2">

              <a className="nav-link" href="/contact">
                Contact Us
              </a>
              </div>
            </li>
            <li className="nav-item">
              <div className="d-flex align-items-center gap-2">
              <img src={PHONE} height={20} width={20}></img>
              <a className="nav-link" href="/help">
                Help
              </a>
              </div>
             
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle d-flex align-items-center"
                href="#"
                id="accountDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <div className="d-flex align-items-center gap-2">
                <img src={PROFILE} height={20} width={20}></img>
<span>Login/SignUp</span>
                </div>
              </a>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="accountDropdown">
                <li>
                  <a className="dropdown-item" href="/login">
                    <i className="bi bi-box-arrow-in-right me-1"></i> Login
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/register">
                    <i className="bi bi-person-plus me-1"></i> Sign Up
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
