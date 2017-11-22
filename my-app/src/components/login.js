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
            <div className='login-container'>
                <div className='row text-center'>
                    <div className='col-xs-12 col-sm-5 left-logo'>
                            <hr className='vertical-line'/>
                            <div className='left-circles'>
                                <div className='top-circle'></div>
                                <div className='bottom-circle'></div>
                                
                            </div>
                            <div className='middle-circles'>
                                <div className='top-circle'></div>
                                <div className='bottom-circle'></div>
                                
                            </div>
                            <div className='right-circles'>
                                <div className='top-circle'></div> 
                                <div className='bottom-circle'></div> 
                            </div>
                            
                            <hr className='logo-line'/>
                            <div className='login-title'><h2>My Grade Table</h2></div> 
                    </div>
                    <div className='col-xs-12 col-sm-6 login-buttons'>
                        <div>
                            <a className='login-button' href='/signin/facebook' >Login</a>
                        </div>
                        <div>
                            <a className='login-button' href='/signin/facebook'>Signup</a>                        
                        </div>
                    </div>
                </div>
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
