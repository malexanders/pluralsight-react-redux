import * as types from './actionTypes';
import courseApi from '../api/mockCourseApi';

export function createCourse(course) {
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

  return { type: types.CREATE_COURSE, course: course }; /*_Tip can also write 'course', instead of course: course */
}

/*_Tip:
* first thunk
* a thunk always returns a function that accepts dispatch*/

export function loadCourses() {
  return function(dispatch) {
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


