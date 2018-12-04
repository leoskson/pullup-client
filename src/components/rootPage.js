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
    state = {
        defaultActiveKey: 1,
        floor: 1
    }

    componentDidMount() {
        const { latitude, longitude } = this.props.location;
        const { config } = this.props;
        // if (config.headers) {
        //     if (!latitude || !longitude) {
        //         this.props.fetchLocation();
        //     }
        // }
        this.props.fetchLocation();
        this.interval = setInterval(() => {
            this.refreshSpots();
            this.setState({ time: Date.now() })
        }, 3000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
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

    refreshSpots() {
        const { config } = this.props;
        if (this.props.parkinglots[this.props.activeParkinglot]) {
            this.props.fetchSpots(this.props.parkinglots[this.props.activeParkinglot].spots, config);
        }
    }

    render() {
        const { config, parkinglots, location } = this.props;
        if (!config.headers) {
            return <Redirect to='/login' />
        }
        if (Object.keys(parkinglots).length == 0 || !location.longitude) {
            return (
                <div>Loading</div>
            );
        }
        // return (
        //     <div>
        //         <Navbar />
        //         <GoogleApiWrapper />
        //         <ParkinglotList />
        //         <ParkinglotDetail />
        //         <SpotSchedule />
        //     </div>

        // );
        return (
            <div className='appContainer'>
                <Navbar />
                <GoogleApiWrapper />
                <Tabs activeKey={this.state.defaultActiveKey} onSelect={this.changeActiveState} id="uncontrolled-tab-example" >
                    <Tab eventKey={1} onClick={() => this.changeFloorStatus(1)} title="Parking Lots">
                        <ParkinglotList onChangeState={(key) => this.changeActiveState(key)}/>
                    </Tab>
                    <Tab eventKey={2} title="Spots">
                        <ParkinglotDetail onChangeState={(key) => this.changeActiveState(key)} floor={this.state.floor} onChangeFloor={(floor) => this.changeFloorStatus(floor)}/>
                    </Tab>
                    <Tab eventKey={3} title="Schedule">
                        <SpotSchedule />
                    </Tab>
                </Tabs>
            </div>
        );
    }
    changeFloorStatus = (floor) => {
        this.setState({
            floor: floor
        })
    }
    changeActiveState = (key) => {
        this.setState({
            defaultActiveKey: key
        })
    }
}


function mapStateToProps({ location, parkinglots, activeParkinglot, spots, reservations, user, config }) {
    return { location, parkinglots, activeParkinglot, spots, reservations, user, config };
}

export default connect(mapStateToProps, { fetchLocation, fetchParkinglots, fetchSpots })(RootPage);
