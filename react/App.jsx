import React, { Component } from 'react';
import Button from './components/Button.jsx';
import GithubUser from './components/GithubUser.jsx';
import GithubRepoList from './components/GithubRepoList.jsx';

export default class App extends Component {
  render() {
    return (
      <div className="row">
        <div className="col">
          {/* this uses redux-saga */}
          <GithubUser username="dcai" />
        </div>
        <div className="col">
          {/* this uses redux-thunk */}
          <GithubRepoList />
        </div>
      </div>
    );
  }
}
