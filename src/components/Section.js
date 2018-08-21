import React from 'react';
import PropTypes from 'prop-types';

function Section(props) {
  return (
    <section className="section">
      {props.children}
    </section>
  );
}

Section.propTypes = {
  children: PropTypes.node
};

export default Section;
