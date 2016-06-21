import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function courseReducer(state = initialState.courses, action){
  switch(action.type) {
    /*_Tip: Anytime you have a switch statement
      *  it's a good idea to have a default
      *  especially true here because
      *  we could have multiple reducers that are handling
      *  different actions. */
    case types.LOAD_COURSES_SUCCESS:
      return action.courses;

    case types.CREATE_COURSE_SUCCESS:
      return [
        ...state,
        /*_Tip:
        * using Object.assign to make sure we are creating our own copy
        * of state
        * instead of attaching to an existing reference */
        Object.assign({}, action.course)
      ];


    case types.UPDATE_COURSE_SUCCESS:
      /*_Tip:
      * since state is immutable
      * we can't just change the appropriate index in the array
      * instead, we need to use the filter function,
      * which is part of ES6,
      * to get a list of all the courses except for the course that is being updated.
      * the spread operator returns a brand new array out of the results returned from filter
      * then, we use Object.assign to create a copy of the course passed in and include it
      * in the array that we are ultimately returning */

      return [
        ...state.filter(course => course.id !== action.course.id),
        Object.assign({}, action.course)
      ];

    case types.DELETE_COURSE_SUCCESS:
      return [...state.filter(course => course.id !== action.courseId)];

    default:
      return state;
  }
}
