import React, { Component } from 'react';
import { withAPI } from '../../../../services/api';

import Students from '../../../../components/Home/Admin/Students';

class StudentsContainer extends Component {
  state = { students: [], isProcessing: false, selectedStudentId: '' };

  componentDidMount() {
    this.getStudents();
  }

  getStudents = () => {
    const { api } = this.props;

    api
      .getStudents()
      .then((response) => {
        this.setState({ students: response.data });
      })
      .catch((error) => console.log(error.response.data.message));
  };

  handleDelete = (e) => {
    const { api } = this.props;
    const id = e.target.dataset.id;

    this.setState({ isProcessing: true, selectedStudentId: id });

    api
      .deleteStudent(id)
      .then(() => this.getStudents())
      .catch((error) => console.log(error.response.data.message));
  };

  handleVerify = (id) => {
    const { api } = this.props;
    api
      .verifyStudent(id)
      .then((response) => console.log(response.data))
      .catch((err) => console.error(err));
  };

  render() {
    const { students, isProcessing, selectedStudentId } = this.state;

    return (
      <Students
        students={students}
        handleDelete={this.handleDelete}
        isProcessing={isProcessing}
        selectedStudentId={selectedStudentId}
        handleVerify={this.handleVerify}
      />
    );
  }
}

export default withAPI(StudentsContainer);
