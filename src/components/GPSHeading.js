import React from 'react';
import PropTypes from 'prop-types';

function GPSHeading(props) {
  let headingString;

  if (props.isSupported) {
    if (props.heading) {
      headingString = `${props.heading}\u00B0`;
    } else {
      headingString = `---\u00b0`;
    }
  } else {
    headingString = `---\u00b0 - Not supported by device`;
  }

  return (
    <div className={props.isFetching ? 'loading' : ''}>
      <header>
        <h2>GPS Heading</h2>
      </header>
      <div>
        {headingString}
      </div>
    </div>
  );
}

GPSHeading.propTypes = {
  heading: PropTypes.number,
  isFetching: PropTypes.bool,
  isSupported: PropTypes.bool
};

export default GPSHeading;
