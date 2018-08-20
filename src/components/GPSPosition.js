import React from 'react';
import PropTypes from 'prop-types';

import { Coordinate } from 'geolocation-coordinate';

function GPSPosition(props) {
  let latitudeString;
  let longitudeString;
  if (props.latitude === null && props.longitude === null) {
    latitudeString = '--.---\u00B0';
    longitudeString = '--.---\u00B0';
  } else {
    latitudeString = new Coordinate(props.latitude, 'latitude').toString();
    longitudeString = new Coordinate(props.longitude, 'longitude').toString();
  }
  
  return (
    <div className={props.isFetching ? 'loading' : ''}>
      <header>
        <h2>GPS Position</h2>
      </header>
      <div>{latitudeString}</div>
      <div>{longitudeString}</div>
    </div>
  );
}

GPSPosition.propTypes = {
  latitude: PropTypes.number,
  longitude: PropTypes.number,
  isFetching: PropTypes.bool
};

export default GPSPosition;
