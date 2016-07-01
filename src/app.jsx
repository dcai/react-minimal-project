import React, { Component } from 'react';
import Location from './location.jsx';

export default class App extends Component {
  render() {
    return (
      <div>
        <h1>Hot loading in action!</h1>
        <Location />
      </div>
    );
  }
}
