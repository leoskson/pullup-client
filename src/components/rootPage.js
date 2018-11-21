import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Navbar from './navbar';
import GoogleApiWrapper from './googleMap';
import ParkinglotList from './parkinglotList';
import ParkinglotDetail from './parkinglotDetail';
import SpotSchedule from './spotSchedule';
import { fetchLocation, fetchParkinglots, fetchSpots } from '../actions';

class RootPage extends Component {
    componentDidMount() {
        const { latitude, longitude } = this.props.location;
        const { config } = this.props;
        if (config.headers) {
            this.props.fetchLocation();
            this.props.fetchParkinglots(latitude, longitude, config);
        }
    }

    componentDidUpdate(prevProps) {
        const { latitude, longitude } = this.props.location;
        const { config } = this.props;
        if (this.props.location !== prevProps.location) {
            this.props.fetchParkinglots(latitude, longitude, config);
        }
        if (this.props.activeParkinglot !== prevProps.activeParkinglot) {
            this.props.fetchSpots(this.props.parkinglots[this.props.activeParkinglot].spots, config);
        }
    }

    render() {
        const { config } = this.props;
        if (!config.headers) {
            return <Redirect to='/login' />
        }
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

function mapStateToProps({ location, parkinglots, activeParkinglot, spots, reservations, user, config }) {
    return { location, parkinglots, activeParkinglot, spots, reservations, user, config };
}

export default connect(mapStateToProps, { fetchLocation, fetchParkinglots, fetchSpots })(RootPage);
