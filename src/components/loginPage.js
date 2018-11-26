import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { postLogin } from '../actions';
import { logo } from '../Picture.png';

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
        this.props.postLogin(values);
    }

    componentDidUpdate() {
        const { headers } = this.props.config;
        if (!headers) return;
        if (headers.success === false) {
            alert(headers.message);
        } else if(headers.success === true) {
            alert('welcome');
            this.props.history.push('/');
        }
    }

    render() {
        const { handleSubmit } = this.props;
        return (
            <div>
            <img src={logo} alt="App logo" />
            </div>
           
            <form className='myLogin' onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field
                    type='email'
                    label='User email'
                    name='email'
                    component={this.renderField} />
                <Field
                    type='password'
                    label='Password'
                    name='password'
                    component={this.renderField} />
                <button type='submit' className='btn btn-primary'>Login</button>
                <Link to='/signup' className='btn btn-danger'>Register</Link>
            </form>
        );
    }
}

function mapStateToProps({ config }) {
    return { config };
}

export default reduxForm({
    form: 'LoginPage'
})(
    connect(mapStateToProps,{ postLogin })(LoginPage)
);
