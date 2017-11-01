import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import axios from 'axios';

class Add_Course extends Component {
    
    render_input({input, label, value, meta: {submitFailed, pristine, active }}) {
        return (
            <div className='form-group'>
                <label className='col-form-label'>{label}</label>
                <input {...input} className='form-control'/>
            </div>
        )
    }

    onSubmit(vals) {
        const course_vals = {
            vals,
            fb_id: this.props.auth.fb_id
        }
        console.log('these be the vals from student form', course_vals)

        axios.post('/api/courses/add', course_vals).then( res => {
            console.log('this is the response from the students post', res)
        })
    }

    render() {
        const { handleSubmit } = this.props
        return (
            <div>
                <form onSubmit={ handleSubmit( (vals) => this.onSubmit(vals) )}>
                    <Field name='course' component={this.render_input} label='Add Course' type='text'></Field>
                    <Field name='assignment' component={this.render_input} label='Add Assignment' type='text'></Field>                    
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


Add_Course = reduxForm({
    form: 'add_course'
})(Add_Course);


export default connect(mapStateToProps)(Add_Course);