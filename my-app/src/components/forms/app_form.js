import React, { Component } from 'react';
import { Field, reduxForm, formValues, formValueSelector, change } from 'redux-form';
import { render_input, render_select } from './helpers';
// import render_select from './helpers'
import { connect } from 'react-redux';
import axios from 'axios';
import { update_selection, get_grades, get_courses, get_students, get_assignments, clear_assignments, update_record, get_activity, get_table_assignments } from '../../actions';


class App_Form extends Component {    
    constructor(props) {
        super(props)

        this.state = {
            edit_mode: false
        }
    }
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

    componentWillUnmount() {
        this.props.update_selection({})
        this.props.clear_assignments()
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.course && nextProps.course !== this.props.course) {
            this.props.clear_assignments()
            if(typeof nextProps.course === 'object') return
            if(this.props.location.pathname === '/my-assignments') return
            if(this.props.location.pathname === '/my-courses') return
            this.props.get_assignments(nextProps.course)
        }
        if(nextProps.selected.id !== this.props.selected.id) {
            const { selected } = nextProps
            if(nextProps.location.pathname === '/my-grades') {
                this.props.dispatch(change('student_grade', 'student', {id: selected.student_id, display: `${selected.last_name}, ${selected.first_name}`}))
                this.props.dispatch(change('student_grade', 'course', {id: selected.course_id, display: selected.course_name}))
                this.props.dispatch(change('student_grade', 'assignment', {id: selected.assignment_id, display: selected.assignment_name}))
                this.props.dispatch(change('student_grade', 'grade', selected.grade))
            }
            if(nextProps.location.pathname === '/my-students') {
                this.props.dispatch(change('student_grade', 'first_name', selected.first_name))
                this.props.dispatch(change('student_grade', 'last_name', selected.last_name))
                this.props.dispatch(change('student_grade', 'student_id', selected.student_id))
            }
            if(nextProps.location.pathname === '/my-courses') {
                this.props.dispatch(change('student_grade', 'course', selected.display))
            }
            if(nextProps.location.pathname === '/my-assignments') {
                this.props.dispatch(change('student_grade', 'course', {id: selected.course_id, display: selected.course_name}))                
                this.props.dispatch(change('student_grade', 'assignment', selected.assignment_name))

            }
        }
    }

    form_submit(vals) {
        if(this.state.edit_mode) {
            if(this.props.selected.type === 'grade') {
                let grade_update = {
                    id: this.props.selected.id,
                    student_id: vals.student.id,
                    course_id: vals.course.id,
                    grade: vals.grade,
                    assignment_id: vals.assignment.id,
                    type: this.props.selected.type,
                    fb_id: this.props.auth.fb_id
                }
                axios.put('/api/update',grade_update).then( res => {
                    console.log(res)
                    this.props.reset()
                    this.props.get_activity(this.props.auth.fb_id)
                    this.props.get_grades(this.props.auth.fb_id)
                })
            }
            if(this.props.selected.type === 'student') {
                let student_update = {
                    first_name: vals.first_name,
                    last_name: vals.last_name,
                    student_id: vals.student_id,
                    id: this.props.selected.id,
                    type: this.props.selected.type,
                    fb_id: this.props.auth.fb_id
                }
                axios.put('/api/update',student_update).then( res => {
                    console.log(res)
                    this.props.reset()
                    this.props.get_activity(this.props.auth.fb_id)
                    this.props.get_students(this.props.auth.fb_id)   
                })
            }
            if(this.props.selected.type === 'assignment') {
                debugger
                let assignment_update = {
                    id: this.props.selected.id,
                    assignment_name: vals.assignment,
                    course_id: vals.course.id,
                    type: this.props.selected.type,
                    fb_id: this.props.auth.fb_id
                }
                axios.put('/api/update',assignment_update).then( res => {
                    console.log(res)
                    this.props.reset()
                    this.props.get_activity(this.props.auth.fb_id)
                    this.props.get_table_assignments(this.props.auth.fb_id)                 
                })
            }
            if(this.props.selected.type === 'course') {
    
                let course_update = {
                    course_name: vals.course,
                    fb_id: this.props.auth.fb_id,
                    id: this.props.selected.id,
                    type: this.props.selected.type
                }
                axios.put('/api/update',course_update).then( res => {
                    console.log(res)
                    this.props.reset()
                    this.props.get_activity(this.props.auth.fb_id)
                    this.props.get_courses(this.props.auth.fb_id)
                })
            }
            this.setState({edit_mode: false})
            return
        }
        if(this.props.location.pathname === '/my-students') {
            axios.post('/api/students/add', {vals, fb_id:this.props.auth.fb_id}).then( res => {
                console.log('this is the response from the students post', res)
                this.props.reset()
                this.props.get_activity(this.props.auth.fb_id)
                this.props.get_students(this.props.auth.fb_id)
            })
        }
        if(this.props.location.pathname === '/my-courses') {
            axios.post('/api/courses/add', {vals, fb_id:this.props.auth.fb_id}).then( res => {
                console.log('this is the response from the students post', res)
                this.props.reset()
                this.props.get_activity(this.props.auth.fb_id)
                this.props.get_courses(this.props.auth.fb_id)            
            })
        }
        if(this.props.location.pathname === '/my-assignments') {
            debugger
            axios.post('/api/assignments/add', {vals, fb_id: this.props.auth.fb_id}).then( res => {
                console.log('this is the response from the students post', res)
                this.props.reset()
                this.props.get_activity(this.props.auth.fb_id)
                this.props.get_table_assignments(this.props.auth.fb_id)
                this.props.get_assignments(this.props.auth.fb_id)            
            })
        }
        if(this.props.location.pathname === '/my-grades') {
            axios.post('/api/grades/add', {vals, fb_id: this.props.auth.fb_id }).then( res => {
                console.log('this is the response from the students post', res)
                this.props.reset()
                this.props.get_activity(this.props.auth.fb_id)
                this.props.get_grades(this.props.auth.fb_id)
            })
        }
        
        // this.props.update_record({})
    }

    render() {
        const { pathname } = this.props.location
        const { handleSubmit, courses, students, assignments, selected } = this.props
        switch(pathname) {
            case('/my-students'):
            return (
                <div className='col-sm-6 col-xs-12 student-form'>
                    <form onSubmit={ handleSubmit( vals => this.form_submit(vals) )}>
                        <div className='form-header'><h5>Student</h5></div>
                        <Field name='first_name' component={render_input} label='First Name'></Field>
                        <Field name='last_name' component={render_input} label='Last Name'></Field>
                        <Field name='student_id' component={render_input} label='Student ID'></Field>                    
                        <div className='buttons'>
                            <button className='bttn-material-flat bttn-xs bttn-gray'>Add Student</button>
                            <button onClick={() => this.setState({edit_mode: true})} className='bttn-material-flat bttn-xs bttn-gray'>Update Student</button>
                        </div>                             
                    </form>
                </div>
            )
            case('/my-courses'):
            return (
                <div className='col-sm-6 col-xs-12 student-form'>
                    <form onSubmit={ handleSubmit( vals => this.form_submit(vals) )}>
                        <div className='form-header'><h5>Course</h5></div>
                        <Field name='course' component={render_input} label='Course'></Field>                 
                        <div className='buttons'>
                            <button className='bttn-material-flat bttn-xs bttn-gray'>Add Course</button>
                            <button onClick={() => this.setState({edit_mode: true})} className='bttn-material-flat bttn-xs bttn-gray'>Update Course</button>
                        </div>                           
                    </form>
                </div>
            )
            case('/my-assignments'):
            return (
                <div className='col-sm-6 col-xs-12student-form'>
                    <form onSubmit={ handleSubmit( vals => this.form_submit(vals) )}>
                        <div className='form-header'><h5>Assignment</h5></div>
                        <Field name='course' component={(input) => render_select(input, this.props.courses)} label='Course'></Field> 
                        <Field name='assignment' component={render_input} label='Assignment'></Field>                 
                        <div className='buttons'>
                            <button className='bttn-material-flat bttn-xs bttn-gray'>Add Assignment</button>
                            <button onClick={() => this.setState({edit_mode: true})} className='bttn-material-flat bttn-xs bttn-gray'>Update Assignment</button>
                        </div>                             
                    </form>
                </div>
                
            )
            case('/my-grades'):
            return (
                <div className='col-sm-6 col-xs-12 student-form'>
                    <form onSubmit={ handleSubmit( vals => this.form_submit(vals) )}>
                        <div className='form-header'><h5>Grade</h5></div>
                        <Field name='student' component={(input) =>  render_select(input, students )} label='Student' type='select'></Field>
                        <Field name='course' component={(input) => render_select(input,courses )} label='Course' ></Field>
                        <Field name='assignment' component={(input) =>  render_select(input, assignments )} label='Assignment' type='select'></Field>
                        <Field name='grade' component={render_input} label='Grade' type='number'></Field>
                        <div className='buttons'>
                            <button type='submit' className='bttn-material-flat bttn-xs bttn-gray'>Add Grade</button>
                            <button onClick={() => this.setState({edit_mode: true})} className='bttn-material-flat bttn-xs bttn-gray'>Update Grade</button>
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

export default connect(mapStateToProps, {get_grades, update_selection, get_courses, get_students, get_assignments, clear_assignments, get_activity, get_table_assignments})(reduxForm({
    form: 'student_grade',
}, mapStateToProps)(App_Form))