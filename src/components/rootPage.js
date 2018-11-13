import React, { Component } from 'react';
import { connect } from 'react-redux';

import Navbar from './navbar';
import GoogleApiWrapper from './googleMap';
import ParkinglotList from './parkinglotList';
import { fetchLocation, fetchParkinglots } from '../actions';


class RootPage extends Component {
    componentDidMount() {
        this.props.fetchLocation();
    }

    componentDidUpdate(prevProps) {
        const { latitude, longitude } = this.props.location;
        if (prevProps.location.latitude != latitude || prevProps.location.longitude != longitude) {
            this.props.fetchParkinglots(latitude, longitude);
        }
    }

    render() {
        return (
            <div>
                <Navbar />
                <GoogleApiWrapper />
                <ParkinglotList location={this.props.location} parkinglots={this.props.parkinglots}/>
            </div>
        );
    }
}

function mapStateToProps({ location, parkinglots }) {
    return { location, parkinglots };
}

export default connect(mapStateToProps, { fetchLocation, fetchParkinglots })(RootPage);
