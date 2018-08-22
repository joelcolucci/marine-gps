import React from 'react';
import PropTypes from 'prop-types';

function FootNote(props) {
  return (
    <p className="footnote">{props.text}</p>
  );
}

FootNote.propTypes = {
  text: PropTypes.string
};

export default FootNote;
