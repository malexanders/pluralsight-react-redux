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

const Header = ({loading, courses, authors}) => {
  return (

    <nav>
      <p>{courses} courses</p>
      <p>{authors} authors</p>
      
      {/*_Tip:
      * the right hand side of this statement,
      * will only evaluate
      * if the left hand side is true! */}

      {loading && <LoadingDots interval={100} dots={20}/>}
    </nav>
  );
};

Header.propTypes = {
  loading: PropTypes.bool.isRequired,
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired
};

export default Header;
