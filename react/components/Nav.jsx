import React from 'react';
import { Link } from 'react-router-dom';

export const Nav = () => (
  <div className="masthead">
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <a className="navbar-brand" href="/">
        react mini
      </a>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <Link className="nav-item nav-link" to="/">
            Home <span className="sr-only">(current)</span>
          </Link>
          <Link to="/github/" className="nav-item nav-link">
            Github
          </Link>
        </div>
      </div>
      <form className="form-inline">
        <input
          className="form-control mr-sm-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
        />
        <button className="btn btn-outline-success" type="submit">
          Search
        </button>
      </form>
    </nav>
  </div>
);
