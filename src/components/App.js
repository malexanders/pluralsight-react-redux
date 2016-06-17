/* _Tip: We need a component on every page that will end up wrapping
the components that we just created. I.E the HomePage and AboutPage*/

/* _Tip: This component handles the App template used on every page. */

/* Que?: Why the {} syntax? */
import React, {PropTypes} from 'react';
import Header from "./common/Header";

/* Que?: What does the extends keyword do exactly? */
class App extends React.Component {
  render(){
    return (
      /* Que?: What does container-fluid do bootstrap? */
      <div className="container-fluid">
        <Header/>
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired
};

export default App;
