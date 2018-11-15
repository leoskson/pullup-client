import React, { Component } from 'react';
import { connect } from 'react-redux';

import Navbar from './navbar';
import GoogleApiWrapper from './googleMap';
import ParkinglotList from './parkinglotList';
import ParkinglotDetail from './parkinglotDetail';
import { fetchLocation, fetchParkinglots, fetchSpots } from '../actions';

class RootPage extends Component {
    componentDidMount() {
        const { latitude, longitude } = this.props.location;
        this.props.fetchParkinglots(latitude, longitude);
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
        const parkinglot = this.props.parkinglots[this.props.activeParkinglot];
        return (
            <div>
                <Navbar />
                <GoogleApiWrapper location={this.props.location} parkinglots={this.props.parkinglots} />
                <ParkinglotList location={this.props.location} parkinglots={this.props.parkinglots}/>
                <ParkinglotDetail parkinglot={parkinglot} spots={this.props.spots} />
            </div>
        );
    }
}

function mapStateToProps({ location, parkinglots, activeParkinglot, spots }) {
    return { location, parkinglots, activeParkinglot, spots };
}

export default connect(mapStateToProps, { fetchLocation, fetchParkinglots, fetchSpots })(RootPage);
