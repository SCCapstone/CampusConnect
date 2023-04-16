// src/components/NavBar.js

import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav>
      <NavLink to="/CampusConnect" exact activeClassName="active-link" className="nav-link">
        Home
      </NavLink>
      <NavLink to="/CampusConnect/about" activeClassName="active-link" className="nav-link">
        About
      </NavLink>
      <NavLink to="/CampusConnect/repo" activeClassName="active-link" className="nav-link">
        Repo
      </NavLink>
    </nav>
  );
};

export default NavBar;
