import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';


/*Que? Unusual syntax here, '* as' */
import * as courseActions from '../../actions/courseActions';

class CoursesPage extends React.Component {
  /*_Tip: In the constructor we:
  * initialize state,
  * and also call our bind functions,
  * any function that need to be bound to the this context,
  * this is the best place to do so. */
  constructor(props, context){
    super(props, context);


    this.state = {
      /*_TIP:
      * cannot set state to null, must use empty string instead,
      * otherwise you will get errors in the browser */
      course: { title: "" }
    };


    /* _Tip: binding functions to the 'this' of our courses page component
    * There is another way to do this, by binding this in the render function
    * However, this is not as efficient, so stick to the constructor way.
    * Using bind in render causes a new function to be created on each render */

    this.onTitleChange = this.onTitleChange.bind(this);
    this.onClickSave = this.onClickSave.bind(this);
  }

  /*_Tip:
  * onTitleChange and onClickSave,
  * child functions,
  * called by render. */
  onTitleChange(event) {
    /*Que? Why using const keyword here? Look up const */
    const course = this.state.course;

    /*_Tip:
    * pulling in event
    * pull value out of that event of of the target
    * and then we set that to the title
    * then update our state by calling setState.*/

    course.title = event.target.value;
    this.setState({course: course });
  }

  onClickSave() {
    /*_Tip: this is the function that we need to call
    * to fire off an action that redux will handle.
    * this is the most verbose/ugly way of calling actions through redux
    * there is a more elegant way.*/

    /*_TIP: old way, without using the mapDispatchToProps argument in connect */
    // this.props.dispatch(courseActions.createCourse(this.state.course));

    /*_Tip: new way, by defining mapDispatchToProps below
    * and passing it to connect the way we did
    * defining which actions are available in our component,
    * we can clean up the code in this function,
    * making it easier to read and understand. */

    this.props.actions.createCourse(this.state.course);

  }

  courseRow(course, index) {
    /*Que?: need to have a key any time we are iterating? Why? */
    return <div key={index}>{course.title}</div>;
  }

  /*_Tip
  * render function,
  * typically would just be calling a child component,
  * but here, we put the mark up inline,
  * container components ideally will just call a child component,
  * we are moving to that pattern shortly. */
  render() {

    return (
      <div>
        <h1>Courses</h1>
        {/*_TIP:
        * displaying the list of courses*/}

        {this.props.courses.map(this.courseRow)}
        <h2>Add Course</h2>
        <input
          type="text"
          onChange={this.onTitleChange}
          value={this.state.course.title} />

        <input
          type="submit"
          value="save"
          onClick={this.onClickSave} />
      </div>
    );
  }
}

/*_Tip: PropTypes
Setting up prop validations */
CoursesPage.propTypes = {
  courses: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};


/*_Tip: redux, connect and related functions,
 * call to connect,
  * mapStateToProps function,
  * mapDispatchToProps function. */

/*_Tip:

* 'state' represents the state that is in our redux store
* 'ownProps' this parameter lets us access props that are being attached to this component
*   it's a reference to the components own props.
 *  in this case it will be most useful for accessing routing related props
 *  injected by react-router */

function mapStateToProps(state, ownProps) {

  /*_Tip: returns properties that we would like to see exposed on our compoenents*/
  return {
    /*_Tip:
    * this will allow us to say this.props.courses up in the component
     * state.courses allows us to access the course data that is in our redux store. */

    /*_Tip:
    * .courses property is determined by the choice that we made within our reducer
    * ./reducers/index.js */

    courses: state.courses
  };
}



/*_Tip
* the connect function is what we use to create components that
* can interact with redux
* instead of just exporting the CoursesPage
* I am going to export CoursesPage wrapped in a call to connect
* connect is a higher order component that is going to wrap our courses page
* connect takes two parameters
 * each of these parameters is a function */

/*_Tip:
* the two sets of parentheses looks weird,
* connect call returns a function
* the second set of () is an argument sent to that function
* taking the results of one function and passing it on to another function
* is a common pattern in functional programming */

/*_Tip
 * mapDispatchToProps is for deciding which actions you want to dispatch to your component
 * optional parameter,
  * if you leave it out,
  * our component automatically gets a dispatch property attached to it
  * and this prop is injected by connect,
  * this allows you to use this.props.dispatch in your component.
  * dispatch is a function that allows you to fire off your functions
   *
   * if you add it as a parameter to connect
   * pass dispatch as argument to mapDispatchToProps
   * determines what actions are available in our component
   * wrapping our action creators in a call to dispatch */


function mapDispatchToProps(dispatch){
  return{
  /*_Tip
  with arrow functions
  you can omit the parentheses when there is a single parameter
  we are declaring an anonymous function here, using the arrow function syntax
  calling dispatch,
  then calling courseActions.createCourse and passing course to it

  this call ends up replacing the overly verbose statement in onClickSave,
  where we uses dispatch up in the component.
  This approach is a little cleaner.
  */
  /*_Tip: By wrapping our actions in a call to dispatch,
  * we trigger our flow through redux
  * Que? Is this what links actions - reducers - store? */

    /*Que? Research arrow functions
    * review syntax */
    /* Que? I'm not clear why 'course' is available in this scope */
    /*_Tip: This is still quite verbose
    * redux comes with a helper function that save us from having to manually wrap
    * our actions in a dispace call, it's call
    * bindActionCreators,
    * must be imported, so
    * instead of doing this:
    // createCourse: course => dispatch(courseActions.createCourse(course))

    you can now do this! */

    /*_Tip: bindActionCreators with go through courseActions,
     find all the actions in that file,
     and then wrap them in a call to dispatch,
      since it's going to be all those actions,
      it makes sense to change the parameter name 'createCourse' to 'actions',
      because now we will be mapping to all of the actions
      that sit in the courseActions file.
      you can now access actions in component with
      this.props.actions */

    actions: bindActionCreators(courseActions, dispatch)

    /*_Tip: could also have isolated a single action like so :
     createCourse: bindActionCreators(courseActions.createCourse, dispatch)
    * */


  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);


