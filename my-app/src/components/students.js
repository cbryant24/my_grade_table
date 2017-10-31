import React, { Component } from 'react';
import { connect } from 'react-redux';
import { get_students } from '../actions'


class Students extends Component {
    componentWillMount() {
        // this.props.get_students()
    }

    render() {
        return (
            <h1>
                I'm the Home Students
            </h1>
        )
    }
}

function mapStateToProps(state) {
    return ({
        students: state.students.all_students
    })
}

export default connect(mapStateToProps, { get_students })(Students);