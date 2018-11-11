import React, { Component } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';
import CurrentLocation from './currentLocation';

const apiKey = 'AIzaSyDq0qA5f0DGeaZ5HBzWo1t5J2HuV_i4OiQ';

class MapContainer extends Component {

    render() {
        return (
            <CurrentLocation
                centerAroundCurrentLocation
                google={this.props.google}
            >
            </CurrentLocation>
        );
    }
}

export default GoogleApiWrapper({ apiKey })(MapContainer);
