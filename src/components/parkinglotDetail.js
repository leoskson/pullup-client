import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchReservations } from '../actions';

class ParkinglotDetail extends Component {
    clickSpot(id) {
        const date = new Date();
        const { config } = this.props;
        this.props.fetchReservations(id, `${date.getMonth()+1}-${date.getDate()}-${date.getFullYear()}`, config);
    }

    renderSpots() {
        return _.map(this.props.spots, spot => {
            return (     
                <div className='mySpot' key={spot.SUUID} onClick={() => this.clickSpot(spot.SUUID)}>
                    <div>Spot ID {spot.floor}-1 </div>
                    <div>Availability {String(spot.avail)} </div>
                    <div>Floor {spot.floor} </div>
                </div>
               
            );
        });
    }

    render() {
        const parkinglot = this.props.parkinglots[this.props.activeParkinglot];
        if (!parkinglot) {
            return <div>Select parkinglot plz</div>
        }
        return (
            <div className='myParkingDetail'>
                <div>Hourly Rate: {parkinglot.hourly}</div>
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
