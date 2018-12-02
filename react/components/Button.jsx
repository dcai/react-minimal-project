import React from 'react';
import { connect } from 'react-redux';
import { clickButton } from '../redux/actions.js';

const Button = props => {
  const onClick = props.onClick || props.defaultClick.bind(this);
  return (
    <button type="button" className="btn btn-primary btn-lg" onClick={onClick}>
      {props.children}
    </button>
  );
};

export default connect(
  f => f,
  dispatch => ({
    defaultClick: () => dispatch(clickButton()),
  }),
)(Button);
