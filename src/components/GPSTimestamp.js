import React from 'react';
import PropTypes from 'prop-types';

function GPSTimestamp(props) {
  let timestampString
  if (props.timestamp) {
    let timestampDate = new Date(props.timestamp);
    timestampString = `${timestampDate.toLocaleTimeString()} ${timestampDate.toLocaleDateString()}`;
  } else {
    timestampString = '\u2014:\u2014:\u2014   \u2014  \u2014/\u2014/\u2014';
  }

  return (
    <div className={props.isFetching ? 'loading' : ''}>
      <div className="measurement">
        {timestampString}
      </div>
    </div>
  );
}

GPSTimestamp.propTypes = {
  timestamp: PropTypes.number,
  isFetching: PropTypes.bool
};

export default GPSTimestamp;
