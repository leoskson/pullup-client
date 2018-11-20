import React, { Component } from 'react';
import { connect } from 'react-redux';

class SpotSchedule extends Component {

    clickReservation(id) {
        console.log('clicked ' + id);
    }

    renderSchedule() {
        return _.map(this.props.reservations, reservation => {
            return (
                <li className='myReservation' key={reservation.id} onClick={() => this.clickReservation(reservation.id)}>
                    <div>{reservation.id}</div>
                    <div>{String(reservation.reserved)}</div>
                </li>
            );
        });
    }

    renderTable() {
        return _.map(this.props.reservations, reservation => {
            return (
                <div key={reservation.id} className='myReservation'>{this.getTime(reservation.id)}</div>
            );
        })
    }

    getTime(id) {
        const num = Number(id)*30;
        const hour = Math.floor(num/60);
        const min = num%60;
        const hourString = hour < 10 ? `0${hour}` : `${hour}`;
        const minString = min == 0 ? `00` : `${min}`;
        return `${hourString}:${minString}`;
    }

    renderAvail() {
        return _.map(this.props.reservations, reservation => {
            return (
                <div key={reservation.id} className='myReservation'>{String(reservation.reserved)}</div>
            );
        })
    }

    render() {
        if (!this.props.reservations[0]) {
            return <div></div>
        }
        return (
            <table className='table' id='myReservationList'>
                <tbody>
                    <tr>
                        <th>Time</th>
                        <th>Reserved</th>
                    </tr>
                    <tr>
                        <td>
                            {this.renderTable()}
                        </td>
                        <td>
                            {this.renderAvail()}
                        </td>
                    </tr>
                </tbody>
            </table>
        );  
    }
}

function mapStateToProps({ reservations }) {
    return { reservations };
}

export default connect(mapStateToProps, {})(SpotSchedule);
