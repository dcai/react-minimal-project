import { hot } from 'react-hot-loader';
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap'; // import all js
import { Nav } from './components/Nav.jsx';
import { Footer } from './components/Footer.jsx';
import { Github } from './containers/Github.jsx';
import { Home } from './containers/Home.jsx';

const App = () => (
  <Router>
    <Nav />
    <>
      <Route path="/" exact component={Home} />
      <Route path="/github/" exact component={Github} />
    </>
    <Footer>
      <span className="text-muted">Footer</span>
    </Footer>
  </Router>
);

export default hot(module)(App);
