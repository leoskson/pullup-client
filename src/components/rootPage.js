import React, { Component } from 'react';
import { connect } from 'react-redux';

import Navbar from './navbar';
import GoogleApiWrapper from './googleMap';
import ParkinglotList from './parkinglotList';
import ParkinglotDetail from './parkinglotDetail';
import SpotSchedule from './spotSchedule';
import { fetchLocation, fetchParkinglots, fetchSpots } from '../actions';
import { Tabs, Tab } from 'react-bootstrap';

class RootPage extends Component {
    
    componentDidMount() {
        const { latitude, longitude } = this.props.location;
        this.props.fetchLocation();
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

        return (
            <div className='appContainer'>
                <Navbar />
                <GoogleApiWrapper />
                <Tabs defaultActiveKey={1} id="uncontrolled-tab-example" >
                    <Tab eventKey={1} title="Parking Lots">
                        <ParkinglotList />
                    </Tab>
                    <Tab eventKey={2} title="Spots">
                        <ParkinglotDetail />
                    </Tab>
                    <Tab eventKey={3} title="Schedule">
                        <SpotSchedule />
                    </Tab>
                    <Tab eventKey={4} title="Payment">
                        
                    </Tab>
                </Tabs>
            </div>
        );
    }

    changeTabState(state) {
        this.setState({ heading: state });
    }
}


function mapStateToProps({ location, parkinglots, activeParkinglot, spots, reservations, user, config }) {
    return { location, parkinglots, activeParkinglot, spots, reservations, user, config };
}

export default connect(mapStateToProps, { fetchLocation, fetchParkinglots, fetchSpots })(RootPage);
