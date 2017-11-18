import React from 'react';
import { connect } from 'react-redux';

export function render_input({input, label, value, meta: {touched, error}}) {
    return (
        <div className='input'>
            <label className='label'>{label}</label>
            <input {...input} className=''/>
            <div className="form-error text-center"> {touched && error} </div>
        </div>
    )
}

export function render_select({input, label, value, meta: {touched, error}}, vals) {
    const options = vals.data.map( (item, idx) => {
        return <option key={idx} value={item.id}>{item.display}</option>
    })
    options.unshift(<option key={vals.data.length} value={input.value.id}>{input.value.display}</option>)
    return(
        <div className='select'>
            <label className='label'>{label}  </label>
            <select {...input} className=''>
                {options}
            </select>
            <div className="form-error text-center"> {touched && error} </div>
        </div>
    )
}


export const validate = (vals, location) => {
    debugger
    vals.errors = {}
    let errors = false
    const alpha_numeric = new RegExp(/^[0-9a-zA-Z!#@'-, ]+$/);
    const numeric = new RegExp(/^\d+$/);
    if (!vals.first_name || !vals.last_name || !vals.student_id && location === '/my-students') {
        vals.errors.student = 'Enter a Student Name and ID'
        errors = true
    }
    if(!alpha_numeric.test(vals.first_name) || !alpha_numeric.test(vals.last_name) || !alpha_numeric.test(vals.student_id)) {
        vals.errors.student = 'Enter a Valid Student Name And ID'
        errors = true
    }
    if (!vals.course && !vals.course_name && location === '/my-courses') {
        vals.errors.course = 'Enter a Course'
        errors = true
    }
    if(!alpha_numeric.test(vals.course) || !alpha_numeric.test(vals.course_name)) {
        vals.errors.course = 'Enter a Valid Course Name'
        errors = true
    }

    if (location === '/my-assignments' )   {
        if(!vals.course && !vals.course_id) {
            vals.errors.course = 'Select a Course';
            errors = true;
        } 
        if(!vals.assignment && !vals.assignment_name) {
            vals.errors.assignment = 'Enter an Assignment';
            errors = true;
        } 
    }
    if(!alpha_numeric.test(vals.assignment) || !alpha_numeric.test(vals.assignment_name)) {
        vals.errors.assignment = 'Enter a Valid Assignment Name'
        errors = true
    }
    if (location === '/my-grades') {
        if(!vals.student && !vals.student_id){
            vals.errors.student = 'Select a Student'
            errors = true
        } 
        if(!vals.course && !vals.course_id) {
            vals.errors.course = 'Select a Course'
            errors = true
        } 
        if(!vals.assignment && !vals.assignment_id) {
            vals.errors.assignment = 'Select an Assignment'
            errors = true
        }        
        if(!vals.grade) {
            vals.errors.grade = 'Enter a Grade'
            errors = true
        } 
    }
    if(!numeric.test(vals.grade) && vals.grade || vals.grade > 100 || vals.grade < 0) {
        vals.errors.grade = 'Enter a Valid Grade From 0 to 100'
        errors = true
    }
    return errors
};