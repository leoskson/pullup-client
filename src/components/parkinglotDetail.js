import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchReservations } from '../actions';

class ParkinglotDetail extends Component {

    clickSpot(id) {
        const date = new Date();
        const { config } = this.props;
        this.props.fetchReservations(id, `${date.getDay()}-${date.getMonth()}-${date.getFullYear()}`, config);
        this.props.onChangeState(3);
    }

    renderSpots() {
        return _.map(this.props.spots, spot => {
            return (
                <li className='mySpot' key={spot.SUUID} onClick={() => this.clickSpot(spot.SUUID)}>
                    <div>id: {spot.floor}-1 </div>
                    <div>reserved: {String(spot.avail)} </div>
                    <div>floor: {spot.floor} </div>
                </li>
            );
        });
    }

    render() {
        const parkinglot = this.props.parkinglots[this.props.activeParkinglot];
        if (!parkinglot) {
            return <div></div>;
        }
        return (
            <div className='myParkingDetail'>
                <div>{parkinglot.name}</div>
                <div>hourly: {parkinglot.hourly}</div>
                <div>spot : {parkinglot.spotCount}</div>
                <ul className='mySpotList'>
                    {this.renderSpots()}
                </ul>
            </div>
        );
    }
}

function mapStateToProps({ reservations, activeParkinglot, spots, parkinglots, config }) {
    return { reservations, activeParkinglot, spots, parkinglots, config };
}

export default connect(mapStateToProps, { fetchReservations })(ParkinglotDetail);
