import React from 'react';
import {Navigation} from 'react-toolbox';
import { Link, IndexLink } from 'react-router';

require('./style.scss');

const NavigationTest = () => {
  return (
    <div className="nav-wrapper">
      <Navigation type='horizontal'>
        <IndexLink to="/" activeClassName="active"> Home</IndexLink>
        <Link to="/about" activeClassName="active">About</Link>
        <Link to="/courses" activeClassName="active">Courses</Link>
        <Link to="/authors" activeClassName="active">Authors</Link>
      </Navigation>
    </div>
  )
};



export default NavigationTest;
