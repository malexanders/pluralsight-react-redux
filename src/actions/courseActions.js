import * as types from './actionTypes';
import courseApi from '../api/mockCourseApi';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';


export function loadCoursesSuccess(courses) {
  /*_Tip: to add a break point in ES6, just insert debugger! */


  /*_Tip: Action Naming Convention
  * using SUCCESS suffix for two reasons,
  * loadCourses() already exists,
  * this action does not fire until all authors have been successfully returned by our API call,
  * the suffix helps clarify that our async request was successful,
  * people often creating corresponding failure action type called LOAD_COURSES_FAILURE,
  * OR, LOAD_COURSES_ERROR,
  * To help save time and typing - we are not going to create a corresponding error action for each thunk,
  * But it may be wise to do so in a real app, when you need to treat the failures of different async calls uniquely,
  * for now, we are going to use catch on the promise and throw that error.*/

  return { type: types.LOAD_COURSES_SUCCESS, courses }; /*_Tip can also write 'course', instead of course: course */
}

export function createCourseSuccess(course) {
  return {type: types.CREATE_COURSE_SUCCESS, course};
}

export function updateCourseSuccess(course) {
  return {type: types.UPDATE_COURSE_SUCCESS, course};
}


/*_Tip:
* first thunk
* a thunk always returns a function that accepts dispatch*/

export function loadCourses() {
  return function(dispatch) {

    dispatch(beginAjaxCall());

    /*_Tip:
    * getAllCourses() returns a promise,
    * often how we would want to wire up any kind of a proxy with our apis to return a promise
    * Can choose to handle the promise right here using .then()
    * Handling the promise here with an arrow function,
    * Since there is only one parameter,
    * We can omit the parenthesis around the parameter,
    * So really, we just have an annoymous function here. */
    return courseApi.getAllCourses().then(courses => {
      dispatch(loadCoursesSuccess(courses));
    }).catch(error => {
      /* Que? look up throw docs */
      throw(error);
    });
  };
}

export function saveCourse(course) {
  /*_Tip:
  * notice the optional parameter getState
  * this is useful for cases where you are wanting to access the redux
  * store and get particular peices of state out of it right here
  * without having to pass it in as a parameter
  * not needed in this case,
  * in larger application it can be beneficial to get pieces of state that you need
  * to work within your thunk */
  return function(dispatch, getState) {
    dispatch(beginAjaxCall());
    return courseApi.saveCourse(course).then(course => {
      course.id ? dispatch(updateCourseSuccess(course)) :
        dispatch(createCourseSuccess(course));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      /*_Tip:
      * by just throwing an error here, the app stalls and chrome throughs an error in the console,
      * not such a good user experience.
      *
      * Two Ways to handle this more elegantly:
      * 1. dispatch a saveCourseError action right here
      * and pass it the error message that we've received from our api call
      *
      * 2. handle the rejected promise at the call site
      * which, in this case, is the ManageCoursePage,
      * we are going with this one for this example. */
      throw(error);
    });
  };
}


