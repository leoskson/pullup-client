import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import Parkinglot from './parkinglot';
import { fetchParkinglots } from '../actions';

class ParkinglotList extends Component {
    componentDidMount() {
        this.props.fetchParkinglots(1,2);
    }

    renderParkinglots() {
        return _.map(this.props.parkinglots, parkinglot => {
            return <Parkinglot key={parkinglot.PUUID} parkinglot={parkinglot} />
        });
    }

    render() {
        console.log(this.props);
        const { parkinglots } = this.props;
        return (
            <ul>
                {this.renderParkinglots()}
            </ul>
        );
    }
}

function mapStateToProps({ parkinglots }) {
    return { parkinglots };
}

export default connect(mapStateToProps, { fetchParkinglots })(ParkinglotList);
