import React, { Component } from 'react';
import { connect } from 'react-redux';

import Navbar from './navbar';
import GoogleApiWrapper from './googleMap';
import ParkinglotList from './parkinglotList';
import { fetchLocation } from '../actions';


class RootPage extends Component {
    componentDidMount() {
        this.props.fetchLocation();
    }

    render() {
        return (
            <div>
                <Navbar />
                <GoogleApiWrapper />
                <ParkinglotList location={this.props.location} />
            </div>
        );
    }
}

function mapStateToProps({ location }) {
    return { location };
}

export default connect(mapStateToProps, { fetchLocation })(RootPage);
