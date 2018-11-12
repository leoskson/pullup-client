import React, { Component } from 'react';
import GoogleApiWrapper from './googleMap';
import Navbar from './navbar';

class RootPage extends Component {
    render() {
        return (
            <div>
                <Navbar />
                <GoogleApiWrapper />
            </div>
        );
    }
}

export default RootPage;
