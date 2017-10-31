import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { get_courses, get_students } from '../actions'
import axios from 'axios';

class Add_Grade extends Component {
    componentWillMount() {
        const {fb_id} = this.props.auth
        this.props.get_courses(fb_id);
        this.props.get_students(fb_id);
    }
    
    render_input({input, label, value, meta: {submitFailed, pristine, active }}) {
        return (
            <div className='form-group'>
                <label className='col-form-label'>{label}</label>
                <input {...input} className='form-control'/>
            </div>
        )
    }

    render_students({input}) {
        const options = this.props.students.map( (item, idx) => {
            return <option key={idx} value={item.id}>{item.last_name}, {item.first_name}</option>
        })
        options.unshift(<option key={options.length} value=''></option>)
        return(
            <div className='form-group'>
                <label className='control-label'>Select Student</label>
                <select {...input} className='form-control'>
                    {options}
                </select>
            </div>
        )
    }

    render_courses({input}) {
        const options = this.props.courses.map( (item, idx) => {
            return <option key={idx} value={item.id}>{item.course_name}</option>
        })
        options.unshift(<option key={options.length} value=''>All</option>)
        return(
            <div className='form-group'>
                <label className='control-label'>Select Course</label>
                <select {...input} className='form-control'>
                    {options}
                </select>
            </div>
        )
    }

    onSubmit(vals) {
        debugger
        console.log('these be the vals from student form', vals)

        axios.post('/api/grades/add', {vals}).then( res => {
            console.log('this is the response from the students post', res)
        })
    }

    render() {
        const { handleSubmit } = this.props
        return (
            <div className='col-6'>
                <form onSubmit={ handleSubmit( (vals) => this.onSubmit(vals) )}>
                    <Field name='course' component={(input) => this.render_students(input)} label='Course' type='select'></Field>
                    <Field name='student' component={ (input) => this.render_courses(input)} label='Student' type='select'></Field>
                    <Field name='grade' component={this.render_input} label='Grade' type='number'></Field>
                    <Field name='description' component={this.render_input} label='Description' type='text'></Field>
                    <button className='btn btn-outline-success'>Submit</button>
                </form>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        auth: state.students.auth,
        courses: state.students.user_courses,
        students: state.students.all_students
    }
}


Add_Grade = reduxForm({
    form: 'add_grade'
})(Add_Grade);


export default connect(mapStateToProps, {get_courses, get_students})(Add_Grade);