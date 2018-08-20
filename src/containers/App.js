import React from 'react';

import GPSHeading from '../components/GPSHeading';
import GPSPosition from '../components/GPSPosition';
import GPSTimestamp from '../components/GPSTimestamp';

class App extends React.Component {
  constructor(props) {
    super(props);

    let initialState = {
      position: {
        latitude: null,
        longitude: null,
        heading: null,
        speed: 0,
        timestamp: 0,
        accuracy: 0
      },
      isPositionFetching: false,
      isSupportedDevice: false
    };
    this.state = initialState;

    this.handleClick = this.handleClick.bind(this);
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

    navigator.geolocation.getCurrentPosition((position) => {
      let { timestamp } = position;
      let { latitude, longitude, heading, speed, accuracy } = position.coords;

      let isSupportedDevice = (heading === null && speed === null);

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
    });
  }

  isGeolocationSupported() {
    return ('geolocation' in navigator);
  }

  handleClick(event) {
    this.fetchPosition();
  }

  render() {
    let { latitude, longitude, speed, heading, timestamp, accuracy } = this.state.position;
    let { isPositionFetching } = this.state;
    return (
      <div>
        <header>
          <h1>GPS</h1>
        </header>
        <GPSHeading
          heading={heading}
          isFetching={isPositionFetching} />
        <h2>GPS Speed</h2>
        <p>{speed}</p>
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
