import React from 'react';
import GithubUser from '../components/GithubUser.jsx';
import GithubRepoList from '../components/GithubRepoList.jsx';

export const Github = () => (
  <main role="main" className="container">
    <div className="row">
      <div className="col-sm">
        <GithubUser username="dcai" />
      </div>
      <div className="col-sm">
        <GithubRepoList />
      </div>
    </div>
  </main>
);
