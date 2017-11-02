import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { render_input } from './helpers';
import { connect } from 'react-redux';
import { update_student_record } from '../../actions';


class update_student extends Component {

    put_update(vals) {
        const {update_first_name, update_last_name} = vals
        const update_info = {
            update_first_name,
            update_last_name,
            fb_id: this.props.fb_id,
            id: this.props.user_selection.student_id
        }
        this.props.update_student_record(update_info)
    }

    render() {
        const { handleSubmit, initialize, dispatch } = this.props
        return (        
        <form className='col s6' onSubmit={ handleSubmit( vals => this.put_update(vals) ) }>
            <Field name='update_first_name' component={render_input} label='Update First Name'></Field>
            <Field name='update_last_name' component={render_input} label='Update Last Name'></Field>
            <button className='waves-effect waves-light btn'>Submit</button>            
        </form>
        )
    }
}

function mapStateToProps(state, ownProps) {
    debugger
    return {
        initialValues: {
            update_first_name: ownProps.user_selection.student_first_name,
            update_last_name: ownProps.user_selection.student_last_name
        }
    }
}

export default connect(mapStateToProps, {update_student_record})(reduxForm({
    form: 'update_student',
    enableReinitialize: true
}, mapStateToProps)(update_student))