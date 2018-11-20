import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import Navbar from './navbar';
import { fetchUser } from '../actions';

class ProfilePage extends Component {
    componentDidMount() {
        this.props.fetchUser(this.props.config);
    }

    renderReservation(reservationList) {
        const reservations = _.mapKeys(reservationList, 'RUUID');
        return _.map(reservations, reservation => {
            return <li key={reservation.RUUID}>{reservation.date}</li>
        });
    }

    renderUser(user) {
        return (
            <ul>
                <li>{user.first}</li>
                <li>{user.last}</li>
                <li>{user.email}</li>
                <li>{user.carModel}</li>
                <li>{user.licensePlate}</li>
            </ul>
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
                <ul>
                    Reservations
                    {this.renderReservation(user.reservation)}
                </ul>
            </div>
        );
    }
}

function mapStateToProps({ user, config }) {
    return { user, config };
}

export default connect(mapStateToProps, { fetchUser })(ProfilePage);
