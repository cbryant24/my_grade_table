import React from 'react';

export function render_input({input, label, value, meta: {submitFailed, pristine, active }} ,vals) {
    debugger
    return (
        <div className='form-group'>
            <label className='col-form-label'>{label}</label>
            <input {...input} className='form-control'/>
        </div>
    )
}

export function render_select({input, label, value, meta: {submitFailed, pristine, active}}, arr) {
    const options = arr.map( (item, idx) => {
        return <option key={idx} value={item.id}>{item.course_name || item.assignment_name || item.last_name + ', ' + item.first_name}</option>
    })
    options.unshift(<option key={arr.length} value=''></option>)
    return(
        <div className='form-group'>
            <label className='control-label'>Select {label} </label>
            <select {...input} className='form-control'>
                {options}
            </select>
        </div>
    )
}