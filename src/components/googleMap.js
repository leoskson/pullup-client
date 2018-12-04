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
        console.log(this.props);
        return (
            <div id='mapBox'>
                <Map google={this.props.google} center={position} zoom={14} style={GOOGLE_STYLE}>
                    <Marker position={position}/>
                    {this.markerParking()}
                </Map>
            </div>
        );
    }

    // pinSymbol(color) {
    //     return {
    //         path: 'M 0,0 C -2,-20 -10,-22 -10,-30 A 10,10 0 1,1 10,-30 C 10,-22 2,-20 0,0 z M -2,-30 a 2,2 0 1,1 4,0 2,2 0 1,1 -4,0',
    //         fillColor: color,
    //         fillOpacity: 1,
    //         strokeColor: '#000',
    //         strokeWeight: 2,
    //         scale: 1,
    //    };
    // }
}

function mapStateToProps({ location, parkinglots }) {
    return { location, parkinglots };
}

export default connect(mapStateToProps, {})(GoogleApiWrapper({ apiKey })(MapContainer));
