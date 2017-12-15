import React, {Component} from 'react';
import { connect } from 'react-redux'
import { clickButton } from '../actions.js';

class Button extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }
  render() {
    const onClick = this.props.click.bind(this);
    return <button
        type="button"
        className="btn btn-primary btn-lg"
        onClick={onClick}>
        Click me!
      </button>;
  }
}

export default connect(
  f => f,
  (dispatch, ownProps) => ({
    click: () => dispatch(clickButton())
  })
)(Button);
