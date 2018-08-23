
import React from 'react';
import PropTypes from 'prop-types';

import { MdGpsOff, MdGpsFixed } from "react-icons/md";
import ReactLoading from 'react-loading';

function StatusIcon(props) {
  let { isConnected, isConnecting } = props;

  let icon;
  if (isConnecting) {
    icon = <ReactLoading className="icon" type="spin" width={24} height={24} />;
  } else if (isConnected) {
    icon = <MdGpsFixed size={24} />;
  } else {
    icon = <MdGpsOff size={24} />;
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
