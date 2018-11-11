import React, { Component } from 'react';

class Navbar extends Component {
    click(event) {
        event.preventDefault();
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="navbar-nav">
            <a className="nav-item nav-link active" href="" onClick={this.click}>About</a>
            <a className="nav-item nav-link active" href="" onClick={this.click}>Profile</a>
            <a className="nav-item nav-link active" href="" onClick={this.click}>Reservation</a>
            </div>
            </nav>
        );
    }
}

export default Navbar;
