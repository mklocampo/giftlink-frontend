import React, { useEffect }  from 'react';

import { NavLink, Link, useNavigate } from 'react-router-dom'
//import {urlConfig} from '../../config';
import { useAppContext } from '../../context/AuthContext';

export default function Navbar() {

    const { isLoggedIn, setIsLoggedIn, userName, setUserName } = useAppContext();

    const navigate=useNavigate();
    useEffect(() => {
        const authTokenFromSession = sessionStorage.getItem('auth-token');
        const nameFromSession = sessionStorage.getItem('name');
        if (authTokenFromSession) {
            if(isLoggedIn && nameFromSession) {
              setUserName(nameFromSession);
            } else {
              sessionStorage.removeItem('auth-token');
              sessionStorage.removeItem('name');
              sessionStorage.removeItem('email');
              setIsLoggedIn(false);
            }
        }
    },[isLoggedIn, setIsLoggedIn, setUserName])
    
    const handleLogout=()=>{
        sessionStorage.removeItem('auth-token');
        sessionStorage.removeItem('name');
        sessionStorage.removeItem('email');
        setIsLoggedIn(false);
        navigate(`/`);
    }


    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="navbar-brand">
                <a className="nav-link" href={`${process.env.PUBLIC_URL}/`}>
                    <img src={process.env.PUBLIC_URL + '/images/gifts.png'} ></img>
                    <label>GiftLink</label>
                </a>       
            </div>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    {/* Task 1: Add links to Home and Gifts below*/}
                    <li className="nav-item">
                        <a className="nav-link" href={`${process.env.PUBLIC_URL}/home.html`}>Home</a>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/">Gifts</NavLink>
                    </li>
                    <li className="nav-item">
	                    <NavLink className="nav-link" to="/search">Search</NavLink>
                    </li>
                    <ul className="navbar-nav ml-auto">
                        {isLoggedIn ? (
                            <>
                                <li className="nav-item">  
                                    <NavLink className="nav-link profile" to="/profile">Welcome, {userName}</NavLink>
                                </li>
                                <li className="nav-item">
                                    <button className="nav-link" onClick={handleLogout}>Logout</button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/login">Login</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/register">Register</NavLink>
                                </li>
                            </>
                        )
                        }
                    </ul>
                </ul>
            </div>
        </nav>
    );
}
