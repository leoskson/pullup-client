import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import Navbar from './navbar';
import { fetchUser, deleteReservation } from '../actions';
import { Table, ListGroup, ListGroupItem } from 'react-bootstrap';

class ProfilePage extends Component {
    componentDidMount() {
        this.props.fetchUser(this.props.config);
    }

    renderReservation(reservationList) {
        const reservations = _.mapKeys(reservationList, 'RUUID');
        return (
            <ListGroup className="reservationList">
                {
                    _.map(reservations, (reservation, index) => {
                        return (
                        <div className="resList" key={reservation.RUUID + "1"}>
                            <button key={reservation.RUUID + "0"} onClick={this.deleteReservation(reservation)}>X</button>
                            <ListGroupItem key={reservation.RUUID}>{this.formReservationTitle(reservation)}</ListGroupItem>
                        </div>
                        )
                    })
                    
                }
            </ListGroup>
        )
    }

    formReservationTitle(reservation) {
        return reservation.date + " | " + this.getTime(Number(reservation.time))  + " - " + this.getTime(Number(reservation.time) + 1) + " | " + reservation.SUUID;
    }

    deleteReservation(reservation) {
        console.log("clicked");
        // this.props.deleteReservation(reservation.RUUID, this.props.config);
    }

    getTime(id) {
        const num = Number(id)*30;
        const hour = Math.floor(num/60);
        const min = num%60;
        const hourString = hour < 10 ? `0${hour}` : `${hour}`;
        const minString = min == 0 ? `00` : `${min}`;
        return `${hourString}:${minString}`;
    }

    renderUser(user) {
        return (
            <Table responsive>
                <thead>
                    <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Birthday</th>
                    <th>Email</th>
                    <th>Car Model</th>
                    <th>License Plate</th>
                    <th>Registered Date</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{user.first}</td>
                        <td>{user.last}</td>
                        <td>{user.birthday}</td>
                        <td>{user.email}</td>
                        <td>{user.carModel}</td>
                        <td>{user.licensePlate}</td>
                        <td>{user.timestamp}</td>
                    </tr>
                </tbody>
            </Table>
        );
    }

    render() {
        const { user } = this.props;
        if (!user.first) {
            return <div>Loading ...</div>
        }
        return (
            <div>
                <Navbar />
                {this.renderUser(user)}
                <div className='reservationTitle'>Reservations</div>
                {this.renderReservation(user.reservation)}
            </div>
        );
    }
}

function mapStateToProps({ user, config }) {
    return { user, config };
}

export default connect(mapStateToProps, { fetchUser, deleteReservation })(ProfilePage);
