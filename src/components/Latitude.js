import React from 'react';
import PropTypes from 'prop-types';

import { Coordinate } from 'geolocation-coordinate';

function Latitude(props) {
  let latitude = new Coordinate(props.degrees, 'latitude');
  let latitudeString = latitude.toString('dd');
  return (
    <div className="measurement">
      {props.degrees ? (
        latitudeString
      ) : (
        '\u2014 \u2014.\u2014 \u2014 \u2014 \u00B0'
      )}
    </div>
  );
}

Latitude.propTypes = {
  degrees: PropTypes.number
};

export default Latitude;
