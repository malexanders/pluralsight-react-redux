import React from 'react';
/* Que?: Why the {} syntax? See react-router docs maybe */
import {Link} from 'react-router';

class HomePage extends React.Component {
  render() {
    return (
      <div className="jumbotron">
        <h1>Plural Sight Administration</h1>
        <p>React, Redux and React Router in ES6 for ultra-responsive web apps</p>
        <Link to="about" className="btn btn-primary btn-lg"> Learn More</Link>
      </div>
    );
  }
}

export default HomePage;
