import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postReservations, fetchSpots } from '../actions';
import { Field, reduxForm } from 'redux-form';
import {Checkbox, FormGroup, SplitButton, MenuItem} from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
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
                <div key={reservation.id} className='myReservation'>{this.getTime(reservation.id) + " - "+ this.getTime(reservation.id + 1)}</div>
            );
        })
    }

    handleChange = (evt, evtKey) => {
        this.setState({btnTitle: evtKey});  
    }
    renderDropdownButton() {
        const date = new Date();
        let i = date.getDate();
        const dateCollection = this.getDate(date, 5);
        return (
          <SplitButton
            title={"Select Date"}
            key={i}
            id={`split-button-basic-${i}`}
            onChange = {this.handleChange}
          >
            {
                dateCollection.map((date, index) => {
                    return <MenuItem key={date} eventKey={date} >{date}</MenuItem>
                })
            }
            
          </SplitButton>
        );
      }      
      
    getDate(today, offset) {
        let dateCollection = [];
        for (let i = 1; i <= offset; i++) {
            let nextDate = new Date(today);
            nextDate.setDate(today.getDate() + 1);
            let fullDate = nextDate.getMonth() + 1 + "-" + nextDate.getDate() + "-" + nextDate.getFullYear();
            dateCollection.push(fullDate);
            today = nextDate;
        }
        return dateCollection;
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

    renderField(field) {
        return (
            <Checkbox {...field.input} disabled={field.reserved}>{" "}</Checkbox>
        );
    }

    renderFields() {
        return (
            <FormGroup className="table-check-form-group"
            >
                {
                    _.map(this.props.reservations, reservation => {
                        
                        return (
                            
                            <Field
                                key={reservation.id + Date.now()}
                                type='checkbox'
                                name={`${reservation.id}-${this.getTime(reservation.id)}`}
                                reserved={reservation.reserved}
                                component={this.renderField} />
                            
                        );
                    })
                }
            </FormGroup>
        )
    }

    onSubmit(values) {
        const date = new Date();
        const time = _.map(values, (value, key) => {
            return key.split('-')[0];
        })
        const currDate = `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`;
        const currInterval = date.getMinutes() >= 30 ? date.getHours() * 2 + 1 : date.getHours() * 2;
        const data = {
            time: time[0],
            ctime:  String(currInterval),
            date: currDate,
            cdate: currDate,
            SUUID: this.props.activeSpot,
            UUID :  this.props.config.headers.UUID
        }
        const {reservations} = this.props;
        this.props.postReservations(data, this.props.config)
            .then((obj)=> {
                alert("Reservation Successful");
                this.props.reservations[data.time].reserved = true;
                this.props.history.push('/user');
            })
            .catch((err) => {
                alert("Reservation Fail");
            })
    }
    
    render() {
        if (!this.props.activeSpot || !this.props.reservations[0]) {
            return <div></div>
        }
        const { handleSubmit } = this.props;

        return (
            <form className='myReservation' onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <table className='table'  id='myReservationList'>
                    <tbody>
                        <tr>
                            <th>Time</th>
                            <th>Select</th>
                            <th>Date</th>
                        </tr>
                        <tr>
                            <td>
                                {this.renderTable()}
                            </td>
                            <td>
                                {this.renderFields()}
                            </td>
                            <td>
                                {this.renderDropdownButton()}
                            </td>
                        </tr>
                    </tbody>
                </table>
                <button type='submit' className='btn btn-primary'>Submit</button>
            </form>
        );  
    }
}

function mapStateToProps({ reservations, parkinglots, activeParkinglot, activeSpot, config})  {
    return { reservations, parkinglots, activeParkinglot, activeSpot, config };
}

export default withRouter(reduxForm({
    form: 'ReservationPage'
})(
    connect(mapStateToProps,{ postReservations, fetchSpots })(SpotSchedule))
);