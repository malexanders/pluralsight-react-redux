import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {authorsFormattedForDropdown} from '../../selectors/selectors';
import * as courseActions from '../../actions/courseActions';

/*Que? Why do I need courseActions, but not authorsActions here?
 * see bindActionsCreator method at bottom of this file. */

import * as authorActions from '../../actions/authorActions';
import CourseForm from './CourseForm';

/*_Tip:
* toastr is a notifications library */
import toastr from 'toastr';

export class ManageCoursePage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      course: Object.assign({}, this.props.course),
      errors: {},
      saving: false,
      isSaved: false
    };

    this.routerWillLeave = this.routerWillLeave.bind(this);

    this.updateCourseState = this.updateCourseState.bind(this);
    this.saveCourse = this.saveCourse.bind(this);
  }

  componentDidMount() {

    if(this.context.router){
      this.context.router.setRouteLeaveHook(this.props.route, this.routerWillLeave);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.course.id != nextProps.course.id) {
      //Necessary to populate form when existing course is loaded directly
      this.setState({course: Object.assign({}, nextProps.course)});
    }
  }

  componentWillUnmount() {

  }

  /*_Tip:
  * more detail in flux course */
  /* Que? what is going on here exactly?
   * why are we setting state here?
   * why are we using const and let?
   */
  updateCourseState(event) {
    const field = event.target.name;
    let course = this.state.course;
    course[field] = event.target.value;
    return this.setState({course: course});
  }

  courseFormIsValid() {
    let formIsValid = true;
    let errors = {};

    if(this.state.course.title.length < 5) {
      errors.title = 'Title must be at least 5 characters.';
      formIsValid = false;
    }

    this.setState({errors: errors});
    return formIsValid;
  }

  saveCourse(event){
    event.preventDefault();

    if (!this.courseFormIsValid()) {
      return;
    }
    /*_Tip:
    * this is an example use case for local state,
    * the rest of the app doesn't care about the saving state of this form,
    * the saving state needs to be passed down to our course form,
    * because we want to use it to change the behaviour of that particular button. */
    this.setState({saving: true});
    /*_Tip:
    * the promise based nature of thunks makes waiting for them to complete
    * quite simple.
     *
     * to handle an error returned by the promise in the thunk,
     * add .catch here
     * pass the error object to the toastr.error function to display a meaningful error message,
     * once the ajax call has failed,
     * we also need to make sure to update our saving state back to false */
    this.props.actions.saveCourse(this.state.course)
      .then(() => {
        this.setState({isSaved: true});
        this.redirect();
      })
      .catch(error => {
        toastr.error(error);
        this.setState({saving: false});
      });
  }

  routerWillLeave (nextState, router) {
    if(!this.state.isSaved)
      return 'Your work is not saved! Are you sure you want to leave?';
  }

  redirect() {
    this.setState({saving: false});
    toastr.success('Course saved');
    /*_Tip:
     * we are pushing a new item,
     * to the router,
     * on our context object,
     * this will change our url,
     * to /courses */
    this.context.router.push('/courses');
  }

  render() {
    return (
        <CourseForm
          allAuthors={this.props.authors}
          onChange={this.updateCourseState}
          onSave={this.saveCourse}
          course={this.state.course}
          errors={this.state.errors}
          saving={this.state.saving}
        />
    );
  }
}

/*_Tip:
* propTypes needs to have a lowercase p!! otherwise you will get errors. */
ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  route: PropTypes.object
};


/*_Tip:
 * since context types is a static property,
 * it has to be done after the class definition,
 * declare the context types that we want to import on our component,
 *
 * We are referencing the context types that we would expect,
 * we are effectively saying that we want router
 * to be one of the context types that are required
 * by doing this,
 * it makes react-routers context available to us throughout this component
 *
 * Context is a global variable that library authors use
 * but that we as library consumers should avoid
 * global state is generally a bad thing
 * but context is used by both react-router and redux
 * in some places, to provide easy access
 * to the data that we need
 * without having to write boiler plate plumbing code.
 * That is exactly what we are avoiding here.
 * */

ManageCoursePage.contextTypes = {
  router: PropTypes.object
};

function getCourseById(courses, id){

  const course = courses.filter(course => course.id == id);
  if (course) return course[0]; //filter returns an array, so you have to grab the first value.
  return null;
}
function mapStateToProps(state, ownProps) {

  const courseId = ownProps.params.id; // from the path '/course/:id'
  let course = {id: '', watchHref: '', title: '', authorId: '', length: '', category: ''};

  if (courseId && state.courses.length > 0) {
    course = getCourseById(state.courses, courseId);
  }

  return {
    course: course,
    authors: authorsFormattedForDropdown(state.authors)

  };
}


function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(courseActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
