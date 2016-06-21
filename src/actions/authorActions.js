import AuthorApi from '../api/mockAuthorApi';
import * as types from './actionTypes';
import {beginAjaxCall} from './ajaxStatusActions';

export function loadAuthorsSuccess(authors) {
  return {type: types.LOAD_AUTHORS_SUCCESS, authors};
}

export function createAuthorSuccess(author) {
  return {type: types.CREATE_AUTHOR_SUCCESS, author};
}

export function loadAuthors() {
  return function(dispatch) {
    /*_Tip:
    * wouldn't our mock API be the rght place to do this?
    * I.E dispatch(beginAjaxCall()),
    * then we wouldn't have to remember to add this disptach call
    * to every thunk,
    * definitely true,
    * something to consider in a real app,
    * that way it is handled in a centralized way,
    * and peopple don't have to remember to dispatch(beginAjaxCall)
    * in every thunk.
    * In this case,
    * I wanted to avoid adding code to our mock api to avoid adding confusion
    * also, there is another advantage to the current approach,
    * I can decide to not show a preloader for some thunks
    * for instance,
    * Maybe I want to do an optimistic update or delete */
    dispatch(beginAjaxCall());
    return AuthorApi.getAllAuthors().then(authors => {
      dispatch(loadAuthorsSuccess(authors));
    }).catch(error => {
      throw(error);
    });
  };
}

export function saveAuthor(author) {
  return function(dispatch) {
    return AuthorApi.saveAuthor(author).then(author => {
      dispatch(createAuthorSuccess(author));
    }).catch(error => {
      throw(error);
    });
  };
}
