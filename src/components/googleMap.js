import React, { Component } from 'react';

class GoogleMap extends Component {
    componentDidMount() {
        new google.maps.Map(this.refs.map, {
            zoom:12,
            center: {
                lat: 37.4224764,
                lng: -122.0842499
            }
        });
    }

    render() {
        return (
            <div className='google-map' ref='map' />
        );
    }
}

export default GoogleMap;