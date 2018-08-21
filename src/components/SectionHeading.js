import React from 'react';
import PropTypes from 'prop-types';

function SectionHeading(props) {
  return (
    <header>
      <h2 className="section__heading">{props.text}</h2>
    </header>
  );
}

SectionHeading.propTypes = {
  text: PropTypes.string
};

export default SectionHeading;
