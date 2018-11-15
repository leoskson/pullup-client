import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

const apiKey = 'AIzaSyDq0qA5f0DGeaZ5HBzWo1t5J2HuV_i4OiQ';
const GOOGLE_STYLE = {
    width: '50vw',
    height: '50vh'
};

export class Map extends Component {

    componentDidMount() {
        this.loadMap();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.google !== this.props.google) {
            this.loadMap();
        }
        if (prevProps.location !== this.props.location) {
            this.recenterMap();
        }
    }

    recenterMap() {
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

    renderChildren() {
        const { children } = this.props;
        if (!children) return;
        return React.Children.map(children, c => {
            return React.cloneElement(c, {
                map: this.map,
                google: this.props.google,
                mapCenter: this.props.location
            });
        })
    }

    render() {
        return (
            <div ref='map' style={GOOGLE_STYLE}>
                Loading map...
                {this.renderChildren()}
            </div>
        );
    }
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
            <div>
                <Map google={this.props.google} location={this.props.location} >
                    <Marker position={position} />
                    {this.markerParking()}
                </Map>
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
