import React from 'react';
import PropTypes from 'prop-types';

import { Coordinate } from 'geolocation-coordinate';

function Longitude(props) {
  let longitude = new Coordinate(props.degrees, 'longitude');
  let longitudeString = longitude.toString('dd');
  return (
    <div className="measurement">
      {props.degrees ? (
        longitudeString
      ) : (
        '\u2014 \u2014.\u2014 \u2014 \u2014 \u00B0'
      )}
    </div>
  );
}

Longitude.propTypes = {
  degrees: PropTypes.number
};

export default Longitude;
