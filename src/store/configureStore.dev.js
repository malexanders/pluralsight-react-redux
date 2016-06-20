/* Que? What is middle ware exactly?*/
import {createStore, applyMiddleware} from 'redux';
import rootReducer from '../reducers';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';

import thunk from 'redux-thunk';

/*Que? export 'default'? Look up docs on export.*/
/*_Tip:
* initialState
* good way to initialize your store with some state
* especially when we are doing server side rendering (not being covered in this course) */

/*Que? What does adding rootReducer in createStore function do?
* does it wire up the courseActions with the courseReducer? */
export default function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    /*_Tip: could add more arguments to the applyMiddlware function
    * if there were more middleware we wanted to use */

    /*_Tip:
    * can pass as many pieces of middleware as we want
    * to the apply middleware function */

    /*_Tip:
    * reduxImmutableStateInvariant is only meant to be used in dev
    * it gives us a warning when we accidentally mutate state */
    applyMiddleware(thunk, reduxImmutableStateInvariant())
  );
}

/*_Tip:
* set up a separate configureStore call for development and production */


/*_Tip:
* could add support for hot reloading
* or support for the redux dev tools extension in chrome
* check out react slingshot on github to learn hot to configure
* these other pieces of middleware!
* other applications for middlware include:
* logging
* scheduling actions
* sending crash reports */
