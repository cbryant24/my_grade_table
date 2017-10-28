import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import axios from 'axios';

class Add_Student extends Component {
    
    render_input({input, label, value, meta: {submitFailed, pristine, active }}) {
        return (
            <div className='form-group'>
                <label className='col-form-label'>{label}</label>
                <input {...input} className='form-control'/>
                
            </div>
        )
    }

    onSubmit(vals) {
        const user_vals = {
            vals,
            fb_id: this.props.auth.fb_id
        }
        console.log('these be the vals from student form', user_vals)

        axios.post('/api/students/add', user_vals).then( res => {
            console.log('this is the response from the students post', res)
        })
    }

    render() {
        const { handleSubmit } = this.props
        return (
            <div className='col-6'>
                <form onSubmit={ handleSubmit( (vals) => this.onSubmit(vals) )}>
                    <Field name='first_name' component={this.render_input} label='First Name' type='text'></Field>
                    <Field name='last_name' component={this.render_input} label='Last Name' type='text'></Field>
                    <Field name='student_id' component={this.render_input} label='Student ID' type='text'></Field>
                    <button className='btn btn-outline-success'>Submit</button>
                </form>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        auth: state.students.auth
    }
}


Add_Student = reduxForm({
    form: 'add_student'
})(Add_Student);


export default connect(mapStateToProps)(Add_Student);