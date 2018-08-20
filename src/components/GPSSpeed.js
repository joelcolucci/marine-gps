import React from 'react';
import PropTypes from 'prop-types';

function GPSSpeed(props) {
  let speedString;
  if (props.speed) {
    speedString = `${props.speed} m/s`;
  } else {
    speedString = `0 m/s`;
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
  isFetching: PropTypes.book
};

export default GPSSpeed;
