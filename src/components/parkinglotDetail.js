import _ from 'lodash';
import React, { Component } from 'react';

class ParkinglotDetail extends Component {

    renderSpots(spots) {
        return <div>test</div>
    }

    render() {
        const { parkinglot } = this.props;
        if (!parkinglot) {
            return <div>Select parkinglot plz</div>
        }
        return (
            <div>
                <div>{parkinglot.name}</div>
                <div>hourly: {parkinglot.hourly}</div>
                <div>spot : {parkinglot.spotCount}</div>
                {this.renderSpots(parkinglot.spots)}
            </div>
        );
    }
}

export default ParkinglotDetail;
