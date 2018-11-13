import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react'

const apiKey = 'AIzaSyDq0qA5f0DGeaZ5HBzWo1t5J2HuV_i4OiQ';

export class Map extends React.Component {

    constructor(props) {
        super(props);
    
        const { lat, lng } = this.props.initialCenter;
        this.state = { currentLocation: { lat, lng } }
    }

    componentDidMount() {
        console.log('mount');
        if (this.props.centerAroundCurrentLocation) {
            console.log('current');
            if (navigator && navigator.geolocation) {
                console.log('navigator');
                navigator.geolocation.getCurrentPosition((pos) => {
                    console.log('navigator callback');
                    const coords = pos.coords;
                    this.setState({
                        currentLocation: {
                            lat: coords.latitude,
                            lng: coords.longitude
                        }
                    })
                    console.log('current updated');
                })
            }
        }
        this.loadMap();
    }

    componentDidUpdate(prevProps, prevState) {
        console.log('update');
        if (prevProps.google !== this.props.google) {
            this.loadMap();
        }
        if (prevState.currentLocation !== this.state.currentLocation) {
            this.recenterMap();
        }
    }

    recenterMap() {
        console.log('recenter');
        const map = this.map;
        const curr = this.state.currentLocation;
    
        const google = this.props.google;
        const maps = google.maps;

        if (map) {
            console.log('yes map');
            let center = new maps.LatLng(curr.lat, curr.lng)
            map.panTo(center)
        }
    }

    loadMap() {
        if (this.props && this.props.google) {
            const { google } = this.props;
            const maps = google.maps;
            const mapRef = this.refs.map;
            const node = ReactDOM.findDOMNode(mapRef);

            let { zoom } = this.props;
            const {lat, lng} = this.state.currentLocation;
            const center = new maps.LatLng(lat, lng);
            const mapConfig = Object.assign({}, {
                center: center,
                zoom: zoom
            })
            this.map = new maps.Map(node, mapConfig);
        }
    }

    render() {
        const style = {
            width: '50vw',
            height: '50vh'
        }
      return (
        <div ref='map' style={style}>
          Loading map...
        </div>
      )
    }
}

export class MapContainer extends Component {
    render() {
        return (
            <div>
                <Map google={this.props.google} />
            </div>
        )
      }
}

Map.propTypes = {
    google: PropTypes.object,
    zoom: PropTypes.number,
    initialCenter: PropTypes.object,
    centerAroundCurrentLocation: PropTypes.bool
}

Map.defaultProps = {
    zoom: 13,
    initialCenter: {
        lat: 33.7749,
        lng: -84.3964
    },
    centerAroundCurrentLocation: true
}

export default GoogleApiWrapper({ apiKey })(MapContainer);
