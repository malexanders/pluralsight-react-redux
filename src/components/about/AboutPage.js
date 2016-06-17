import React from 'react';
import {Link} from 'react-router';

/* _Tip: Could use a stateless component here, however:
*   there are some current limitations with hot reloading
*   where stateless functional components aren't hot reloaded,
*   unless, they have some parent that is a class */

class AboutPage extends React.Component {
  render() {
    return (
      <div>
        <h1>About</h1>
        <p>This application uses React, Redux, React Router and a variety of other helpful libraries</p>
        <Link to="/" className="btn btn-primary btn-lg"> Home </Link>
      </div>
    );
  }
}

export default AboutPage;
