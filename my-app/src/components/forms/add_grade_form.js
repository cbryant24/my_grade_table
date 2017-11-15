import React, { Component } from 'react';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import { get_courses, get_students, get_assignments } from '../../actions'
import axios from 'axios';

import { render_input, render_select } from './helpers'

class Add_Grade extends Component {
    componentWillMount() {
        const {fb_id} = this.props.auth
        this.props.get_courses(fb_id);
        // this.props.get_students(fb_id);
    }
    
    componentWillReceiveProps(nextProps) {
        if(this.props.course !== nextProps.course) {
            if(this.props.location.pathname === '/my-assignments') return
            this.props.get_assignments(nextProps.course)
        }
    }

    onSubmit(vals) {
        axios.post('/api/grades/add', {vals}).then( res => {
            console.log('this is the response from the students post', res)
        })
    }

    render() {
        const { handleSubmit, courses, students, assignments } = this.props
        return (
            <div className=''>
                <form onSubmit={ handleSubmit( (vals) => this.onSubmit(vals) )}>
                    <Field name='courses' component={(input) => render_select(input, {type: 'courses', vals: courses})} label='Course' ></Field>
                    <Field name='students' component={(input) =>  render_select(input, {type: 'students', vals: students})} label='Student' type='select'></Field>
                    <Field name='assignments' component={(input) =>  render_select(input, {type: 'assignments', vals: assignments})} label='Assignment' type='select'></Field>
                    <Field name='grade' component={render_input} label='Grade' type='number'></Field>
                    <button className='btn btn-outline-success'>Submit</button>
                </form>
            </div>
        )
    }
}

const selector = formValueSelector('add_grade')

function mapStateToProps(state) {
    return {
        auth: state.students.auth,
        courses: state.students.user_courses,
        students: state.students.all_students,
        assignments: state.students.user_assignments,
        course: selector(state, 'courses')
    }
}

Add_Grade = reduxForm({
    form: 'add_grade'
})(Add_Grade);

export default connect(mapStateToProps, {get_courses, get_students, get_assignments})(Add_Grade);