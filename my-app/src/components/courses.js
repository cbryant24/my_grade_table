import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';


class Courses extends Component {

    render_select({label}) {
        const options = [
            <option key='0' value=''></option>, 
            <option key='1' value="Math">Math</option>,
            <option key='2' value="History">History</option>,
            <option key='3' value="Art">Art</option>
        ]
        return(
            <div className='form-group'>
                <label className='control-label'>{label}</label>
                <select className='form-control'>
                    {options}
                </select>
            </div>
        )
    }

    handle_select(e) {
        e.preventDefault()
    }

    render() {
        return (
            <form onSubmit={this.handle_select}>
                <Field onChange={() => this.handle_select()} name="favoriteColor" component={this.render_select} label='Courses'></Field>
                <button className='btn btn-outline-primary'>Select Course</button>
            </form>
        )
    }
}

export default reduxForm({form: 'courses'})(Courses);