import React from 'react';
import PropTypes from 'prop-types';

const COLORS = {
  BLUE: 'blue',
  RED: 'red'
};

const Info = ({ children, color = COLORS.BLUE }) => (
  <div className={`mainframe-Info color-${color}`}>
    {children}
  </div>
);

Info.propTypes = {
  children: PropTypes.node,
};

Info.COLORS = COLORS;

export default Info;
