import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap'; // import all js
import React from 'react';
import Nav from './components/Nav.jsx';
import Footer from './components/Footer.jsx';
import GithubUser from './components/GithubUser.jsx';
import GithubRepoList from './components/GithubRepoList.jsx';

const App = () => (
  <div>
    <Nav />
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
    <Footer>
      <span className="text-muted">Footer</span>
    </Footer>
  </div>
);

export default App;
