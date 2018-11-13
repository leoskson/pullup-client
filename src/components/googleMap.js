import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react'

const apiKey = 'AIzaSyDq0qA5f0DGeaZ5HBzWo1t5J2HuV_i4OiQ';
const GOOGLE_STYLE = {
    width: '50vw',
    height: '50vh'
};

export class Map extends React.Component {
    componentDidMount() {
        console.log('mount');
        this.loadMap();
    }

    componentDidUpdate(prevProps, prevState) {
        console.log('update');
        if (prevProps.google !== this.props.google) {
            this.loadMap();
        }
        if (prevProps.location !== this.props.location) {
            this.recenterMap();
        }
    }

    recenterMap() {
        console.log('recenter');
        const map = this.map;
        const { latitude, longitude } = this.props.location;
    
        const google = this.props.google;
        const maps = google.maps;

        if (map) {
            let center = new maps.LatLng(latitude, longitude);
            map.panTo(center);
        }
    }

    loadMap() {
        if (this.props && this.props.google) {
            console.log('load map');
            const { google } = this.props;
            const maps = google.maps;
            const mapRef = this.refs.map;
            const node = ReactDOM.findDOMNode(mapRef);
            let { zoom } = this.props;
            const { latitude, longitude } = this.props.location;
            const center = new maps.LatLng(latitude, longitude);
            const mapConfig =  {
                center,
                zoom
            };
            this.map = new maps.Map(node, mapConfig);
        }
    }

    render() {
        return (
            <div ref='map' style={GOOGLE_STYLE}>
                Loading map...
            </div>
        );
    }
}

export class MapContainer extends Component {
    render() {
        return (
            <div>
                <Map google={this.props.google} location={this.props.location}/>
            </div>
        );
    }
}

Map.propTypes = {
    google: PropTypes.object,
    zoom: PropTypes.number
}

Map.defaultProps = {
    zoom: 13
}

export default GoogleApiWrapper({ apiKey })(MapContainer);
