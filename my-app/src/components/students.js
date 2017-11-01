import React, { Component } from 'react';
import { connect } from 'react-redux';
import { get_students, get_grades } from '../actions'


class Students extends Component {
    componentWillMount() {
        this.props.get_grades(this.props.auth.fb_id)
    }

    render() {
        debugger
        return (
            <h1>
                I'm the Home Students
            </h1>
        )
    }
}

function mapStateToProps(state) {
    return ({
        student_grades: state.students.student_grades,
        auth: state.students.auth
    })
}

export default connect(mapStateToProps, { get_students, get_grades })(Students);