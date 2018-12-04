import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Marker, GoogleApiWrapper, Map } from 'google-maps-react';

const apiKey = 'AIzaSyDq0qA5f0DGeaZ5HBzWo1t5J2HuV_i4OiQ';
const GOOGLE_STYLE = {
    width: '78vw',
    height: '50vh',
    position: 'relative'
};

export class MapContainer extends Component {
    markerParking() {
        return _.map(this.props.parkinglots, parkinglot => {
            const pos = { lat: parkinglot.latitude, lng: parkinglot.longitude }
            return <Marker key={parkinglot.PUUID} position={pos} />
        });
    }

    render() {
        const position = {lat: this.props.location.latitude, lng: this.props.location.longitude};
        return (
            <div id='mapBox'>
                <Map google={this.props.google} center={position} zoom={14} style={GOOGLE_STYLE}>
                    <Marker position={position}/>
                    {this.markerParking()}
                </Map>
            </div>
        );
    }
}

function mapStateToProps({ location, parkinglots }) {
    return { location, parkinglots };
}

export default connect(mapStateToProps, {})(GoogleApiWrapper({ apiKey })(MapContainer));
