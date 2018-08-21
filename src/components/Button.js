import React from 'react';
import PropTypes from 'prop-types';

function Button(props) {
  return (
    <button
      onClick={props.onClick}
      disabled={props.disabled}>{props.text}</button>
  );
}

Button.propTypes = {
  text: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func
};

export default Button;
