import React from 'react';
import { connect } from 'react-redux';

export function render_input({input, label, value, meta: {submitFailed, pristine, active }}) {
    return (
        <div className='input'>
            <label className='label'>{label}</label>
            <input {...input} className=''/>
        </div>
    )
}

export function render_select({input, label, value, meta: {submitFailed, pristine, active}}, vals) {
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
        </div>
    )
}