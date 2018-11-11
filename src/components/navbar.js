import React, { Component } from 'react';

class Navbar extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="navbar-nav">
            <a className="nav-item nav-link active" href="#">About</a>
            <a className="nav-item nav-link active" href="#">Profile</a>
            <a className="nav-item nav-link active" href="#">Reservation</a>
            </div>
            </nav>
        );
    }
}

export default Navbar;
