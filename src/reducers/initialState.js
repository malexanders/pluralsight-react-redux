/*_Tip:
* this is a file where we will centralize
* our declarations about what is in state */

/*_Tip:
* this is helpful because,
* as you create more and more reducers,
* it gets tricky to remember exactly what is in the store,
* this shows what our store looks like,
* all reducers are dealing with slice of this store,
* now we have a picture of how our store is initialized. */

export default {
  authors: [],
  courses: [],
  ajaxCallsInProgress: 0
};
