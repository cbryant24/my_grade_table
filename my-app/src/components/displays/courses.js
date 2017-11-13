import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import Add_Course from '../forms/add_course_form';
import { get_courses, search_courses } from '../../actions';
import { connect } from 'react-redux';




class Courses extends Component {
    componentWillMount() {
        this.props.get_courses(this.props.auth.fb_id)
    }

    render_select({input}) {
        const options = this.props.courses.map( (item, idx) => {
            return <option key={idx} value={item.course_name}>{item.course_name}</option>
        })
        options.unshift(<option key={options.length} value=''>All</option>)
        return(
            <div className='form-group'>
                <label className='control-label'>Search Courses</label>
                <select {...input} className='form-control'>
                    {options}
                </select>
            </div>
        )
    }

    handle_select({ course }) {
        this.props.search_courses(this.props.auth.fb_id, course)
    }

    render() {
        const { handleSubmit } = this.props
        return (
            <div className='col-6'>
                <form onSubmit={ handleSubmit( (vals) => this.handle_select(vals) )}>
                    <Field name="course" component={ (input) => this.render_select(input)} label='Courses'></Field>
                    <button className='btn btn-outline-primary'>Select Course</button>
                </form>
                <Add_Course/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        courses: state.students.user_courses,
        filtered_courses: state.students.selected_course,
        auth: state.students.auth
    }
}

Courses = reduxForm({form: 'courses'})(Courses);

export default connect(mapStateToProps, { get_courses, search_courses })(Courses)