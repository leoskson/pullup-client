import React, { Component } from 'react';

class Navbar extends Component {
    render() {
        return (
            <div className="topnav">
            <a className="active" href="/about">About</a>
            <a href="/user">Profile</a>
            <a href="/">Reservation</a>
            </div>
    );
  }
}

export default Navbar;
 

