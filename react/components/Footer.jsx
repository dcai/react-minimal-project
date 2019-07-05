import React from 'react';
import PropTypes from 'prop-types';

export const Footer = props => (
  <footer
    className="footer"
    style={{
      position: 'absolute',
      width: '100%',
      height: '60px',
      lineHeight: '60px',
      bottom: 0,
      backgroundColor: '#f5f5f5',
    }}
  >
    <div className="container">{props.children}</div>
  </footer>
);
Footer.propTypes = {
  children: PropTypes.element.isRequired,
};
