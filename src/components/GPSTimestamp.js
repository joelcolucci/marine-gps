import React from 'react';
import PropTypes from 'prop-types';

function GPSTimestamp(props) {
  let timestampString
  if (props.timestamp) {
    let timestampDate = new Date(props.timestamp);
    timestampString = `${timestampDate.toLocaleTimeString()} ${timestampDate.toLocaleDateString()}`;
  } else {
    timestampString = '--:--:-- -- --/--/----';
  }

  return (
    <div className={props.isFetching ? 'loading' : ''}>
      <header>
        <h2>GPS Timestamp</h2>
      </header>
      <div>
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
