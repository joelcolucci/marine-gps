import React from 'react';
import PropTypes from 'prop-types';

import Button from './Button';

function ConnectButton(props) {
  let {
    isConnected,
    isConnecting,
    onConnectClick,
    onDisconnectClick } = props;

  return (
    <React.Fragment>
      {isConnected ? (
        <Button
          text="Disconnect"
          onClick={onDisconnectClick} />
      ) : (
        <Button
          text="Connect"
          disabled={isConnecting}
          onClick={onConnectClick} />
      )}
    </React.Fragment>
  );
}

ConnectButton.propTypes = {
  isConnected: PropTypes.bool,
  isConnecting: PropTypes.bool,
  onConnectClick: PropTypes.func,
  onDisconnectClick: PropTypes.func
};

export default ConnectButton;
