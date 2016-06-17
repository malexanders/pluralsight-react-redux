import {combineReducers} from 'redux';
import courses from './courseReducer';

const rootReducer = combineReducers({
  /*_Tip: Short hand property name
  * Que? Google this!*/
  courses
});

export default rootReducer;
