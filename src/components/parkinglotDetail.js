import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ButtonGroup, ButtonToolbar, ToggleButtonGroup, ToggleButton, Button} from 'react-bootstrap';
import { fetchReservations } from '../actions';

class ParkinglotDetail extends Component {

    updateFloorSpots(floor) {
        this.props.onChangeFloor(floor);
    }

    clickSpot(id) {
        const date = new Date();
        const { config } = this.props;
        this.props.fetchReservations(id, `${date.getDay()}-${date.getMonth()}-${date.getFullYear()}`, config);
        this.props.onChangeState(3);
    }

    renderSpots() {
        let propsSpots = this.props.spots;
        let floorSpots = [];
        for (let [key, value] of Object.entries(propsSpots)) {
            if (value.floor === this.props.floor) {
                floorSpots.push(value);
            }
        }
        const sliceFloors = [];
        while (floorSpots.length !== 0) {
            sliceFloors.push(floorSpots.splice(0, 5));  
        }
        return (
            <ButtonToolbar id="spotButtonGroup">
                {
                    sliceFloors.map((floors, j) => {
                        return (
                            <ButtonGroup vertical={false} key={j}>
                                {
                                    floors.map((spot, i) => {
                                        return <Button id="spotButton" key= { spot.SUUID } onClick={() => this.clickSpot(spot.SUUID)} bsStyle= {spot.avail ? "danger" : "success"}>{this.props.floor + " - " + (j*5 + i)}</Button>;
                                    })
                                }
                            </ButtonGroup>
                        );
                    })
                }
            </ButtonToolbar>
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
                <ToggleButtonGroup value={this.props.floor} onChange={(value)=>value} type="radio" name="floors" >
                    {
                        floors.map((key) => {
                            return <ToggleButton onClick={() => this.updateFloorSpots(key)} value={key} key={key}>{key}</ToggleButton>;
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
