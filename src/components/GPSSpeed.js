import React from 'react';
import PropTypes from 'prop-types';

function GPSSpeed(props) {
  let speedString;

  if (props.speed) {
    speedString = `${props.speed} m/s`;
  } else {
    speedString = `\u2014 m/s`;
  }

  return (
    <div className={props.isFetching ? 'loading' : ''}>
      <div className="measurement">
        {speedString}
      </div>
    </div>
  );
}

GPSSpeed.propTypes = {
  speed: PropTypes.number,
  isFetching: PropTypes.bool
};

export default GPSSpeed;
