import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as authorActions from '../../actions/authorActions';
import AuthorForm from './AuthorForm';

export class ManageAuthorsPage extends React.Component {
  constructor(props, context){
    super(props, context);

    this.state = {
      /*FILL_IN*/
    };
  }

  render() {
    return (
      <AuthorForm
        author={this.state.author}
        onChange={this.updateCourseState}
        onSave={this.saveCourse}
        errors={this.state.errors}
        saving={this.state.saving}
      />
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageAuthorsPage);
