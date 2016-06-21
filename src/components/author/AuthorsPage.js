import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import AuthorList from './AuthorList';
import {browserHistory} from 'react-router';

import * as authorActions from '../../actions/authorActions';

class AuthorsPage extends React.Component {
  constructor(props, context){
    super(props, context);

  }

  render() {
    const {authors} = this.props;
    return (
      <div>
        <h1>Authors</h1>
        <input  type="submit"
                value="Add Author"
                className="btn btn-primary"
                onClick={this.redirectToAddAuthorPage}/>
        <AuthorList authors={authors}/>
      </div>
    );
  }
}

AuthorsPage.propTypes = {
  authors: PropTypes.array.isRequired
};


function mapStateToProps(state, ownProps){
  return {
    authors: state.authors
  };
}
export default connect(mapStateToProps)(AuthorsPage);
