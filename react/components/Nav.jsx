import React from 'react';

const Nav = () => (
  <div classNameName="masthead">
    <nav className="navbar navbar-light bg-light justify-content-between">
      <a className="navbar-brand" href="/">
        react mini
      </a>
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

export default Nav;
