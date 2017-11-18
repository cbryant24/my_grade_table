import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { update_selection, 
    get_grades, get_courses, 
    get_students, 
    get_assignments, 
    clear_assignments, 
    update_record, 
    get_activity, 
    get_table_assignments,
    open_close_modal } from '../../actions';


class Render_Table extends Component {
    render_table_header() {
        if(this.props.vals.type === 'students') {
            return (
                <tr>
                    <th>Last Name</th>
                    <th>First Name</th>
                    <th>Student ID</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            )
        }
        if(this.props.vals.type === 'grades') {
            return (
                <tr>
                    <th>Last Name</th>
                    <th>First Name</th>
                    <th>Course</th>
                    <th>Assignment</th>
                    <th>Grade</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            )
        }
        if(this.props.vals.type === 'courses') {
            return (
                <tr>
                    <th>Course Name</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            )
        }
        if(this.props.vals.type === 'table_assignments') {
            return (
                <tr>
                    <th>Course Name</th>
                    <th>Assignment Name</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            )
        }
        return <tr></tr>
    }
    
    // delete_record(item) {
    //     axios.post('/api/delete',{...item, fb_id: this.props.fb_id}).then( res => {
    //         debugger
    //         console.log('this is the response from the delete', res)
    //         this.props.get_activity(this.props.fb_id);
    //         if(item.type === 'student') return this.props.get_students(this.props.fb_id)
    //         if(item.type === 'course') return this.props.get_courses(this.props.fb_id)
    //         if(item.type === 'assignment') return this.props.get_table_assignments(this.props.fb_id)                
    //         if(item.type === 'grade') return this.props.get_grades(this.props.fb_id)
    //     })
    // }

    render_table_list() {
        switch(this.props.vals.type) {
            case 'students': 
                const student_list = this.props.vals.data.map( (item, idx) => {
                    return (
                        <tr key={idx}>
                            <td>{item.last_name} </td>
                            <td>{item.first_name} </td>
                            <td>{item.student_id}</td>
                            <td><button onClick={ () => this.props.update_selection(item)} className='bttn-material-flat bttn-xs bttn-gray'>Edit</button></td>  
                            <td><button type='button' onClick={ () => this.delete_record(item)} className='bttn-material-flat bttn-xs bttn-gray'>Delete</button></td>    
                        </tr>
                    )
                })
                return student_list
            case 'grades':
                const grade_list = this.props.vals.data.map( (item, idx) => {
                    return (
                        <tr key={idx}>
                            <td>{item.last_name} </td>
                            <td>{item.first_name} </td>
                            <td>{item.course_name}</td>
                            <td>{item.assignment_name}</td>
                            <td>{item.grade}</td>
                            <td><button onClick={ () => this.props.update_selection(item)} className='bttn-material-flat bttn-xs bttn-gray'>Edit</button></td>  
                            <td><button type='button' onClick={ () => this.props.open_close_modal({
                                data: {...item}, 
                                open: true, 
                                table: item.type, 
                                type: 'confirmation', 
                                title: 'Delete Record?', 
                                status: 'delete'})} className='bttn-material-flat bttn-xs bttn-gray'>Delete</button></td>    
                        </tr>
                    )
                })
                return grade_list
            case 'courses':
                const course_list = this.props.vals.data.map( (item, idx) => {
                    debugger
                    return (
                        <tr key={idx}>
                            <td>{item.course_name} </td>
                            <td><button onClick={ () => this.props.update_selection(item)} className='bttn-material-flat bttn-xs bttn-gray'>Edit</button></td>  
                            <td><button type='button' onClick={ () => this.props.open_close_modal({
                                data: {...item}, 
                                open: true, 
                                table: item.type, 
                                type: 'confirmation', 
                                title: 'Delete Record?', 
                                status: 'delete'})} className='bttn-material-flat bttn-xs bttn-gray'>Delete</button></td>    
                        </tr>
                    )
                })
                return course_list
            case 'table_assignments':
                const assignment_list = this.props.vals.data.map( (item, idx) => {
                    return (
                        <tr key={idx}>
                            <td>{item.course_name} </td>
                            <td>{item.assignment_name} </td>                        
                            <td><button onClick={ () => this.props.update_selection(item)} className='bttn-material-flat bttn-xs bttn-gray'>Edit</button></td>  
                            <td><button type='button' onClick={ () => this.props.open_close_modal({
                                data: {...item}, 
                                open: true, 
                                table: 
                                item.type, 
                                type: 'confirmation', 
                                title: 'Delete Record?', 
                                status: 'delete'})} className='bttn-material-flat bttn-xs bttn-gray'>Delete</button></td>    
                        </tr>
                    )
                })
                return assignment_list
            default:
                return <tr></tr>
        }
    }
    render() {
        if(this.props.header) {
            return this.render_table_header()
        }
        if(this.props.list) {
            return this.render_table_list()
        }
        return <tr></tr>
    }
}

export default connect(null, {update_selection, 
    get_grades, 
    get_courses, 
    get_students, 
    get_assignments, 
    clear_assignments, 
    update_record, 
    get_activity, 
    get_table_assignments,
    open_close_modal})(Render_Table)