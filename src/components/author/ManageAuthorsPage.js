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
      /*Que?
      * why are we setting state this way?
      * creating a copy of author prop?
      */
      author: Object.assign({}, this.props.author),
      errors: {},
      saving: false
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
    );
  }
}

ManageAuthorsPage.propTypes = {
  author: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps){
  let author = {id: '', firstName: '', lastName: ''};

  return {
    author: author
  };
}

export default connect(mapStateToProps)(ManageAuthorsPage);
