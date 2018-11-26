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
             <table class="table table-user-information">
                 <tbody>
                 <tr>
                        <td>First Name:</td>
                        <td>{user.first}</td>
                      </tr>
                      <tr>
                        <td>Last Name:</td>
                        <td>{user.last}</td>
                      </tr>
                      <tr>
                        <td>Email:</td>
                        <td>{user.email}</td>
                      </tr>
                      <tr>
                        <td>Car:</td>
                        <td>{user.carModel}</td>
                      </tr>
                      <tr>
                        <td>License Plate No:</td>
                        <td>{user.licensePlate}</td>
                      </tr>
                      <tr>
                        <td>Reservations:</td>
                        <tabs>
                        <Pane label="Past">
                        <div>This is my tab past reservations!</div>
                        </Pane>
                        <Pane label="Current">
                        <div>This is my Current Reservations!</div>
                        </Pane>
                        </tabs>
                      </tr>
                 </tbody>
             </table>
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
