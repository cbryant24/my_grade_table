import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { sign_in } from '../actions'

class Signup extends Component {
    componentWillMount() {
        if(this.props.auth) {
            <Redirect to='/home'/>
        }
    }

    render() {
        return (
            <div className='col-12 login'>
                <a href='/signin/facebook' className='btn btn-outline-primary'>Signup/Login</a>
            </div>
        )
    }
    
}

function mapStateToProps(state) {
    return {
        auth: state.students.auth
    }
}

export default connect(mapStateToProps, { sign_in })(Signup);
