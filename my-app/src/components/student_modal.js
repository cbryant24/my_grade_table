import React, { Component } from 'react';
import { connect } from 'react-redux';

import ScrollLock from 'react-scrolllock';//npm install react-scrolllock
import Md_Close from 'react-icons/lib/md/close';//npm install react-icons
import { open_close_modal, get_activity, get_grades, get_table_assignments, get_courses, update_selection, get_students } from '../actions';
import axios from 'axios'

import { CSSTransition } from 'react-transition-group'

/**
 * @function Transition
 * @param {object} param0 
 * @returns a container element for wrapped jsx that adds css transitions for wrapped element
 */
const Transition = ({ children, ...props }) => (
    <CSSTransition
      {...props}
      timeout={500}
      classNames="modal-trans">
      {children}
    </CSSTransition>
  );

/**
 * @class
 * @classdesc react class component that displays a modal either confirming the users actions or displaying app messages
 */
class Modal extends Component {
    constructor(props) {
        super(props)

        this.state = {
            grade: [],
            course: {}
        }
    }
    /**
     * @function componentWillReceiveProps
     * @param {Object} nextProps 
     * @returns 
     *  verifies that info user selected when adding grades or 
     *  assignments is the correct record they want to create or edit
     *  by retrieving name associated with assignment id, course id, or student id
     */
    componentWillReceiveProps(nextProps) {
        debugger
        if(nextProps.modal.table === 'grade') {
            axios.post('/api/grades/get-info', {...nextProps.modal.data}).then( grade =>{
                this.setState({ grade: grade.data})
            })
        }
        if(nextProps.modal.table === 'assignment') {
            axios.post('/api/courses/get-info', {data: nextProps.modal.data.course_id || nextProps.modal.data.course } ).then( course =>{
                this.setState({ course: course.data})
            })
        }

    }

    /**
     * @function modal_submit_conf
     * @returns closes confirmation modal and api post to database for add, update and delete
     * for assignments, grades, students, and courses and opens response
     * modal with message from server dependent upon object type
     */
    modal_submit_conf() {
        const { modal } = this.props;
        if(modal.table === 'grade') {
            if(modal.status === 'add') {
                this.props.open_close_modal({open: false})
                axios.post('/api/grades/add', {vals: modal.data, fb_id: this.props.auth.fb_id }).then( res => {
                    this.props.open_close_modal({open: true, type:'message', message: res.data.msg, title: 'Grade Added'})
                    modal.reset()
                    this.props.get_activity(this.props.auth.fb_id)
                    this.props.get_grades(this.props.auth.fb_id)
                    this.props.update_selection({})                    
            })
            }
            if(modal.status === 'update') {
                this.props.open_close_modal({open: false})               
                axios.put('/api/update',modal.data).then( res => {
                    this.props.open_close_modal({open: true, type:'message', message: res.data.msg, title: 'Grade Updated'})          
                    modal.reset()
                    this.props.get_activity(this.props.auth.fb_id)
                    this.props.get_grades(this.props.auth.fb_id)
                    this.props.update_selection({})                    
                })
            }
            if(modal.status === 'delete') {
                this.props.open_close_modal({open: false})                
                axios.post('/api/delete', {...modal.data, fb_id: this.props.auth.fb_id }).then( res => {
                    this.props.open_close_modal({open: true, type:'message', message: res.data.msg, title: 'Grade Deleted'})          
                    this.props.get_activity(this.props.auth.fb_id)
                    this.props.get_grades(this.props.auth.fb_id)
                })
            }
        }
        if(modal.table === 'assignment') {
            if(modal.status === 'add') {
                this.props.open_close_modal({open: false})
                axios.post('/api/assignments/add', {vals: modal.data, fb_id: this.props.auth.fb_id }).then( res => {
                    this.props.open_close_modal({open: true, type:'message', message: res.data.msg, title: 'Assignment Added'})
                    this.props.get_activity(this.props.auth.fb_id)
                    this.props.get_table_assignments(this.props.auth.fb_id)
                    modal.reset()
                    this.props.update_selection({})                    
            })
            }
            if(modal.status === 'update') {
                this.props.open_close_modal({open: false})               
                axios.put('/api/update',modal.data).then( res => {
                    this.props.get_activity(this.props.auth.fb_id)
                    this.props.get_table_assignments(this.props.auth.fb_id)  
                    this.props.open_close_modal({open: true, type:'message', message: res.data.msg, title: 'Assignment Updated'})                    
                    modal.reset()
                    this.props.update_selection({})                    
                })
            }
            if(modal.status === 'delete') {
                this.props.open_close_modal({open: false})                
                axios.post('/api/delete', {...modal.data, fb_id: this.props.auth.fb_id }).then( res => {
                    this.props.open_close_modal({open: true, type:'message', message: res.data.msg, title: 'Assignment Deleted'})                    
                    this.props.get_activity(this.props.auth.fb_id)
                    this.props.get_table_assignments(this.props.auth.fb_id)  
                    this.props.update_selection({})                    
                })
            }
        }
        if(modal.table === 'course') {
            if(modal.status === 'add') {
                this.props.open_close_modal({open: false})
                axios.post('/api/courses/add', {vals: modal.data, fb_id: this.props.auth.fb_id }).then( res => {
                    this.props.open_close_modal({open: true, type:'message', message: res.data.msg, title: 'Course Added'})
                    this.props.get_activity(this.props.auth.fb_id)
                    this.props.get_courses(this.props.auth.fb_id)  
                    modal.reset()
                    this.props.update_selection({})                    
            })
            }
            if(modal.status === 'update') {
                this.props.open_close_modal({open: false})               
                axios.put('/api/update',modal.data).then( res => {
                    this.props.get_activity(this.props.auth.fb_id)
                    this.props.get_courses(this.props.auth.fb_id)  
                    this.props.open_close_modal({open: true, type:'message', message: res.data.msg, title: 'Course Updated'})                    
                    modal.reset()
                    this.props.update_selection({})
                    
                })
            }
            if(modal.status === 'delete') {
                this.props.open_close_modal({open: false})                
                axios.post('/api/delete', {...modal.data, fb_id: this.props.auth.fb_id }).then( res => {
                    this.props.open_close_modal({open: true, type:'message', message: res.data.msg, title: 'Course Deleted'})                    
                    this.props.get_activity(this.props.auth.fb_id)
                    this.props.get_courses(this.props.auth.fb_id)
                    this.props.update_selection({})
                    
                })
            }
        }
        if(modal.table === 'student') {
            if(modal.status === 'add') {
                this.props.open_close_modal({open: false})
                axios.post('/api/students/add', {vals: modal.data, fb_id: this.props.auth.fb_id }).then( res => {
                    this.props.open_close_modal({open: true, type:'message', message: res.data.msg, title: 'Student Added'})
                    this.props.get_activity(this.props.auth.fb_id)
                    this.props.get_students(this.props.auth.fb_id)  
                    modal.reset()
                    this.props.update_selection({})                    
            })
            }
            if(modal.status === 'update') {
                this.props.open_close_modal({open: false})               
                axios.put('/api/update',modal.data).then( res => {
                    this.props.get_activity(this.props.auth.fb_id)
                    this.props.get_students(this.props.auth.fb_id)  
                    this.props.open_close_modal({open: true, type:'message', message: res.data.msg, title: 'Student Updated'})                    
                    modal.reset()
                    this.props.update_selection({})
                })
            }
            if(modal.status === 'delete') {
                this.props.open_close_modal({open: false})                
                axios.post('/api/delete', {...modal.data, fb_id: this.props.auth.fb_id }).then( res => {
                    this.props.open_close_modal({open: true, type:'message', message: res.data.msg, title: 'Student Deleted'})                    
                    this.props.get_activity(this.props.auth.fb_id)
                    this.props.get_students(this.props.auth.fb_id)
                    this.props.update_selection({})
                })
            }
        }
    }
    /**
     * @function render_modal_data
     * @returns a modal response or confirmation dependent upon
     * current redux modal state of type and table 
     */
    render_modal_data() {
        const { modal } = this.props;
        if(modal.type === 'update_confirmation' || modal.type === 'confirmation') {
            if(modal.table === 'grade' && this.state.grade.length > 0) {
                return (
                    <div>
                        <div id='modal-header'>
                            <span className='close-icon' onClick={()=> this.props.open_close_modal({open: false})}><Md_Close/></span>
                            <h4 className='text-center'>{modal.title}</h4>
                        </div>
                        <div>
                            <div className='modal-data'>
                                <div><p>Student: <span>{this.state.grade[0].last_name},{this.state.grade[0].first_name}</span></p></div>
                                <div><p>Course: <span>{this.state.grade[0].course_name}</span></p></div>
                                <div><p>Assignment: <span>{this.state.grade[0].assignment_name}</span></p></div>
                                <div><p>Grade: <span>{modal.data.grade}</span></p></div>
                                        <button onClick={() => this.modal_submit_conf()} className='bttn-material-flat bttn-xs bttn-gray'>Submit</button>
                                        <button onClick={()=> this.props.open_close_modal({open: false})} className='bttn-material-flat bttn-xs bttn-gray'>Cancel</button>                                        
                            </div>
                        </div>
                    </div>
                )
            }
            if(modal.table === 'assignment') {
                return (
                    <div>
                        <div id='modal-header'>
                            <span className='close-icon' onClick={()=> this.props.open_close_modal({open: false})}><Md_Close/></span>
                            <h4 className='text-center'>{modal.title}</h4>
                        </div>
                        <div>
                            <div className='modal-data'>
                                <div><p>Course: <span>{this.state.course.course_name}</span></p></div>
                                <div><p>Assignment: <span>{modal.data.assignment_name || modal.data.assignment}</span></p></div>
                                    <button onClick={() => this.modal_submit_conf()} className='bttn-material-flat bttn-xs bttn-gray'>Submit</button>
                                    <button onClick={()=> this.props.open_close_modal({open: false})} className='bttn-material-flat bttn-xs bttn-gray'>Cancel</button>                                        
                            </div>
                        </div>
                    </div>
                )
            }
            if(modal.table === 'course') {
                return (
                    <div>
                        <div id='modal-header'>
                            <span className='close-icon' onClick={()=> this.props.open_close_modal({open: false})}><Md_Close/></span>
                            <h4 className='text-center'>{modal.title}</h4>
                        </div>
                        <div>
                            <div className='modal-data'>
                                <div><p>Course: <span>{modal.data.course_name || modal.data.course}</span></p></div>
                                        <button onClick={() => this.modal_submit_conf()} className='bttn-material-flat bttn-xs bttn-gray'>Submit</button>
                                        <button onClick={()=> this.props.open_close_modal({open: false})} className='bttn-material-flat bttn-xs bttn-gray'>Cancel</button>                                        
                            </div>
                        </div>
                    </div>
                )
            }
            if(modal.table === 'student') {
                return (
                    <div>
                        <div id='modal-header'>
                            <span className='close-icon' onClick={()=> this.props.open_close_modal({open: false})}><Md_Close/></span>
                            <h4 className='text-center'>{modal.title}</h4>
                        </div>
                        <div>
                            <div className='modal-data'>
                                <div><p>Last Name: <span>{modal.data.last_name}</span></p></div>
                                <div><p>First Name: <span>{modal.data.first_name}</span></p></div>
                                <div><p>Student ID: <span>{modal.data.student_id}</span></p></div>                                
                                    <button onClick={() => this.modal_submit_conf()} className='bttn-material-flat bttn-xs bttn-gray'>Submit</button>
                                    <button onClick={()=> this.props.open_close_modal({open: false})} className='bttn-material-flat bttn-xs bttn-gray'>Cancel</button>                                        
                            </div>
                        </div>
                    </div>
                )
            }
        }
        
        if(modal.type === 'error') {
            let errors = []
            for(let name in modal.data.errors) {
                errors.push(<li key={name}>{modal.data.errors[name]}</li>)
            }
            return (
                <div>
                    <div id='modal-header'>
                        <span className='close-icon' onClick={()=> this.props.open_close_modal({open: false})}><Md_Close/></span>
                        <h4 className='text-center'>Error!</h4>
                    </div>
                        <div>
                            <div className='modal-data'>
                        <ul className='error'>
                            {errors}
                        </ul>
                        </div>
                        <button onClick={()=> this.props.open_close_modal({open: false})} className='bttn-material-flat bttn-xs bttn-gray'>Close</button>
                    </div>
                </div>

            )
        }

        if(modal.type === 'message') {
            return (
                <div>
                    <div id='modal-header'>
                        <span className='close-icon' onClick={()=> this.props.open_close_modal({open: false})}><Md_Close/></span>
                        <h4 className='text-center'>{modal.title}</h4>
                    </div>
                        <div>
                        <div className='modal-data'>
                        <p className='text-center'>{modal.message}</p>
                        </div>
                    </div>
                    <button onClick={()=> this.props.open_close_modal({open: false})} className='bttn-material-flat bttn-xs bttn-gray'>Close</button>
                </div>
            )
        }
    }

    render() {
        const {modal} = this.props
            return (
                <div>
                    {modal.open ?  <ScrollLock/> : ''}
                    <div onClick={()=> this.props.open_close_modal({open: false})} className={modal.open ? '':'hide'} id='backdrop'>
                    </div>
                    <Transition in={this.props.modal.open}>
                        <div className={`container ${modal.open ? 'modal-open': 'modal-closed'}`}>
                            <div>
                                {this.render_modal_data()}
                            </div>
                        </div>
                    </Transition>
                </div>
            )
    }
}

/**
 * @function mapStateToProps
 * @param {Object} state 
 * @returns adds state auth to props for api posts to the database for associated data
 * @returns adds modal state to component to allow for global open and closing status for modal
 */


function mapStateToProps(state) {
    return {
        modal: state.students.modal,
        auth: state.students.auth
    }
}

export default connect(mapStateToProps, {open_close_modal, get_activity, get_grades, get_table_assignments, get_courses, update_selection, get_students })(Modal)