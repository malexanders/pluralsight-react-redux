import React, {PropTypes} from 'react';
import { Link, IndexLink } from 'react-router';

/*_Tip: Stateless functional component */

/*_Tip: activeClassName is a feature of both Link and Index link
 * says, when this link is active base don the route
 * go ahead and apply this class */

const Header = () => {
  return (
    <nav>
      <IndexLink to="/" activeClassName="active"> Home</IndexLink>
      {" | "}
      <Link to="/about" activeClassName="active">About</Link>
      {" | "}
      <Link to="/courses" activeClassName="active">Courses</Link>
    </nav>
  );
};

export default Header;
