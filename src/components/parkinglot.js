import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectParkinglot } from '../actions';

class Parkinglot extends Component {

    onChange() {
        this.props.selectParkinglot(this.props.parkinglot.PUUID);
    }

    render() {
        return (
            <button className='myParking' onClick={this.onChange.bind(this)}>{this.props.parkinglot.name}</button>
        );
    }
}

export default connect(null, { selectParkinglot })(Parkinglot);
