import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import axios from 'axios';
import { get_activity } from '../../actions'

import { render_input } from './helpers'

class Add_Student extends Component {

    onSubmit(vals) {
        const user_vals = {
            vals,
            fb_id: this.props.auth.fb_id
        }
        console.log('these be the vals from student form', user_vals)

        axios.post('/api/students/add', user_vals).then( res => {
            this.props.get_activity(this.props.auth.fb_id)
        })
        this.props.reset();
    }

    render() {
        const { handleSubmit } = this.props
        return (
            <div className='col-6'>
                <form onSubmit={ handleSubmit( (vals) => this.onSubmit(vals) )}>
                    <Field name='first_name' component={render_input} label='First Name' type='text'></Field>
                    <Field name='last_name' component={render_input} label='Last Name' type='text'></Field>
                    <Field name='student_id' component={render_input} label='Student ID' type='text'></Field>
                    <button className='btn btn-outline-success'>Submit</button>
                </form>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        auth: state.students.auth,
        selected_data: state.students.selected_data
    }
}


Add_Student = reduxForm({
    form: 'add_student'
})(Add_Student);


export default connect(mapStateToProps, { get_activity })(Add_Student);