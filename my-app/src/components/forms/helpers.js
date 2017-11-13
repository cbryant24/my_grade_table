import React from 'react';
import { connect } from 'react-redux';

export function render_input({input, label, value, meta: {submitFailed, pristine, active }} ,vals) {
    
    return (
        <div className='form-group'>
            <label className='col-form-label'>{label}</label>
            <input {...input} className='form-control'/>
        </div>
    )
}

export function render_select({input, label, value, meta: {submitFailed, pristine, active}}, obj) {
    debugger
    const options = obj.vals.map( (item, idx) => {
        return <option key={idx} value={item.vals}>{item.display}</option>
    })
    options.unshift(<option key={obj.vals.length} value=''></option>)
    return(
        <div className=''>
            <label className=''>{label}  </label>
            <select {...input} className=''>
                {options}
            </select>
        </div>
    )
}