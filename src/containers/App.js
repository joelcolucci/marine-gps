import React from 'react';

import GPSHeading from '../components/GPSHeading';
import GPSPosition from '../components/GPSPosition';
import GPSSpeed from '../components/GPSSpeed';
import GPSTimestamp from '../components/GPSTimestamp';

class App extends React.Component {
  constructor(props) {
    super(props);

    let initialState = {
      position: {
        latitude: null,
        longitude: null,
        heading: null,
        speed: null,
        timestamp: 0,
        accuracy: 0
      },
      isPositionFetching: false,
      isSupportedDevice: true,
      isGPSEnabled: false
    };
    this.state = initialState;

    this.geolocationOptions = {
      enableHighAccuracy: true, 
      maximumAge        : 0, 
      timeout           : 27000
    };
    this.watchId = null;

    this.handleGPSEnableClick = this.handleGPSEnableClick.bind(this);
    this.handleGPSDisableClick = this.handleGPSDisableClick.bind(this);
    this.handleGetCurrentPositionSuccess = this.handleGetCurrentPositionSuccess.bind(this);
  }

  handleGetCurrentPositionSuccess(position) {
    let { timestamp } = position;
    let { latitude, longitude, heading, speed, accuracy } = position.coords;

    let isSupportedDevice = !(heading === null && speed === null);

    let stateUpdate = {
      position: {
        latitude: latitude,
        longitude: longitude,
        heading: heading,
        speed: speed,
        timestamp: timestamp,
        accuracy: accuracy
      },
      isPositionFetching: false,
      isSupportedDevice: isSupportedDevice
    };

    this.setState(stateUpdate);
  }

  handleGetCurrentPositionFailure(error) {
    console.warn(`ERROR(${error.code}): ${error.message}`);
  }

  isGeolocationSupported() {
    return ('geolocation' in navigator);
  }

  handleGPSEnableClick(event) {
    this.setState({isGPSEnabled: true});
    this.watchId = navigator.geolocation.watchPosition(
      this.handleGetCurrentPositionSuccess,
      this.handleGetCurrentPositionFailure,
      this.geolocationOptions);
  }

  handleGPSDisableClick(event) {
    this.setState({isGPSEnabled: false});
    navigator.geolocation.clearWatch(this.watchId);
  }

  render() {
    let { latitude, longitude, speed, heading, timestamp, accuracy } = this.state.position;
    let { isPositionFetching, isSupportedDevice } = this.state;
    return (
      <div>
        <header>
          <h1>GPS</h1>
        </header>
        <GPSHeading
          heading={heading}
          isFetching={isPositionFetching}
          isSupported={isSupportedDevice} />
        <GPSSpeed
          speed={speed}
          isFetching={isPositionFetching}
          isSupported={isSupportedDevice} />
        <GPSPosition
          latitude={latitude}
          longitude={longitude}
          accuracy={accuracy}
          isFetching={isPositionFetching} />
        <GPSTimestamp
          timestamp={timestamp} />
        <button
          onClick={this.handleGPSEnableClick}
          disabled={this.state.isGPSEnabled}>Enable GPS</button>
        <button
          onClick={this.handleGPSDisableClick}
          disabled={!this.state.isGPSEnabled}>Disable GPS</button>
      </div>
    );
  }
}

export default App;
