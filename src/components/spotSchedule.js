import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

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
        console.log(values);
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
        if (!this.props.reservations[0]) {
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

function mapStateToProps({ reservations }) {
    return { reservations };
}

export default reduxForm({
    form: 'ReservationPage'
})(
    connect(mapStateToProps,{})(SpotSchedule)
);
