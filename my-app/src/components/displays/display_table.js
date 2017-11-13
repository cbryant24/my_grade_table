import React, { Component } from 'react';
import { connect } from 'react-redux';
import { get_students, update_selection } from '../../actions'

import { render_select } from '../forms/helpers';
import { render_table_header } from './helpers';
import {  Field, reduxForm } from 'redux-form';
import { TOUCH } from 'redux-form/lib/actionTypes';

class Your_Students extends Component {
    componentWillMount() {
        this.props.get_students(this.props.auth.fb_id);
    }

    render_students() {
        debugger
        const student_list = this.props.all_students.map( (item, idx) => {
            return (
                <tr key={idx}>
                    <td>{item.last_name} </td>
                    <td>{item.first_name} </td>
                    <td>{item.student_id}</td>
                    <td><button onClick={ () => this.handle_edit(item)} className=''>Edit</button></td>      
                </tr>
            )
        })
        return student_list
    }

    handle_filter(vals) {

    }

    handle_edit(item) {
        
        debugger
        this.props.update_selection(item)
    }

    render() { 
        const { handleSubmit, all_students } = this.props
        return (
            <div>
                <div>
                    <h4>Your Students</h4>
                </div>
                <div className='row tbl-header'>
                    <table>
                        <thead>
                            {render_table_header({type: 'student'})}
                        </thead>
                    </table>
                </div>
                <div className='tbl-content'>
                    <table>
                        <tbody>
                            {this.render_students()}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    };
};



function mapStateToProps(state) {
    return {
        auth: state.students.auth,
        all_students: state.students.all_students,
        selected_data: state.students.selected_data        
    }
}

Your_Students = reduxForm({
    form: 'filter_student',
})(Your_Students)

export default connect(mapStateToProps,{get_students, update_selection})(Your_Students)