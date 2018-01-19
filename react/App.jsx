import React, { Component } from "react";
import Button from "./components/Button.jsx";
import { connect } from "react-redux";
import { fetchData } from "./actions.js";

class App extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }
  componentDidMount() {
    this.props.fetch();
  }
  render() {
    const items = this.props.githubData.slice(0, 5);
    return (
      <div className="row">
        <div className="col">
          <h1>Counter {this.props.counter}</h1>
          <Button />
        </div>
        <div className="col">
          <h4>react repos</h4>
          <ul>
            {items.length > 0
              ? items.map((item, index) => <li key={index}>{item.name}</li>)
              : "loading"}
          </ul>
        </div>
      </div>
    );
  }
}

export default connect(
  (state, ownProps) => ({
    githubData: state.githubData.items || [],
    counter: state.data.counter || 0,
    loading: state.ui.loading || false
  }),
  (dispatch, ownProps) => ({
    fetch: () => dispatch(fetchData())
  })
)(App);
