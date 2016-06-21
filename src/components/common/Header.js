import React, {PropTypes} from 'react';
import { Link, IndexLink } from 'react-router';
/*_Tip:
* when do I use deconstruction
* and when do I use import without {}? */
import LoadingDots from './LoadingDots';

/*_Tip: Stateless functional component */

/*_Tip: activeClassName is a feature of both Link and Index link
 * says, when this link is active base don the route
 * go ahead and apply this class */

const Header = ({loading}) => {
  return (

    <nav>
      <IndexLink to="/" activeClassName="active"> Home</IndexLink>
      {" | "}
      <Link to="/about" activeClassName="active">About</Link>
      {" | "}
      <Link to="/courses" activeClassName="active">Courses</Link>
      {" | "}
      <Link to="/authors" activeClassName="active">Authors</Link>
      {/*_Tip:
      * the right hand side of this statement,
      * will only evaluate
      * if the left hand side is true! */}
      
      {loading && <LoadingDots interval={100} dots={20}/>}
    </nav>
  );
};

Header.propTypes = {
  loading: PropTypes.bool.isRequired
};

export default Header;
