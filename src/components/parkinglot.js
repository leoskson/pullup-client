import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectParkinglot } from '../actions';

class Parkinglot extends Component {

    onChange() {
        this.props.selectParkinglot(this.props.parkinglot.PUUID);
    }

    render() {
        return (
            <li onClick={this.onChange.bind(this)}>{this.props.parkinglot.name}</li>
        );
    }
}

export default connect(null, { selectParkinglot })(Parkinglot);
