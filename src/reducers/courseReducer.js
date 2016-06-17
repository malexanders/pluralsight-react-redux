import * as types from '../actions/actionTypes';

export default function courseReducer(state = [], action){
  switch(action.type) {
    /*_Tip: Anytime you have a switch statement
      *  it's a good idea to have a default
      *  especially true here because
      *  we could have multiple reducers that are handling
      *  different actions. */
    case types.CREATE_COURSE:
      /*_Tip:
      * using ES6 spread operator,
      * This operator spreads the array, essentially explodes all values out
      * and defines them in line, thereby returning a new instance of our state array.
      * Handy way to copy over an array, and create a new array with an extra value inside.
      * the use Object.assign,
      * pass it our target object which is an empty object in this case
      * and then the course that is passed on our action */

      return [...state,
        Object.assign({}, action.course)
      ];

    default:
      return state;
  }
}
