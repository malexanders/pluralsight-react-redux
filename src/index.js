/*_Tip: this file is the apps entry point */
/* Que?: What is entry point? */

/* _Tip: To use react router, we need to update this file
*         must import router from react-router */

/*_Tip: Turns out, there are a set of features in ES6 that babel cannot transpile
*   so for those, you need to use a polyfill.
*   babel-polyfill fills in all the gaps for us.
*   seems like a good thing to include in every project.
*   50K minified is somewhat large,
*   have to make the decision whether or not babel-polyfill is worth it
*   can always grab individiaul polyfills to make the project build as small as possible `*/
import 'babel-polyfill';
import React from 'react';

/* _Tip: Gives us a render function that works in the browser
*   in React 4.1 react-dom was split off from react
 *   have to pull this in any time we are doing web development
 *   so that we have a render function that works in the browser */
import { render } from 'react-dom';

/*_Tip: Router must be placed in the root of our app to handle routing
*   must choose a way to handle history in react-router
*   browserHistory gives us nice clean urls
 *  assuming use of modern browsers that support html5 and pushstate,
 *  which is what browser history uses behind the scenes
  *  so we just pass this in to the history prop on our Router component */
import { Router, browserHistory } from 'react-router';

/* _Tip: Also need to pass in our routes to Router from routes.js */
import routes from './routes';

/*Que? : Destructuring? */
import {loadCourses} from './actions/courseActions';
import {loadAuthors} from './actions/authorActions';

/* _Tip: With webpack, we can import css just like we do javascript */
/* Que? : Can I import scss/sass just as easily? */
import './styles/styles.css'; /* Webpack can import css files too! */
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';


import configureStore from './store/configureStore';

/*_Tip:
* Provider is a higher order component
* that attaches our store to our react container components */
import {Provider} from 'react-redux';

/*_Tip: NOticing that styles are imported into the entry point file
* now classes for here can simply be applied to components, without having to
* import the css into the component specific files as well.
* Que?: Is there a better way? Look into best practices for SASS and usage of
* front end frameworks like Material, Bourbon, etc. */

/* _Tip: When would you pass initial state to this configureStore call?
* If you are wanting to rehydrate your store using some separate state
* passed down from the server or stored in local storage
* this is a good place to do so */

/*_Tip:
* Once the store is configured,
* we can dispatch actions against the store. */
const store = configureStore();
store.dispatch(loadCourses());
store.dispatch(loadAuthors());

render(
  /*_Tip:
  * effectively, the Provider component is wrapping our entire application
  * so that it can be connected to our redux store
  * this is what our final application entry point looks like
  * now that we have set up react redux and our redux store */
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.getElementById('app')
);

