import React from 'react';
import PropTypes from 'prop-types';

function GPSSpeed(props) {
  let speedInMetersSecond = props.speed;
  let speedInKnots = speedInMetersSecond * 1.943842816446084;

  let speedInKnotsString = speedInKnots.toFixed(1);
  let speedString;
  if (props.speed) {
    speedString = `${speedInKnotsString} Knots`;
  } else {
    speedString = `\u2014 Knots`;
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
