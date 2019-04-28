import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { deleteEducation } from '../../actions/profileActions';

class Education extends Component {

  handleClick(id) {
    this.props.deleteEducation(id);
  }

  render() {
    const education = this.props.education.map(edu => {
      return (
        <tr key={edu._id}>
            <td>{edu.school}</td>
            <td>{edu.degree}</td>

            <td>
              <Moment format="YYYY/MM/DD">{edu.from}</Moment> - 
              {edu.to === null ? " Now" : (
              <Moment format="YYYY/MM/DD">{edu.to}</Moment>
              )}
            </td>
            <td><button className="btn btn-danger" onClick={this.handleClick.bind(this, edu._id)}>Delete</button></td>
        </tr>
      )
    })
    return (
      <div>
        <h4 className="mb-4">Education credentials</h4>
        <table className="table">
          <thead>
              <tr>
                <th>Company</th>
                <th>Title</th>
                <th>Years</th>
              </tr>
          </thead>
          <tbody>
             {education}
          </tbody>
        </table>
      </div>
    )
  }
}

Education.propTypes = {
  deleteEducation: PropTypes.func.isRequired
}

export default connect(null, { deleteEducation })(Education);
