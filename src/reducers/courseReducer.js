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
    default:
      return state;
  }
}
