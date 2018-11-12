import React, { Component } from 'react';
import { connect } from 'react-redux';

import Navbar from './navbar';
import { fetchUser } from '../actions';

class ProfilePage extends Component {
    componentDidMount() {
        const { id } = this.props.match.params;
        this.props.fetchUser(id);
    }

    renderUser(user) {
        const { card_number, card_provider, exp_date, name } = user.payment;
        return (
            <ul>
                <li>{user.first}</li>
                <li>{user.last}</li>
                <li>{user.email}</li>
                <li>{user.car}</li>
                <li>{user.license_plate}</li>
                <li>{card_number}</li>
                <li>{card_provider}</li>
                <li>{exp_date}</li>
                <li>{name}</li>
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
            </div>
        );
    }
}

function mapStateToProps({ user }) {
    return { user };
}

export default connect(mapStateToProps, { fetchUser })(ProfilePage);
