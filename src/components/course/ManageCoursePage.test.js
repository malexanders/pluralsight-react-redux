import React from 'react';
import expect from 'expect';
import {mount, shallow} from 'enzyme';
import {ManageCoursePage} from './ManageCoursePage';

describe('Manage Course Page', () => {
  it('sets error message when trying to save empty title', () => {
    const props = {
      authors: [],
      /*_Tip:
      * we were defining out saveCourse function,
      * within our mapDispatchToProps function,
      * so, our function isn't getting the expected prop anymore,
      * to fix this,
      * we can create a simple mock,
      * all of our actions were getting passed under a property called actions,
      * so I'll define saveCourse under that,
      * define it as a function,
      * that simple resolves the Promise and returns,
      * this is simply a no opt, as in it does not operations */
      actions: { saveCourse: () => { return Promise.resolve(); }},
      course: {id: '', watchHref: '', title: '', authorId: '', length: '', category: ''},
      errors: {}

    };
    /*_Tip:
    * shallow only renders one layer deep,
    * here we need to test the components interactions with it's child components,
    * more specifically,
    * the title input that sits in the course form component,
    * we need to use mount so that a full DOM is created in memory,
    * behind the scenes,
    * Enzyme is using jsdom to create a virtual in memory DOM */
    const wrapper = mount(<ManageCoursePage {...props} />);
    /*_Tip:
    * you can also grab an element by class or id if one were available */
    const saveButton = wrapper.find('input').last();
    expect(saveButton.prop('type')).toBe('submit');
    /*_Tip:
    * without passing a course in on props,
    * we get the error:
    * TypeError: Cannot read property 'saveCourse' of undefined,
    * simply grab the empty course object from the ManageCoursePage.js */
    saveButton.simulate('click');
    expect(wrapper.state().errors.title).toBe('Title must be at least 5 characters.');




  });
});
