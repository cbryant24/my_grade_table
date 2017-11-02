import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import axios from 'axios';

import { render_input } from './helpers'

class Add_Course extends Component {

    onSubmit(vals) {
        const course_vals = {
            vals,
            fb_id: this.props.auth.fb_id
        }

        axios.post('/api/courses/add', course_vals).then( res => {
            console.log('this is the response from the students post', res)
        })
    }

    render() {
        const { handleSubmit } = this.props
        return (
            <div>
                <form onSubmit={ handleSubmit( (vals) => this.onSubmit(vals) )}>
                    <Field name='course' component={render_input} label='Add Course' type='text'></Field>
                    <Field name='assignment' component={render_input} label='Add Assignment' type='text'></Field>                    
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