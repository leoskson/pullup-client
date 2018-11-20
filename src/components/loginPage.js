import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

class LoginPage extends Component {

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
        console.log(values);
    }

    render() {
        const { handleSubmit } = this.props;
        return (
            <form className='myLogin' onSubmit={handleSubmit(this.onSubmit.bind(this))}>
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
                <button type='submit' className='btn btn-primary'>Login</button>
            </form>
        );
    }
}

export default reduxForm({
    form: 'LoginPage'
})(
    connect(null,{})(LoginPage)
);

