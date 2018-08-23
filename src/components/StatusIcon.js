
import React from 'react';
import PropTypes from 'prop-types';

import { MdGpsOff, MdGpsFixed } from "react-icons/md";
import ReactLoading from 'react-loading';

function StatusIcon(props) {
  let { isConnected, isConnecting } = props;

  let icon;
  if (isConnecting) {
    icon = <ReactLoading type="spin" width={20} />;
  } else if (isConnected) {
    icon = <MdGpsFixed />;
  } else {
    icon = <MdGpsOff />;
  }
  return (
    icon
  );
}

StatusIcon.propTypes = {
  isConnected: PropTypes.bool,
  isConnecting: PropTypes.bool,
};

export default StatusIcon;
