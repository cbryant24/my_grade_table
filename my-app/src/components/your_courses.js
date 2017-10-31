import React, { Component } from 'react';
import { connect } from 'react-redux';
import { get_courses, search_courses } from '../actions'


class Courses extends Component {

    render() {
        return (
            <div className='col-12'>
                <h1> I'm the Courses </h1>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return ({
        courses: state.students.user_courses,
    })
}

export default connect(mapStateToProps)(Courses);