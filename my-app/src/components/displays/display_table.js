import React, { Component } from 'react';
import { connect } from 'react-redux';
import { get_students, get_grades, get_courses, update_selection, get_table_assignments } from '../../actions'

import { render_select } from '../forms/helpers';
// import { render_table_header, render_table_list } from './helpers';
import Render_Table from './render_table'
import {  Field, reduxForm } from 'redux-form';

class Your_Students extends Component {
    componentWillMount() {
        const {fb_id} = this.props.auth;
        const {pathname} = this.props.location
        if(pathname === '/my-students') return this.props.get_students(fb_id)
        if(pathname === '/my-courses') return this.props.get_courses(fb_id)
        if(pathname === '/my-assignments') return this.props.get_table_assignments(fb_id)        
        if(pathname === '/my-grades') return this.props.get_grades(fb_id)
    }

    componentWillReceiveProps(nextProps) {
        const {fb_id} = this.props.auth;
        const {pathname} = this.props.location
        if(nextProps.location.pathname !== pathname) {
            if(nextProps.location.pathname === '/my-students') return this.props.get_students(fb_id)
            if(nextProps.location.pathname === '/my-courses') return this.props.get_courses(fb_id)
            if(nextProps.location.pathname === '/my-assignments') return this.props.get_table_assignments(fb_id)                
            if(nextProps.location.pathname === '/my-grades') return this.props.get_grades(fb_id)
        }
    }        

    render() { 
        const { students, courses, grades, assignments, table_assignments } = this.props
        if(this.props.location.pathname === '/my-students') {
            return (
                <div>
                    <div>
                        <h4>Your Students</h4>
                    </div>
                    <div className='row tbl-header'>
                        <table>
                            <thead>
                                <Render_Table header={true} vals={students}/>
                            </thead>
                        </table>
                    </div>
                    <div className='tbl-content'>
                        <table>
                            <tbody>
                                <Render_Table fb_id={this.props.auth.fb_id} list={true} vals={students} />
                            </tbody>
                        </table>
                    </div>
                </div>
            )
        }
        if(this.props.location.pathname === '/my-grades') {
            return (
                <div>
                    <div>
                        <h4>Grades</h4>
                    </div>
                    <div className='row tbl-header'>
                        <table>
                            <thead>
                                <Render_Table header={true} vals={grades}/>
                            </thead>
                        </table>
                    </div>
                    <div className='tbl-content'>
                        <table>
                            <tbody>
                                <Render_Table fb_id={this.props.auth.fb_id} list={true} vals={grades} />
                            </tbody>
                        </table>
                    </div>
                </div>
            )
        }
        if(this.props.location.pathname === '/my-courses') {
            return (
                <div>
                    <div>
                        <h4>Courses</h4>
                    </div>
                    <div className='row tbl-header'>
                        <table>
                            <thead>
                                <Render_Table header={true} vals={courses}/>
                            </thead>
                        </table>
                    </div>
                    <div className='tbl-content'>
                        <table>
                            <tbody>
                                <Render_Table fb_id={this.props.auth.fb_id} list={true} vals={courses} />
                            </tbody>
                        </table>
                    </div>
                </div>
            )
        }
        if(this.props.location.pathname === '/my-assignments') {
            return (
                <div>
                    <div>
                        <h4>Courses</h4>
                    </div>
                    <div className='row tbl-header'>
                        <table>
                            <thead>
                                <Render_Table header={true} vals={table_assignments}/>
                            </thead>
                        </table>
                    </div>
                    <div className='tbl-content'>
                        <table>
                            <tbody>
                                <Render_Table fb_id={this.props.auth.fb_id} list={true} vals={table_assignments} />
                            </tbody>
                        </table>
                    </div>
                </div>
            )
        }
        return <div></div>
        
    
    };
};



function mapStateToProps(state) {
    return {
        auth: state.students.auth,
        grades: state.students.grades,
        courses: state.students.courses,
        students: state.students.students,
        assignments: state.students.assignments,
        table_assignments: state.students.table_assignments,
        selected: state.students.selected        
    }
}

Your_Students = reduxForm({
    form: 'filter_student',
})(Your_Students)

export default connect(mapStateToProps,{get_students, get_grades, get_courses, update_selection, get_table_assignments })(Your_Students)