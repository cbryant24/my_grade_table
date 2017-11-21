import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { sign_in } from '../actions'


/**
 * @class 
 * @classdesc component that renders the login page for a user
 */
class Signup extends Component {
    /**
     * @function componentWillMount
     * @returns if the user is not logged in they are routed to the login page
     */
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

/**
 * @function mapStateToProps
 * @param {Object} state 
 * @returns adds state auth to props to verify user login when mounted
 */

function mapStateToProps(state) {
    return {
        auth: state.students.auth
    }
}

export default connect(mapStateToProps, { sign_in })(Signup);
