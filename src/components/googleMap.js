import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { InfoWindow, Marker, GoogleApiWrapper, Map } from 'google-maps-react';

// export class Map extends Component {

//     componentDidMount() {
//         this.loadMap();
//     }

//     componentDidUpdate(prevProps) {
//         if (prevProps.google !== this.props.google) {
//             this.loadMap();
//         }
//         if (prevProps.location !== this.props.location) {
//             this.recenterMap();
//         }
//     }

//     recenterMap() {
//         const map = this.map;
//         const { latitude, longitude } = this.props.location;
    
//         const google = this.props.google;
//         const maps = google.maps;

//         if (map) {
//             let center = new maps.LatLng(latitude, longitude);
//             map.panTo(center);
//         }
//     }

//     loadMap() {
//         if (this.props && this.props.google) {
//             const { google } = this.props;
//             const maps = google.maps;
//             const mapRef = this.refs.map;
//             const node = ReactDOM.findDOMNode(mapRef);
//             let { zoom } = this.props;
//             const { latitude, longitude } = this.props.location;
//             const center = new maps.LatLng(latitude, longitude);
//             const mapConfig =  {
//                 center,
//                 zoom
//             };
//             this.map = new maps.Map(node, mapConfig);
//         }
//     }

//     renderChildren() {
//         const { children } = this.props;
//         if (!children) return;
//         return React.Children.map(children, c => {
//             return React.cloneElement(c, {
//                 map: this.map,
//                 google: this.props.google,
//                 mapCenter: this.props.location
//             });
//         })
//     }

//     render() {
//         return (
//             <div ref='map' style={GOOGLE_STYLE}>
//                 Loading map...
//                 {this.renderChildren()}
//             </div>
//         );
//     }
// }

/*
                {/* <Map google={this.props.google} location={this.props.location} >
                    <Marker />
                    <Marker position={position} />
                    {this.markerParking()}
                </Map> */

// Map.propTypes = {
//     google: PropTypes.object,
//     zoom: PropTypes.number
// }

// Map.defaultProps = {
//     zoom: 13
// }

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
