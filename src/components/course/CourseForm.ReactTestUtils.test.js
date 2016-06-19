import expect from 'expect';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import CourseForm from './CourseForm';

function setup(saving) {
  let props = {
    course: {}, saving: saving, errors: {},
    onSave: () => {},
    onChange: () => {}
  };

  let renderer = TestUtils.createRenderer();
  /*_Tip:
  * spread operator works on objects too,
  * equivalent to typing out the props 1 by 1 */
  renderer.render(<CourseForm{...props}/>);
  let output = renderer.getRenderOutput();

  return {
    props,
    output,
    renderer
  };
}


/*_Tip:
* arrow function could be replaced by an annoymous function */

/*_Tip:
* Example tests using React Test Utils  */
describe('CourseForm via React Test Utils', () => {
  it('renders form and h1', () => {

    /*_Tip:
    * { output } grabs the output from the setup function,
    * the syntax is a little weird!
    * { props } would grab props,
    * { renderer } would grab renderer? */
    const { output } = setup();
    expect(output.type).toBe('form');
    /*_Tip:
    * desctructuring again,
    * grabbing first element of output.props.children array,
    * and saving it to a variable h1 */
    let [ h1, TextInput ] = output.props.children;
    expect(h1.type).toBe('h1');
  });

  it('save button is labeled "Save" when not saving', () => {
    const { output } = setup(false);
    const submitButton = output.props.children[5];
    expect(submitButton.props.value).toBe('Save');
  });

  it('save button is labeled "Saving..." when it is saving', () => {
    const { output } = setup(true);
    const submitButton = output.props.children[5];
    expect(submitButton.props.value).toBe('Saving...');
  });
});
