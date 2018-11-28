import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectParkinglot } from '../actions';
import { ListGroupItem } from 'react-bootstrap';

class Parkinglot extends Component {

    onChange() {
        this.props.selectParkinglot(this.props.parkinglot.PUUID);
        this.props.onChangeState(2);
    }

    render() {
        return (
            <ListGroupItem onClick={this.onChange.bind(this)}>{this.props.parkinglot.name}</ListGroupItem>
        );
    }
}

export default connect(null, { selectParkinglot })(Parkinglot);
