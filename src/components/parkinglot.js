import React, { Component } from 'react';

class Parkinglot extends Component {
    render() {
        return (
            <li>{this.props.parkinglot.name}</li>
        );
    }
}

export default Parkinglot;
