import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { InfoWindow, Marker, GoogleApiWrapper, Map } from 'google-maps-react';

const apiKey = 'AIzaSyDq0qA5f0DGeaZ5HBzWo1t5J2HuV_i4OiQ';
const GOOGLE_STYLE = {
    width: '50vw',
    height: '50vh',
    position: 'relative'
};

function pinSymbol(color) {
    return {
        path: 'M 0,0 C -2,-20 -10,-22 -10,-30 A 10,10 0 1,1 10,-30 C 10,-22 2,-20 0,0 z M -2,-30 a 2,2 0 1,1 4,0 2,2 0 1,1 -4,0',
        fillColor: color,
        fillOpacity: 1,
        strokeColor: '#000',
        strokeWeight: 2,
        scale: 1,
   };
}

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
                <Map  google={this.props.google} initialCenter={position} center={position} zoom={14} style={GOOGLE_STYLE}>
                    <Marker position={position} icon={pinSymbol("#FFF")}/>
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
