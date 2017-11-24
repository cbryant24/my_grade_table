import React, { Component } from 'react';
import { Field, reduxForm, formValues, change } from 'redux-form';
import { render_input, render_select, validate } from './helpers';
import { connect } from 'react-redux';
import { 
    update_selection, 
    get_grades, 
    get_courses, 
    get_students, 
    get_assignments, 
    clear_assignments, 
    get_activity, 
    get_table_assignments,
    open_close_modal } from '../../actions';

/**
 * @class
 * @classdesc renders a react class component that displays a redux form
 * that allows the user to add/update students, assignments, courses and grades
 */
class App_Form extends Component {    
    constructor(props) {
        super(props)

        this.state = {
            edit_mode: false
        }
    }
    /**
     * @function componentWillMount
     * @returns 
     *  updates redux state students and courses  
     *  by calling action creators get_students, get_courses, 
     *  with user id to display for user selection for adding assignments and grades
     */
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

    /**
     * @function componentWillUnmount
     * @returns clears the users selected record from redux state selected
     * clears state assignments from redux state to clear form for use on other routes
     */
    componentWillUnmount() {
        this.props.update_selection({})
        this.props.clear_assignments()
    }

    /**
     * @function componentWillReceiveProps
     * @param {Object} nextProps 
     * @returns 
     *  if user has selected a new course clears assignments from 
     *  selection and retireves new user selected assignments associated, 
     *  if user has selected a record from the table user form values are
     *  updated to user selected object dependent on route
     */
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


    /**
     * @function form_submit
     * @param {Object} vals redux form vals from user input
     * @returns 
     *  open modal with determined status of users action of create or update
     *  if error or confirmation with completed record object 
     *  for database posting
     */
    form_submit(vals) {
        debugger
        /**
         * normalizing vals object from update object with appropriate property names and values
         */
        if(typeof vals.student === 'object') 
            vals.student = vals.student.id
        if(typeof vals.assignment === 'object') 
            vals.assignment = vals.assignment.id
        if(typeof vals.course === 'object') 
            vals.course = vals.course.id

        /**
         * if user has selected to edit a record the record object for the database is be built here
         */
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
                /**checking for any form validation errors preventing user submission with errors or no vals */
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
                let student_update = {
                    first_name: vals.first_name,
                    last_name: vals.last_name,
                    student_id: vals.student_id,
                    id: this.props.selected.id,
                    type: this.props.selected.type,
                    fb_id: this.props.auth.fb_id
                }
                this.setState({edit_mode: false})
                /**checking for any form validation errors preventing user submission with errors or no vals */
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
                let assignment_update = {
                    id: this.props.selected.id,
                    assignment_name: vals.assignment,
                    course_id: vals.course,
                    type: this.props.selected.type,
                    fb_id: this.props.auth.fb_id
                }
                this.setState({edit_mode: false}) 
                /**checking for any form validation errors preventing user submission with errors or no vals */
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
                let course_update = {
                    course_name: vals.course,
                    fb_id: this.props.auth.fb_id,
                    id: this.props.selected.id,
                    type: this.props.selected.type
                }
                this.setState({edit_mode: false}) 
                /**checking for any form validation errors preventing user submission with errors or no vals */
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

        /**checking for any form validation errors preventing user submission with errors or no vals */
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

    /**
     * @function handle_cancel
     * @returns clears and resets redux form and clears redux state selected of previously selected record
     */
    handle_cancel() {
        this.props.reset();
        this.props.update_selection({})
    }

    render() {
        const { pathname } = this.props.location
        const { handleSubmit, courses, students, assignments, errors } = this.props
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

/**
 * @function mapStateToProps
 * @param {Object} state 
 * @param {Object} ownProps
 * @returns 
 *  adds state selected student to props for form record update for user selected record, 
 *  adds courses state to props for loading of values in form for adding grades and assignemnts
 *  adds students state to props for loading of values in form for adding grades for students
 *  adds assignments state to props for loading of values in form for adding grades
 *  adds auth to state to associate courses and students with the user
 */
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