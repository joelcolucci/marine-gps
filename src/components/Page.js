import React from 'react';
import PropTypes from 'prop-types';

function Page(props) {
  return (
    <div className="page">
      {props.children}
    </div>
  );
}

Page.propTypes = {
  children: PropTypes.node
};

export default Page;
