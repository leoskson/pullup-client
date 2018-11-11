import React, { Component } from 'react';

import GoogleMap from './googleMap';
import MapContainer from './googleMap2';
import Navbar from './navbar';

export default class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <MapContainer />
      </div>
    );
  }
}
