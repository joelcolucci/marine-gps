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
      isSupportedDevice: true
    };
    this.state = initialState;

    this.handleClick = this.handleClick.bind(this);
    this.handleGetCurrentPositionSuccess = this.handleGetCurrentPositionSuccess.bind(this);
  }

  componentDidMount() {
    if (this.isGeolocationSupported()) {
      this.fetchPosition();
    } else {
      console.log('Geolocation is not supported');
    }
  }

  fetchPosition() {
    this.setState({
      isPositionFetching: true
    });

    let geolocationOptions = {
      enableHighAccuracy: true, 
      maximumAge        : 30000, 
      timeout           : 27000
    };

    navigator
      .geolocation
      .getCurrentPosition(
        this.handleGetCurrentPositionSuccess,
        this.handleGetCurrentPositionFailure,
        geolocationOptions);
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

  handleClick(event) {
    this.fetchPosition();
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
          onClick={this.handleClick}
          disabled={this.state.isPositionFetching}>Refresh position</button>
      </div>
    );
  }
}

export default App;
