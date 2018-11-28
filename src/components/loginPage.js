import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { postLogin } from '../actions';

class LoginPage extends Component {

    renderField(field) {
        const className = 'form-group myField';
        return (
            <div className={className}>
                <style>{'body { background-color: #12A19C; }'}</style>
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
            <div className='loginWrapper'>
                <p className='logoImage'>
                    <img src='./images/mini_logo.png' width='200px' heigth='220px'></img>
                </p>
                <form className='myLogin' onSubmit={ handleSubmit(this.onSubmit.bind(this)) }>
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
                    <div className='buttonGroup'>
                        <button type='submit' className='btn btn-primary' style= {{marginRight: 5}}>Login</button>
                        <button type='submit' className='btn btn-primary'>Sign Up</button>
                    </div>
                </form>
            </div>
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
