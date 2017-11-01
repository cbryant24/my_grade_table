import React, { Component } from 'react';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import { get_courses, get_students, get_assignments } from '../actions'
import axios from 'axios';

class Add_Grade extends Component {
    componentWillMount() {
        const {fb_id} = this.props.auth
        this.props.get_courses(fb_id);
        this.props.get_students(fb_id);
    }
    
    componentWillReceiveProps(nextProps) {
        if(this.props.course !== nextProps.course) {
            this.props.get_assignments(nextProps.course)
        }
    }

    render_input({input, label, value, meta: {submitFailed, pristine, active }}) {
        return (
            <div className='form-group'>
                <label className='col-form-label'>{label}</label>
                <input {...input} className='form-control'/>
            </div>
        )
    }

    render_select({input, label}) {
        debugger
        const options = this.props[input.name].map( (item, idx) => {
            return <option key={idx} value={item.id}>{item.course_name || item.assignment_name || item.last_name + ', ' + item.first_name}</option>
        })
        options.unshift(<option key={this.props[input.name].length} value=''></option>)
        return(
            <div className='form-group'>
                <label className='control-label'>Select { label } </label>
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
                    <Field name='courses' component={(input) => this.render_select(input)} label='Course' type='select'></Field>
                    <Field name='students' component={ (input) => this.render_select(input)} label='Student' type='select'></Field>
                    <Field name='assignments' component={ (input) => this.render_select(input)} label='Assignment' type='select'></Field>
                    <Field name='grade' component={this.render_input} label='Grade' type='number'></Field>
                    <button className='btn btn-outline-success'>Submit</button>
                </form>
            </div>
        )
    }
}

const selector = formValueSelector('add_grade')

function mapStateToProps(state) {
    return {
        auth: state.students.auth,
        courses: state.students.user_courses,
        students: state.students.all_students,
        assignments: state.students.user_assignments,
        course: selector(state, 'courses')
    }
}

Add_Grade = reduxForm({
    form: 'add_grade'
})(Add_Grade);

export default connect(mapStateToProps, {get_courses, get_students, get_assignments})(Add_Grade);