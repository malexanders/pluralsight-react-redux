/*_Tip:
* this was extracted away from mapStateToProps function,
* in the ManageCoursePage.js component,
* any time we have complicated data selection,
* or manipulation code,
* we can consider placing it here */

export function authorsFormattedForDropdown(authors) {
  return authors.map(author => {
    return {
      value: author.id,
      text: author.firstName + ' ' + author.lastName
    };
  });
}
