/* _Tip: We need a component on every page that will end up wrapping
the components that we just created. I.E the HomePage and AboutPage*/

/* _Tip: This component handles the App template used on every page. */

/* Que?: Why the {} syntax? */
import React, {PropTypes} from 'react';
import Header from "./common/Header";
import { AppBar } from 'react-toolbox/lib/app_bar';


/*_Tip:
* must import connect
* now that this is a connected component */
import {connect} from 'react-redux';

/* Que?: What does the extends keyword do exactly? */
class App extends React.Component {
  render(){
    return (
      /* Que?: What does container-fluid do bootstrap? */
      <div className="container-fluid">
        <AppBar/>
        <Header
          loading={this.props.loading}
          courses={this.props.courses}
          authors={this.props.authors}/>
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  courses: PropTypes.number,
  authors: PropTypes.number

};

/*_Tip:
* must connect to the redux store,
* so we can get the loading status
* and pass it down to the header.
* So first, we add a mapStateToProps() */

function mapStateToProps(state, ownProps) {
  return {
    /*_Tip:
    * basically,
    * we are converting the number of ajax calls to a boolean
    * if the number of ajax calls in state is greater than 0 return true */
    loading: state.ajaxCallsInProgress > 0,
    courses: state.courses.length,
    authors: state.authors.length
  };
}

/*_Tip
* must update call down here
* to put connect to use. */
export default connect(mapStateToProps)(App);
