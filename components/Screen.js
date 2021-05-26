import React from 'react';
import PropTypes from 'prop-types';

const Screen = ({ children }) => (
  <div className="mainframe-Screen">{children}</div>
);

Screen.propTypes = {
  children: PropTypes.node,
};

export default Screen;
