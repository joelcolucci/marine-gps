import React from 'react';

import Button from '../components/Button';
import FootNote from '../components/FootNote';
import GPSHeading from '../components/GPSHeading';
import GPSPosition from '../components/GPSPosition';
import GPSSpeed from '../components/GPSSpeed';
import GPSTimestamp from '../components/GPSTimestamp';
import Page from '../components/Page';
import PageHeading from '../components/PageHeading';
import Section from '../components/Section';
import SectionHeading from '../components/SectionHeading';

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
      maximumAge: 0,
      timeout: 27000
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
    this.setState({ isGPSEnabled: true });
    this.watchId = navigator.geolocation.watchPosition(
      this.handleGetCurrentPositionSuccess,
      this.handleGetCurrentPositionFailure,
      this.geolocationOptions);
  }

  handleGPSDisableClick(event) {
    this.setState({ isGPSEnabled: false });
    navigator.geolocation.clearWatch(this.watchId);
  }

  render() {
    let { latitude, longitude, speed, heading, timestamp, accuracy } = this.state.position;
    let { isPositionFetching, isSupportedDevice } = this.state;
    return (
      <Page>
        <PageHeading text="Marine GPS" />

        <Section>
          <SectionHeading text="GPS Heading" />
          <GPSHeading
            heading={heading}
            isFetching={isPositionFetching} />
          {!isSupportedDevice && (
            <FootNote text="*Not supported by device" />
          )}
        </Section>

        <Section>
          <SectionHeading text="GPS Speed" />
          <GPSSpeed
            speed={speed}
            isFetching={isPositionFetching} />
          {!isSupportedDevice && (
            <FootNote text="*Not supported by device" />
          )}
        </Section>

        <Section>
          <SectionHeading text="GPS Position" />
          <GPSPosition
            latitude={latitude}
            longitude={longitude}
            accuracy={accuracy}
            isFetching={isPositionFetching} />
        </Section>

        <Section>
          <SectionHeading text="GPS Timestamp" />
          <GPSTimestamp
            timestamp={timestamp} />
        </Section>

        <Section>
          <Button
            text="Enable"
            onClick={this.handleGPSEnableClick}
            disabled={this.state.isGPSEnabled} />
          <Button
            text="Pause"
            onClick={this.handleGPSDisableClick}
            disabled={!this.state.isGPSEnabled} />
        </Section>

      </Page>
    );
  }
}

export default App;
