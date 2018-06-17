import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap'; // import all js
import React from 'react';
import Button from './components/Button.jsx';
import GithubUser from './components/GithubUser.jsx';
import GithubRepoList from './components/GithubRepoList.jsx';

const App = () => (
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

export default App;
