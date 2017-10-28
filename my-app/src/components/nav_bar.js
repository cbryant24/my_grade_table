import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// import FaBook from 'react-icons/lib/fa/book';
import { sign_in, sign_out } from '../actions';

class Nav_Bar extends Component {
    
    handle_logout() {
        this.props.sign_out()
    }

    render() {
        return(
            <div className='container nav-bar'>
                <div className='row'>
                <h2 className='col-8'>My Students Grade</h2>
                    <ul className="nav col-4">
                        <li className='nav-item'>
                            <Link className='nav-link' to='/'>Home</Link>
                        </li>
                        <li onClick={ () => this.handle_logout()}>
                            Logout
                        </li>
                    </ul>
                </div>
            </div>
            
        )
    }
}



export default connect(null, {sign_in, sign_out})(Nav_Bar);