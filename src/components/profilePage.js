import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import Navbar from './navbar';
import { fetchUser } from '../actions';
import { Table, ListGroup, ListGroupItem } from 'react-bootstrap';

class ProfilePage extends Component {
    componentDidMount() {
        this.props.fetchUser(this.props.config);
    }

    renderReservation(reservationList) {
        const reservations = _.mapKeys(reservationList, 'RUUID');
        return (
            <ListGroup>
                {
                    _.map(reservations, reservation => {
                        return <ListGroupItem key={reservation.RUUID}>{"SpotID(" + reservation.SUUID + ") - Date(" + reservation.date + ") - Slot(" + reservation.time + ")"}</ListGroupItem>;
                    })
                }
            </ListGroup>
        )
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
                {this.renderReservation(user.reservation)}
            </div>
        );
    }
}

function mapStateToProps({ user, config }) {
    return { user, config };
}

export default connect(mapStateToProps, { fetchUser })(ProfilePage);
