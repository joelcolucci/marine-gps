import React from 'react';
import PropTypes from 'prop-types';

function PageHeading(props) {
  return (
    <header>
      <h1 className="page__heading">{props.text}</h1>
    </header>
  );
}

PageHeading.propTypes = {
  text: PropTypes.string
};

export default PageHeading;
