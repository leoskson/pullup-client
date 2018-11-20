import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light myNav">
            <div className="navbar-nav">
                <Link className='nav-item nav-link active' to='/about'>About</Link>
                <Link className='nav-item nav-link active' to='/user'>Profile</Link>
                <Link className='nav-item nav-link active' to='/'>Reservation</Link>
            </div>
            </nav>
        );
    }
}

export default Navbar;
