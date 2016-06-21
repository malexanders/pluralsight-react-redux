import React, {PropTypes} from 'react';
import {Link} from 'react-router';

const AuthorListRow = ({author}) => {
  return (
    <tr>
      <td>{author.firstName}</td>
      <td>{author.lastName}</td>
      <td><Link to={'/author/' + author.id}>edit</Link></td>
    </tr>
  );
};

AuthorListRow.propTypes = {
  author: PropTypes.object.isRequired
};

export default AuthorListRow;
