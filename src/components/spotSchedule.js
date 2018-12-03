import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import { postReservations } from '../actions';

class SpotSchedule extends Component {

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

    checkboxClick(reservation) {
        console.log(reservation);
    }

    renderCheck() {
        return _.map(this.props.reservations, reservation => {
            return (
                <div className='form-group' key={reservation.id}>
                    <input className='form-control' type='checkbox' onClick={() => this.checkboxClick(reservation)} value={reservation.id} />
                </div>
            );
        })
    }

    onSubmit(values) {
        const date = new Date();
        const time = _.map(values, (value, key) => {
            return key.split('-')[0];
        })
        const data = {
            time: time[0],
            date: `${date.getMonth()+1}-${date.getDate()}-${date.getFullYear()}`,
            SUUID: this.props.activeSpot,
            UUID :  this.props.config.headers.UUID
        }
        this.props.postReservations(data, this.props.config, (res) => {
            if (res.status === 200) {
                alert('reservation successfull!');
                this.props.history.push('/user');
            } else {
                alert('reservation failed!');
                this.props.history.push('/');
            }
        });
    }

    renderField(field) {
        return (
            <div className='form-group'>
                <input className='form-control' type='checkbox' {...field.input} />
            </div>
        );
    }

    renderFields() {
        return _.map(this.props.reservations, reservation => {
            return (
                <Field
                    key={reservation.id}
                    type='checkbox'
                    name={`${reservation.id}-${this.getTime(reservation.id)}`}
                    component={this.renderField} />
            );
        })
    }

    render() {
        if (!this.props.activeSpot || !this.props.reservations[0]) {
            return <div></div>
        }
        const { handleSubmit } = this.props;
        return (
            <form className='myReservation' onSubmit={handleSubmit(this.onSubmit.bind(this))}>
            <table className='table' id='myReservationList'>
                <tbody>
                    <tr>
                        <th>Time</th>
                        <th>Reserved</th>
                        <th>Check</th>
                    </tr>
                    <tr>
                        <td>
                            {this.renderTable()}
                        </td>
                        <td>
                            {this.renderAvail()}
                        </td>
                        <td>
                            {this.renderFields()}
                        </td>
                    </tr>
                </tbody>
            </table>
            <button type='submit' className='btn btn-primary'>test</button>
            </form>
        );
    }
}

function mapStateToProps({ reservations, activeSpot, config }) {
    return { reservations, activeSpot, config };
}

export default reduxForm({
    form: 'ReservationPage'
})(
    connect(mapStateToProps,{ postReservations })(SpotSchedule)
);
