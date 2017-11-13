import React from 'react';

export function render_table_header(vals) {
    if(vals.type='student') {
        return (
            <tr>
                <th>Last Name</th>
                <th>First Name</th>
                <th>Student ID</th>
                <th>Edit</th>
            </tr>
        )
    }
}

export function render_table_list(vals) {
    if(vals.type='student') {
        const student_list = this.props.all_students.map( (item, idx) => {
            debugger
            return (
                <tr key={idx}>
                    <td>{item.last_name} </td>
                    <td>{item.first_name} </td>
                    <td>{item.student_id}</td>
                    <td><button onClick={ (item) => this.handle_edit(item)} className=''>Edit</button></td>      
                </tr>
            )
        })
        return student_list
    }
}