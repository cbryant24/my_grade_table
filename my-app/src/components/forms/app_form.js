import React, { Component } from 'react';
import { Field, reduxForm, formValues, formValueSelector, change } from 'redux-form';
import { render_input, render_select, validate } from './helpers';
// import render_select from './helpers'
import { connect } from 'react-redux';
import axios from 'axios';
import { 
    update_selection, 
    get_grades, 
    get_courses, 
    get_students, 
    get_assignments, 
    clear_assignments, 
    update_record, 
    get_activity, 
    get_table_assignments,
    open_close_modal } from '../../actions';


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
        if(typeof vals.student === 'object') 
            vals.student = vals.student.id
        if(typeof vals.assignment === 'object') 
            vals.assignment = vals.assignment.id
        if(typeof vals.course === 'object') 
            vals.course = vals.course.id

        if(this.state.edit_mode) {
            if(this.props.selected.type === 'grade') {
                let grade_update = {
                    id: this.props.selected.id,
                    student_id: vals.student,
                    course_id:  vals.course,
                    grade: vals.grade,
                    assignment_id: vals.assignment,
                    type: this.props.selected.type,
                    fb_id: this.props.auth.fb_id
                }
                this.setState({edit_mode: false}) 
                if(validate(grade_update, this.props.location.pathname)) 
                    return this.props.open_close_modal({open: true, type: 'error', data: grade_update})               
                this.props.open_close_modal({
                    open: true, 
                    type: 'update_confirmation', 
                    data: grade_update, 
                    table: this.props.selected.type,                    
                    title: 'Update Grade?',
                    status: 'update',
                    reset: this.props.reset
                })
                return
            }
            if(this.props.selected.type === 'student') {
                debugger
                let student_update = {
                    first_name: vals.first_name,
                    last_name: vals.last_name,
                    student_id: vals.student_id,
                    id: this.props.selected.id,
                    type: this.props.selected.type,
                    fb_id: this.props.auth.fb_id
                }
                this.setState({edit_mode: false})
                if(validate(student_update, this.props.location.pathname)) 
                    return this.props.open_close_modal({open: true, type: 'error', data: student_update})
                
                this.props.open_close_modal({
                    open: true, 
                    type: 'update_confirmation', 
                    data: student_update, 
                    table: this.props.selected.type,                    
                    title: 'Update Student?',
                    status: 'update',
                    reset: this.props.reset
                })
                return
            }
            if(this.props.selected.type === 'assignment') {
                debugger
                let assignment_update = {
                    id: this.props.selected.id,
                    assignment_name: vals.assignment,
                    course_id: vals.course,
                    type: this.props.selected.type,
                    fb_id: this.props.auth.fb_id
                }
                this.setState({edit_mode: false}) 
                if(validate(assignment_update, this.props.location.pathname)) 
                    return this.props.open_close_modal({open: true, type: 'error', data: assignment_update})
                this.props.open_close_modal({
                    open: true, 
                    type: 'update_confirmation', 
                    data: assignment_update, 
                    table: this.props.selected.type,                    
                    title: 'Update Assignment?',
                    status: 'update',
                    reset: this.props.reset
                })
                return
            }
            if(this.props.selected.type === 'course') {
                debugger
                let course_update = {
                    course_name: vals.course,
                    fb_id: this.props.auth.fb_id,
                    id: this.props.selected.id,
                    type: this.props.selected.type
                }
                this.setState({edit_mode: false})                
                if(validate(course_update, this.props.location.pathname)) 
                    return this.props.open_close_modal({open: true, type: 'error', data: course_update})
                this.props.open_close_modal({
                    open: true, 
                    type: 'update_confirmation', 
                    data: course_update, 
                    table: this.props.selected.type,                    
                    title: 'Update Course?',
                    status: 'update',
                    reset: this.props.reset
                })
                return
            }
            this.setState({edit_mode: false})
            this.props.open_close_modal({open: true, type: 'error', data: { errors: {selection: 'Please Select a Record to Edit'}}})
            return
        }
        debugger
        if(validate(vals, this.props.location.pathname)) 
            return this.props.open_close_modal({open: true, type: 'error', data: vals})

        if(this.props.location.pathname === '/my-students') {
            this.props.open_close_modal({
                open: true, 
                type: 'confirmation', 
                data: vals,
                table: 'student',
                title: 'Add Student?', 
                status: 'add',
                reset: this.props.reset
            })
        }
        if(this.props.location.pathname === '/my-courses') {
            this.props.open_close_modal({
                open: true, 
                type: 'confirmation', 
                data: vals,
                table: 'course',
                title: 'Add Course?', 
                status: 'add',
                reset: this.props.reset
            })
        }
        if(this.props.location.pathname === '/my-assignments') {
            debugger
            this.props.open_close_modal({
                open: true, 
                type: 'confirmation', 
                data: vals,
                table: 'assignment',
                title: 'Add Assignment?', 
                status: 'add',
                reset: this.props.reset
            })
        }
        if(this.props.location.pathname === '/my-grades') {
            this.props.open_close_modal({
                open: true, 
                type: 'confirmation', 
                data: vals,
                table: 'grade',
                title: 'Add Grade?', 
                status: 'add',
                reset: this.props.reset
            })
        }
    }

    handle_cancel() {
        this.props.reset();
        this.props.update_selection({})
    }

    render() {
        const { pathname } = this.props.location
        const { handleSubmit, courses, students, assignments, selected, errors } = this.props
        switch(pathname) {
            case('/my-students'):
            return (
                <div className='col-sm-6 col-xs-12 student-form'>
                    <form onSubmit={ handleSubmit( vals => this.form_submit(vals) )}>
                        <div className='form-header'><h5>Student</h5></div>
                        <Field name='first_name' component={render_input} label='First Name'></Field>
                        <Field name='last_name' component={render_input} label='Last Name'></Field>
                        <Field name='student_id' component={render_input} label='Student ID'></Field>                    
                        <div className='row form-bttn'>
                            <div className='col-xs-12 col-sm-10'>
                                <button className='bttn-material-flat bttn-xs bttn-gray'>Add Student</button>
                            </div>
                            <div className='col-xs-12 col-sm-10'>
                                <button onClick={() => this.setState({edit_mode: true})} className='bttn-material-flat bttn-xs bttn-gray'>Update Student</button>
                            </div>
                            <div className='col-xs-12 col-sm-10'>
                                <button type='button' className=' bttn-material-flat bttn-xs bttn-gray' onClick={ () => {this.handle_cancel()}}>Cancel</button>                           
                            </div>
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
                        <div className='row form-bttn'>
                            <div className='col-xs-12 col-sm-10'>
                                <button className='bttn-material-flat bttn-xs bttn-gray'>Add Course</button>
                            </div>
                            <div className='col-xs-12 col-sm-10'>
                                <button onClick={() => this.setState({edit_mode: true})} className='bttn-material-flat bttn-xs bttn-gray'>Update Course</button>
                            </div>
                            <div className='col-xs-12 col-sm-10'>
                                <button type='button' className=' bttn-material-flat bttn-xs bttn-gray' onClick={ () => {this.handle_cancel()}}>Cancel</button>                           
                            </div>
                        </div>                           
                    </form>
                </div>
            )
            case('/my-assignments'):
            return (
                <div className='col-sm-6 col-xs-12 student-form'>
                    <form onSubmit={ handleSubmit( vals => this.form_submit(vals) )}>
                        <div className='form-header'><h5>Assignment</h5></div>
                        <Field name='course' component={(input) => render_select(input, this.props.courses)} label='Course'></Field> 
                        <Field name='assignment' component={render_input} label='Assignment'></Field>                 
                        <div className='row form-bttn'>
                            <div className='col-xs-12 col-sm-10'>
                                <button className='bttn-material-flat bttn-xs bttn-gray'>Add Assignment</button>
                            </div>   
                            <div className='col-xs-12 col-sm-10'>
                                <button onClick={() => this.setState({edit_mode: true})} className='bttn-material-flat bttn-xs bttn-gray'>Update Assignment</button>
                            </div>  
                            <div className='col-xs-12 col-sm-10'>
                                <button type='button' className=' bttn-material-flat bttn-xs bttn-gray' onClick={ () => {this.handle_cancel()}}>Cancel</button>                           
                            </div>                                 
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
                        <div className='row form-bttn'>
                            <div className='col-xs-12 col-sm-10'>
                                <button type='submit' className='bttn-material-flat bttn-xs bttn-gray'>Add Grade</button>
                            </div>
                            <div className='col-xs-12 col-sm-10'>
                                <button onClick={() => this.setState({edit_mode: true})} className='bttn-material-flat bttn-xs bttn-gray'>Update Grade</button>
                            </div>
                            <div className='col-xs-12 col-sm-10'>
                                <button type='button' className='bttn-material-flat bttn-xs bttn-gray' onClick={ () => {this.handle_cancel()}}>Cancel</button>
                            </div>
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

export default connect(mapStateToProps, {
    get_grades, update_selection, 
    get_courses, get_students, 
    get_assignments, 
    clear_assignments, 
    get_activity, 
    get_table_assignments,
    open_close_modal })(reduxForm({
    form: 'student_grade',
    car: 'hello'
}, mapStateToProps)(App_Form))


































