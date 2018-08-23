import React from 'react';

import { MdGpsOff, MdGpsFixed } from "react-icons/md";
import ReactLoading from 'react-loading';

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
    this.handleGetCurrentPositionFailure = this.handleGetCurrentPositionFailure.bind(this);
  }

  handleGPSEnableClick(event) {
    this.setState({
      isPositionFetching: true
    });

    this.watchId = navigator.geolocation.watchPosition(
      this.handleGetCurrentPositionSuccess,
      this.handleGetCurrentPositionFailure,
      this.geolocationOptions);
  }

  handleGPSDisableClick(event) {
    this.setState({ isGPSEnabled: false });
    navigator.geolocation.clearWatch(this.watchId);
  }

  handleGetCurrentPositionSuccess(position) {
    this.setState({
      isPositionFetching: false,
      isGPSEnabled: true
    });

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
    this.setState({
      isPositionFetching: false,
      isGPSEnabled: false
    });

    console.warn(`ERROR(${error.code}): ${error.message}`);
  }

  isGeolocationSupported() {
    return ('geolocation' in navigator);
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
            <FootNote text="Not supported by device" />
          )}
        </Section>

        <Section>
          <SectionHeading text="GPS Speed" />
          <GPSSpeed
            speed={speed}
            isFetching={isPositionFetching} />
          {!isSupportedDevice && (
            <FootNote text="Not supported by device" />
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
          {this.state.isGPSEnabled ? (
            <React.Fragment>
              <Button
                text="Pause"
                onClick={this.handleGPSDisableClick}
                disabled={!this.state.isGPSEnabled} />
              <MdGpsFixed />
            </React.Fragment>
          ) : (
            <React.Fragment>
              {this.state.isPositionFetching ? (
                <React.Fragment>
                  <span>Connecting..</span>
                  <ReactLoading type="spin" width={20} />
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <Button
                    text="Enable"
                    onClick={this.handleGPSEnableClick}
                    disabled={this.state.isPositionFetching} />
                  <MdGpsOff />
                </React.Fragment>
              )}
            </React.Fragment>
          )}
        </Section>

      </Page>
    );
  }
}

export default App;
