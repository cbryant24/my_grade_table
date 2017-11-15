import React, { Component } from 'react';
import { Field, reduxForm, formValues, formValueSelector, change } from 'redux-form';
import { render_input, render_select } from './helpers';
// import render_select from './helpers'
import { connect } from 'react-redux';
import { update_selection, get_courses, get_students, get_assignments, clear_assignments, update_record } from '../../actions';


class App_Form extends Component {    
    componentWillMount() {
        const {fb_id} = this.props.auth;
        const {pathname} = this.props.location
        if(pathname === '/my-students') return this.props.get_students(fb_id)
        if(pathname === '/my-courses') return this.props.get_courses(fb_id)
        if(pathname === '/my-assignments') return this.props.get_courses(fb_id)
        if(pathname === '/my-grades') {
            this.props.get_students(fb_id)
            this.props.get_courses(fb_id)
            return
        }
    }

    componentWillReceiveProps(nextProps) {
        debugger
        if(nextProps.course && nextProps.course !== this.props.course) {
            this.props.clear_assignments()
            this.props.get_assignments(nextProps.course)
        }
        if(nextProps.selected.id !== this.props.selected.id) {
            const { selected } = nextProps
            if(nextProps.location.pathname === '/my-grades') {
                debugger
                this.props.dispatch(change('student_grade', 'student', {id: selected.student_id, display: `${selected.last_name}, ${selected.first_name}`}))
                this.props.dispatch(change('student_grade', 'course', {id: selected.course_id, display: selected.course_name}))
                this.props.dispatch(change('student_grade', 'assignment', {id: selected.assignment_id, display: selected.assignment_name}))
                this.props.dispatch(change('student_grade', 'grade', selected.grade))
            }
            if(nextProps.location.pathname === '/my-students') {
                debugger
                this.props.dispatch(change('student_grade', 'first_name', nextProps.selected))
                this.props.dispatch(change('student_grade', 'last_name', nextProps.selected))
                this.props.dispatch(change('student_grade', 'student_id', nextProps.selected))
            }
        }
    }

    form_submit(vals) {
        // if(this.props.selected.type === 'grade') {
        //     let grade_update = {
        //         student_id: vals.student.id,
        //         course_id: vals.course,
        //         grade: vals.grade,
        //         assignment_id: vals.assignment
        //     }
        // }
        // if(this.props.selected.type === '')
        debugger
        // this.props.update_record({})
    }

    // put_update(vals) {
    //     const {update_first_name, update_last_name} = vals
    //     const update_info = {
    //         update_first_name,
    //         update_last_name,
    //         fb_id: this.props.fb_id,
    //         id: this.props.user_selection.student_id
    //     }
    //     this.props.initialize()
    //     this.props.update_student_record(update_info)
    // }

    render() {
        const { pathname } = this.props.location
        const { handleSubmit, courses, students, assignments, selected } = this.props
        switch(pathname) {
            case('/my-students'):
            return (
                <div className='col-6 student-form'>
                    <form onSubmit={ handleSubmit( (vals) => this.form_submit(vals) )}>
                        <div className='form-header'><h5>Student</h5></div>
                        <Field name='first_name' component={render_input} label='First Name'></Field>
                        <Field name='last_name' component={render_input} label='Last Name'></Field>
                        <Field name='student_id' component={render_input} label='Student ID'></Field>                    
                        <div className='buttons'>
                            <button className='bttn-material-flat bttn-xs bttn-gray'>Add Student</button>
                            <button className='bttn-material-flat bttn-xs bttn-gray'>Update Student</button>
                        </div>                             
                    </form>
                </div>
            )
            case('/my-courses'):
            return (
                <div className='col-6 student-form'>
                    <form onSubmit={ handleSubmit( vals => this.form_submit(vals) )}>
                        <div className='form-header'><h5>Course</h5></div>
                        <Field name='course' component={render_input} label='Course'></Field>                 
                        <div className='buttons'>
                            <button className='bttn-material-flat bttn-xs bttn-gray'>Add Grade</button>
                            <button className='bttn-material-flat bttn-xs bttn-gray'>Update Grade</button>
                        </div>                           
                    </form>
                </div>
            )
            case('/my-assignments'):
            return (
                <div className='col-6 student-form'>
                    <form onSubmit={ handleSubmit( vals => this.form_submit(vals) )}>
                        <div className='form-header'><h5>Assignment</h5></div>
                        <Field name='course' component={(input) => render_select(input, this.props.courses)} label='Course'></Field> 
                        <Field name='assignment' component={render_input} label='Assignment'></Field>                 
                        <div className='buttons'>
                            <button className='bttn-material-flat bttn-xs bttn-gray'>Add Assignment</button>
                            <button className='bttn-material-flat bttn-xs bttn-gray'>Update Assignment</button>
                        </div>                             
                    </form>
                </div>
                
            )
            case('/my-grades'):
            return (
                <div className='col-6 student-form'>
                    <form onSubmit={ handleSubmit( vals => this.form_submit(vals) )}>
                        <div className='form-header'><h5>Grade</h5></div>
                        <Field name='student' component={(input) =>  render_select(input, students )} label='Student' type='select'></Field>
                        <Field name='course' component={(input) => render_select(input,courses )} label='Course' ></Field>
                        <Field name='assignment' component={(input) =>  render_select(input, assignments )} label='Assignment' type='select'></Field>
                        <Field name='grade' component={render_input} label='Grade' type='number'></Field>
                        <div className='buttons'>
                            <button className='bttn-material-flat bttn-xs bttn-gray'>Add Grade</button>
                            <button className='bttn-material-flat bttn-xs bttn-gray'>Update Grade</button>
                        </div>
                    </form>
                </div>
                
            )
        }
    }
}

App_Form = formValues('student', 'course', 'grade', 'assignment')(App_Form)

function mapStateToProps(state, ownProps) {
    return {
        selected: state.students.selected,
        courses: state.students.courses,
        students: state.students.students,
        assignments: state.students.assignments,
        auth: state.students.auth
    }
}

export default connect(mapStateToProps, {update_selection, get_courses, get_students, get_assignments, clear_assignments})(reduxForm({
    form: 'student_grade',
}, mapStateToProps)(App_Form))