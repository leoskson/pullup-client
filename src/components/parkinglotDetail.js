import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ButtonToolbar, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
import { fetchReservations } from '../actions';

class ParkinglotDetail extends Component {

    state = {
        spots: []
    }

    clickSpot(id) {
        const date = new Date();
        const { config } = this.props;
        this.props.fetchReservations(id, `${date.getDay()}-${date.getMonth()}-${date.getFullYear()}`, config);
        this.props.onChangeState(3);
    }
    
    updateFloorSpots(spots) {
        this.setState({
            spots: spots
        });
    }

    renderSpots() {
        const spots = this.state.spots;
        return (
            <ul className='mySpotList'>
            {
                spots.map((spot) => {
                    return (
                        <li className='mySpot' key= { spot.SUUID } onClick={() => this.clickSpot(spot.SUUID)}>
                            <div>reserved: { String(spot.avail) } </div>
                        </li>
                    );
                })
            }
            </ul>
        );

    }

    renderFloors() {
        const spotsByFloor = new Map();
        const spots = this.props.spots;
        for (let [key, value] of Object.entries(spots)) {
            if (!spotsByFloor.has(value.floor)) {
                spotsByFloor.set(value.floor, [value]);
            } else {
                spotsByFloor.get(value.floor).push(value);
            }
        }
        const floors = [...spotsByFloor.keys()].sort();
        return (
            <ButtonToolbar>
                <ToggleButtonGroup type="radio" name="floors" defaultValue={1}>
                    {
                        floors.map((key) => {
                            return <ToggleButton onClick={() => this.updateFloorSpots(spotsByFloor.get(key))} value={key} key={key}>{key}</ToggleButton>;
                        })    
                    
                    }
                </ToggleButtonGroup>
            </ButtonToolbar>);
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
                {this.renderFloors()}
                {this.renderSpots()}
            </div>
        );
    }
}

function mapStateToProps({ reservations, activeParkinglot, spots, parkinglots, config }) {
    return { reservations, activeParkinglot, spots, parkinglots, config };
}

export default connect(mapStateToProps, { fetchReservations })(ParkinglotDetail);
