import {combineReducers} from 'redux';
import courses from './courseReducer';
import authors from './authorReducer';

const rootReducer = combineReducers({
  /*_Tip: Short hand property name
  * Que? Google this!*/
  courses,
  authors
});

export default rootReducer;
