import React from 'react';
import PropTypes from 'prop-types';

function GPSSpeed(props) {
  let speedString;

  if (props.isSupported) {
    if (props.speed) {
      speedString = `${props.speed} m/s`;
    } else {
      speedString = `0 m/s`;
    }
  } else {
    speedString = `0 m/s - Not supported by device`;
  }

  return (
    <div className={props.isFetching ? 'loading' : ''}>
      <header>
        <h2>GPS Speed</h2>
      </header>
      <div>
        {speedString}
      </div>
    </div>
  );
}

GPSSpeed.propTypes = {
  speed: PropTypes.number,
  isFetching: PropTypes.bool,
  isSupported: PropTypes.bool
};

export default GPSSpeed;
