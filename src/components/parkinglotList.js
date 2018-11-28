import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Parkinglot from './parkinglot';
import { fetchParkinglots } from '../actions';

class ParkinglotList extends Component {
    
    renderParkinglots() {
        return (
        <div className="verticalBar">
            {
            _.map(this.props.parkinglots, parkinglot => {
                return <Parkinglot key={parkinglot.PUUID} parkinglot={parkinglot} onChangeState={this.props.onChangeState}/>
            })
        }
        </div>);
        
    }

    render() {
        const { parkinglots } = this.props;
        return (
            <div className='myParkingList'>
                {this.renderParkinglots()}
            </div>
        );
    }
}

function mapStateToProps({ parkinglots }) {
    return { parkinglots };
}

export default connect(mapStateToProps, { fetchParkinglots })(ParkinglotList);
