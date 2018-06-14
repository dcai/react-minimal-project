import React, { Component } from 'react';
import { connect } from 'react-redux';
import { clickButton } from '../actions.js';

class Button extends Component {
  render() {
    const onClick = this.props.onClick || this.props.defaultClick.bind(this);
    return (
      <button type="button" className="btn btn-primary btn-lg" onClick={onClick}>
        {this.props.children}
      </button>
    );
  }
}

export default connect(
  f => f,
  (dispatch, ownProps) => ({
    defaultClick: () => dispatch(clickButton()),
  }),
)(Button);
