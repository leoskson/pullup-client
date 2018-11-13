import React, { Component } from 'react';
import { connect } from 'react-redux';

import Navbar from './navbar';
import GoogleApiWrapper from './googleMap';
import ParkinglotList from './parkinglotList';
import ParkinglotDetail from './parkinglotDetail';
import { fetchLocation, fetchParkinglots } from '../actions';

class RootPage extends Component {
    componentDidMount() {
        this.props.fetchLocation();
    }

    componentDidUpdate(prevProps) {
        const { latitude, longitude } = this.props.location;
        if (this.props.location !== prevProps.location) {
            this.props.fetchParkinglots(latitude, longitude);
        }
    }

    render() {
        const parkinglot = this.props.parkinglots[this.props.activeParkinglot];
        return (
            <div>
                <Navbar />
                <GoogleApiWrapper location={this.props.location} parkinglots={this.props.parkinglots} />
                <ParkinglotList location={this.props.location} parkinglots={this.props.parkinglots}/>
                <ParkinglotDetail parkinglot={parkinglot} />
            </div>
        );
    }
}

function mapStateToProps({ location, parkinglots, activeParkinglot }) {
    return { location, parkinglots, activeParkinglot };
}

export default connect(mapStateToProps, { fetchLocation, fetchParkinglots })(RootPage);
