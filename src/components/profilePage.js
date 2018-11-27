import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Navbar from './navbar';
import { fetchUser } from '../actions';

class ProfilePage extends Component {
    componentDidMount() {
        const { config } = this.props;
        if (config.headers) {
            this.props.fetchUser(config);
        }
    }

    renderReservation(reservationList) {
        const reservations = _.mapKeys(reservationList, 'RUUID');
        return _.map(reservations, reservation => {
            return <li key={reservation.RUUID}>{reservation.date}</li>
        });
    }

    renderUser(user) {
        return (
            <div className="col-md-6 col-lg-6">
             <table className="table table-user-information">
                 <tbody>
                    <tr>
                        <td><b>First Name:</b></td>
                        <td >{user.first}</td>
                      </tr>
                      <tr>
                        <td ><b>Last Name:</b></td>
                        <td >{user.last}</td>
                      </tr>
                      <tr>
                        <td><b>Email:</b></td>
                        <td >{user.email}</td>
                      </tr>
                      <tr>
                        <td><b>Car:</b></td>
                        <td >{user.carModel}</td>
                      </tr>
                      <tr>
                        <td><b>License Plate No:</b></td>
                        <td >{user.licensePlate}</td>
                      </tr>
                 </tbody>
             </table>
             </div>
        );
    }

    render() {
        const { user, config } = this.props;
        if (!config.headers) {
            return <Redirect to='/login' />
        }
        if (!user.first) {
            return <div>Loading ...</div>
        }
        return (
            <div>
                <Navbar />
                {this.renderUser(user)}
                <ul className="reservation">
                    <b>Reservations:</b>
                    
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

