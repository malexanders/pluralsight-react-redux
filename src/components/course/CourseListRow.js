import React, {PropTypes} from 'react';
import {Link} from 'react-router';

const CourseListRow = ({course, onDelete}) => {
  return (
    <tr>
      <td><a href={course.watchHref} target="_blank">Watch</a></td>
      <td><Link to={'/course/' + course.id}>{course.title}</Link></td>
      <td>{course.authorId}</td>
      <td>{course.category}</td>
      <td>{course.length}</td>
      <td>
        <button
          type="submit"
          name="deleteCourseButton"
          onClick={onDelete}
          value={course.id}
        > Delete </button>
      </td>

    </tr>
  );
};

CourseListRow.propTypes = {
  course: PropTypes.object.isRequired
};

export default CourseListRow;
