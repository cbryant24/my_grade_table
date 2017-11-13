import React, { Component } from 'react';
import { get_students } from '../../actions'
import { connect } from 'react-redux';
// import Update_Student_Form from '../forms/update_student_form';


class Update_Delete_Student extends Component {
    constructor(props) {
        super(props)

        this.state = {
            student_id: '',
            student_first_name: '',
            student_last_name: ''
        }
    }
    componentWillMount() {
        this.props.get_students(this.props.auth.fb_id)
    }

    render_students() {
        const students = this.props.all_students.map( (item, idx) => {
            return (
                <tr key={idx}>
                    <td>{item.first_name}</td>
                    <td>{item.last_name}</td>
                    <td><button onClick={() => this.load_student(item)} className='waves-effect waves-light'>Update</button></td>                 
                </tr>
            )
        })
        return students
    }

    load_student(vals) {
        this.setState({
            student_id: vals.id,
            student_first_name: vals.first_name,
            student_last_name: vals.last_name
        })
    }

    render() {
        return (
            <div className='row'>
                <table className='col-6'>
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.render_students()}
                    </tbody>
                </table>
                <div className='add-student-form'>
                    {/* <Update_Student_Form fb_id={this.props.auth.fb_id} user_selection={this.state}/> */}
                </div>
            </div>
            
        )
    }
}

function mapStateToProps(state) {
    return {
        all_students: state.students.all_students,
        auth: state.students.auth
    }
}

export default connect(mapStateToProps, { get_students })(Update_Delete_Student);