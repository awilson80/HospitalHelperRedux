import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../img/logo.png';

export const Navbar = () => {
    return (
        <nav className='navbar'>
            <Link to='/'>
                <img src={logo} alt='logo' className='navbar-logo' />
            </Link>
            <h1 className='navbar-title'>Hospital Helper</h1>
        </nav>
    );
};
