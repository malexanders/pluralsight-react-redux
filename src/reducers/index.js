import {combineReducers} from 'redux';
import courses from './courseReducer';
import authors from './authorReducer';

/*Que?
* interesting,
* here,
* we are importing state from reducer files
* not the name of a function or a class,
* looks like to can access state by the method below,
* not something I would have thought of previously. */
import ajaxCallsInProgress from './ajaxStatusReducer';

const rootReducer = combineReducers({
  /*_Tip: Short hand property name
  * Que? Google this!*/
  
  /*Que?
  * We are accessing state that is being updated
  * inside of reducers here?
  * Initially I thought we were accessing the name of the reducer itself
  * but it looks like we are accessing the state which the reducer is handling. */
  courses,
  authors,
  ajaxCallsInProgress
});

export default rootReducer;
