import React, { Component } from 'react';
import Button from './components/Button.jsx';
import { connect } from 'react-redux'
import { fetchData } from './actions.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }
  componentDidMount() {
    this.props.fetch();
  }
  render() {
    return (
      <div>
        <h1>Hot loading in action!</h1>
        <Button/>
      </div>
    );
  }
}

export default connect(
  (state, ownProps) => ({
    loading: state.ui.loading || false,
  }),
  (dispatch, ownProps) => ({
    fetch: () => dispatch(fetchData())
  })
)(App);
