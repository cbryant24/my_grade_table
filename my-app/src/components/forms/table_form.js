import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { render_input } from './helpers';
import { connect } from 'react-redux';
import { update_student_record } from '../../actions';


class Table_Form extends Component {

    put_update(vals) {
        const {update_first_name, update_last_name} = vals
        const update_info = {
            update_first_name,
            update_last_name,
            fb_id: this.props.fb_id,
            id: this.props.user_selection.student_id
        }
        this.props.initialize()
        this.props.update_student_record(update_info)
    }

    render() {
        const { handleSubmit } = this.props
        debugger
        if(this.props.history.location.pathname === '/add_student') {
            return (
                <form className='col-6' onSubmit={ handleSubmit( vals => this.put_update(vals) ) }>
                    <Field name='update_first_name' component={render_input} label='Update First Name'></Field>
                    <Field name='update_last_name' component={render_input} label='Update Last Name'></Field>
                    <button className='waves-effect waves-light btn'>Submit</button>            
                </form>
            )
        }
    }
}

function get_init_vals(form_vals) {

}

function mapStateToProps(state, ownProps) {
    debugger
    return {
        selected_data: state.students.selected_data,   
        initialValues: {
            update_first_name: state.students.selected_data,
            update_last_name: state.students.selected_data
        }
    }
}

export default connect(mapStateToProps, {update_student_record})(reduxForm({
    form: 'update_student',
    enableReinitialize: true
}, mapStateToProps)(Table_Form))