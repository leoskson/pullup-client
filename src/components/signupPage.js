import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import { postUser } from '../actions';

class SignupPage extends Component {

    renderField(field) {
        const className = 'form-group myField';
        return (
            <div className={className}>
                <label>{field.label}</label>
                <input className='form-control' type={field.type} {...field.input} />
            </div>
        );
    }

    onSubmit(values) {
        this.props.postUser(values, (res) => {
            console.log(res);
            // this.props.history.push('/');
        });
    }

    render() {
        const { handleSubmit } = this.props;
        return (
            <form className='mySignup' onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field
                    type='email'
                    label='User email'
                    name='UUID'
                    component={this.renderField} />
                <Field
                    type='password'
                    label='Password'
                    name='password'
                    component={this.renderField} />
                <Field
                    type='text'
                    label='First name'
                    name='first'
                    component={this.renderField} />
                <Field
                    type='text'
                    label='Last name'
                    name='last'
                    component={this.renderField} />
                <Field
                    type='date'
                    label='Birthday'
                    name='birthday'
                    component={this.renderField} />
                <Field
                    type='text'
                    label='Car model'
                    name='carModel'
                    component={this.renderField} />
                <Field
                    type='text'
                    label='Liscense plate'
                    name='licensePlate'
                    component={this.renderField} />
                <button type='submit' className='btn btn-primary'>Submit</button>
                <Link to='/login' className='btn btn-danger'>Cancel</Link>
            </form>
        );
    }
}

export default reduxForm({
    form: 'SignupPage'
})(
    connect(null,{ postUser })(SignupPage)
);
