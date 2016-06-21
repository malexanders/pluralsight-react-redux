import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as authorActions from '../../actions/authorActions';
import AuthorForm from './AuthorForm';
import toastr from 'toastr';

export class ManageAuthorPage extends React.Component {
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

    this.updateAuthorState = this.updateAuthorState.bind(this);
    this.saveAuthor = this.saveAuthor.bind(this);
  }

  updateAuthorState(event){
    const field = event.target.name;
    let author = this.state.author;
    author[field] = event.target.value;
    return this.setState({author: author});
  }

  saveAuthor(event){
    event.preventDefault();
    this.setState({saving: true});
    this.props.actions.saveAuthor(this.state.author)
      .then(() => this.redirect())
      .catch(error => {
        toastr.error(error);
        this.setState({saving: false});
      })
  }

  redirect() {
    this.setState({saving: false});
    toastr.success('Author saved');
    /*_Tip:
     * we are pushing a new item,
     * to the router,
     * on our context object,
     * this will change our url,
     * to /courses */
    this.context.router.push('/authors');
  }


  render() {
    return (
      <AuthorForm
        author={this.state.author}
        onChange={this.updateAuthorState}
        onSave={this.saveAuthor}
        errors={this.state.errors}
        saving={this.state.saving}
      />
    );
  }
}

ManageAuthorPage.contextTypes = {
  router: PropTypes.object
}

ManageAuthorPage.propTypes = {
  author: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

function getAuthorById(authors, id){
  /*Que?
  * seems like you could use find() in place of filter() here.
  * what's the difference between these twp functions */
  const author = authors.filter(author => author.id == id);
  if (author) return author[0];
  return null
}

function mapStateToProps(state, ownProps){

  const authorId = ownProps.params.id; //from the path 'author/:id'
  let author = {id: '', firstName: '', lastName: ''};

  if (authorId && state.authors.length > 0) {
    author = getAuthorById(state.authors, authorId);
  }

  return {
    author: author
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(authorActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageAuthorPage);
