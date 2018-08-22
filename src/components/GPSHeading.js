import React from 'react';
import PropTypes from 'prop-types';

function GPSHeading(props) {
  let headingString;

  if (props.heading) {
    headingString = `${props.heading}\u00B0`;
  } else {
    headingString = `\u2014 \u2014 \u2014 \u00b0`;
  }
  
  return (
    <div className={props.isFetching ? 'loading' : ''}>
      <div className="measurement">
        {headingString}
      </div>
    </div>
  );
}

GPSHeading.propTypes = {
  heading: PropTypes.number,
  isFetching: PropTypes.bool
};

export default GPSHeading;
