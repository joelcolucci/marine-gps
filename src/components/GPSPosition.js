import React from 'react';
import PropTypes from 'prop-types';

import FootNote from './FootNote';
import Latitude from './Latitude';
import Longitude from './Longitude';

function GPSPosition(props) {
  return (
    <div className={props.isFetching ? 'loading' : ''}>
      <Latitude degrees={props.latitude} />
      <Longitude degrees={props.longitude} />
      <FootNote text={`+/- ${props.accuracy} meters`} />
    </div>
  );
}

GPSPosition.propTypes = {
  latitude: PropTypes.number,
  longitude: PropTypes.number,
  accuracy: PropTypes.number,
  isFetching: PropTypes.bool
};

export default GPSPosition;
