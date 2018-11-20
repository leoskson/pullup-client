import React, { Component } from 'react';
import { connect } from 'react-redux';

import Navbar from './navbar';
import GoogleApiWrapper from './googleMap';
import ParkinglotList from './parkinglotList';
import ParkinglotDetail from './parkinglotDetail';
import SpotSchedule from './spotSchedule';
import { fetchLocation, fetchParkinglots, fetchSpots } from '../actions';

class RootPage extends Component {
    componentDidMount() {
        const { latitude, longitude } = this.props.location;
        this.props.fetchLocation();
    }

    componentDidUpdate(prevProps) {
        const { latitude, longitude } = this.props.location;
        if (this.props.location !== prevProps.location) {
            this.props.fetchParkinglots(latitude, longitude);
        }
        if (this.props.activeParkinglot !== prevProps.activeParkinglot) {
            this.props.fetchSpots(this.props.parkinglots[this.props.activeParkinglot].spots);
        }
    }

    render() {
        return (
            <div>
                <Navbar />
                <GoogleApiWrapper />
                <ParkinglotList />
                <ParkinglotDetail />
                <SpotSchedule />
            </div>
        );
    }
}

function mapStateToProps({ location, parkinglots, activeParkinglot, spots, reservations }) {
    return { location, parkinglots, activeParkinglot, spots, reservations };
}

export default connect(mapStateToProps, { fetchLocation, fetchParkinglots, fetchSpots })(RootPage);
