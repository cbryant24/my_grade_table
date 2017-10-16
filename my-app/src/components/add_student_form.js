import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'

class Add_Student extends Component {
    
    render_input({label, value, meta: {submitFailed, pristine, active }}) {
        return (
            <div className='form-group'>
                <label className='col-form-label'>{label}</label>
                <input className='form-control'/>
                
            </div>
        )
    }

    render() {
        const { pathname } = this.props.location
        return (
            <div className='col-6'>
                <Field name='first_name' component={this.render_input} label='First Name' type='text'></Field>
                <Field name='last_name' component={this.render_input} label='Last Name' type='text'></Field>
                <Field name='student_id' component={this.render_input} label='Student ID' type='text'></Field>
                <Field name='year' component={this.render_input} label='Year' type='text'></Field>
                <Field name='notes' component={this.render_input} label='Notes' type='text'></Field>                                                                                              
                <button className='btn btn-outline-success'>Submit</button>
            </div>
        )
    }
}

export default reduxForm({form: 'add-student'})(Add_Student);