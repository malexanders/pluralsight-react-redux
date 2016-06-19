import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import HomePage from './components/home/HomePage';
import AboutPage from './components/about/AboutPage';
import CoursesPage from './components/course/CoursesPage';
import ManageCoursePage from './components/course/ManageCoursePage'; //eslint-disable-line import/no-named-as-default

export default (

  /*_Tip:
  *   App component is always loaded
  *   when navigating to '/', pass HomePage to App
  *   when navigating to '/about', pass AboutPage to App
  *   nesting components inside of App based on routing
  *   react router passes components via props to the App component
  *   these components are then composed inside of the App component.
  *   They are accessible in eh App component via {this.props.children} q */
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="about" component={AboutPage} />
    <Route path="courses" component={CoursesPage} />
    <Route path="course" component={ManageCoursePage} />
    <Route path="course/:id" component={ManageCoursePage} />
  </Route>
);
