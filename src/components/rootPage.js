import React, { Component } from 'react';

import Navbar from './navbar';
import GoogleApiWrapper from './googleMap';
import ParkinglotList from './parkinglotList';


class RootPage extends Component {
    render() {
        return (
            <div>
                <Navbar />
                <GoogleApiWrapper />
                <ParkinglotList />
            </div>
        );
    }
}

export default RootPage;
