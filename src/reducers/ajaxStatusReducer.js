/*_Tip:
* REMEMBER
* when you add a new reducer,
* add the new reducer to your root reducer!
* otherwise it won't get called. */

import * as types from '../actions/actionTypes';
import initialState from './initialState';

function actionTypeEndsInSuccess(type) {
  /*_Tip:
  * Using the substring function,
  * to get the end of our action type,
  * and see whether it ends in SUCCESS */

  /*_Tip:
  * important to note,
  * we are now handling the same action in multiple reducers,
  * any action type that ends in success will now be handled here,
  * as well as in another reducer,
  * nothign wrong with this,
  * in fact it's quite powerful,
  * each reducers is simply a slice of state
  * so, a given action may impact multiple reducers */

  return type.substring(type.length - 8) == '_SUCCESS';
}

export default function ajaxStatusReducer(state = initialState.ajaxCallsInProgress, action) {
  /*_Tip:
  * for simpler reducers like this,
  * an if statement can be preferable */
  if (action.type == types.BEGIN_AJAX_CALL) {
    return state + 1;
  } else if (action.type == types.AJAX_CALL_ERROR || actionTypeEndsInSuccess(action.type)) {
    return state - 1;
  }
  return state;
}

/*_Tip:
* all of our thunks dispatch a success action when the action is complete
* we can use this flag to signal the action is completed */



