import React, { Component } from 'react';
import { connect } from 'react-redux';

class SpotSchedule extends Component {

    clickReservation(id) {
        console.log('clicked ' + id);
    }

    renderSchedule() {
        return _.map(this.props.reservations, reservation => {
            return (
                <li key={reservation.id} onClick={() => this.clickReservation(reservation.id)}>
                    <div>{reservation.id}</div>
                    <div>{String(reservation.reserved)}</div>
                </li>
            );
        });
    }

    render() {
        return (
            <ul>
                {this.renderSchedule()}
            </ul>
        );  
    }
}

function mapStateToProps({ reservations }) {
    return { reservations };
}

export default connect(mapStateToProps, {})(SpotSchedule);
