import React, { Component } from 'react';
import {update_selection} from '../../actions';
import { connect } from 'react-redux'


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
        return <tr></tr>
    }
    
    render_table_list() {
        switch(this.props.vals.type) {
            case 'students': 
                const student_list = this.props.vals.data.map( (item, idx) => {
                    return (
                        <tr key={idx}>
                            <td>{item.last_name} </td>
                            <td>{item.first_name} </td>
                            <td>{item.student_id}</td>
                            <td><button onClick={ () => this.props.update_selection(item)} className=''>Edit</button></td>  
                            <td><button onClick={ () => this.props.update_selection(item)} className=''>Delete</button></td>    
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
                            <td><button onClick={ () => this.props.update_selection(item)} className=''>Edit</button></td>  
                            <td><button onClick={ () => this.props.update_selection(item)} className=''>Delete</button></td>    
                        </tr>
                    )
                })
                return grade_list
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

export default connect(null, {update_selection})(Render_Table)