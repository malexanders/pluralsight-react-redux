import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as courseActions from '../../actions/courseActions';
import * as authorActions from '../../actions/authorActions';
import CourseForm from './CourseForm';

class ManageCoursePage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      course: Object.assign({}, this.props.course),
      errors: {   }
    };

    this.updateCourseState = this.updateCourseState.bind(this);
  }

  /*_Tip:
  * more detail in flux course */
  /* Que? what is going on here exactly? */
  updateCourseState(event) {
    const field = event.target.name;
    let course = this.state.course;
    course[field] = event.target.value;
    return this.setState({course: course});
  }

  render() {
    return (
        <CourseForm
          allAuthors={this.props.authors}
          onChange={this.updateCourseState}
          course={this.state.course}
          errors={this.state.errors}
        />
    );
  }
}

/*_Tip:
* propTypes needs to have a lowercase p!! otherwise you will get errors. */
ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired
};

function mapStateToProps(state, ownProps) {
  let course = {id: '', watchHref: '', title: '', authorId: '', length: '', category: ''};
  console.log(state.authors);
  const authorsFormattedForDropdown = state.authors.map(author => {

    return {
      value: author.id,
      text: author.firstName + ' ' + author.lastName
    };
  });

  return {
    course: course,
    authors: authorsFormattedForDropdown

  };
}


function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(courseActions, authorActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
