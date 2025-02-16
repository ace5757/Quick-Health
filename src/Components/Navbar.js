import React from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom";

function Navbar() {
    let location = useLocation();
    const navigate = useNavigate()
    const handleLogout = () => {
        localStorage.removeItem('token')
        navigate('/login')
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">
                        <img src={require("../images/icons8-samsung-health-240.png")} alt="Bootstrap" width="30" height="30" />
                    </Link>
                    <Link className="navbar-brand" to="/">Health-App</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/' ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/about' ? "active" : ""}`} aria-current="page" to="/about">About</Link>
                            </li>

                        </ul>
                        {!localStorage.getItem('token') ? <form className="d-flex" role="search">
                            <Link className="btn btn-primary mx-1" to='/login' role='button'>Login</Link>
                            <Link className="btn btn-primary mx-1" to='/signup' role='button'>Signup</Link>

                        </form> : <button className='btn btn-primary mx1' onClick={handleLogout} role='button'>Logout</button>}

                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
