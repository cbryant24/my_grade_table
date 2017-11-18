import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// import FaBook from 'react-icons/lib/fa/book';
import { sign_in, sign_out } from '../actions';
import Md_Layers from 'react-icons/lib/md/layers'


class Nav_Bar extends Component {
    
    handle_logout() {
        this.props.sign_out()
    }

    render() {
        return(
            <div className='nav-bar'>
                <h2 className='col-sm-8'><a className='nav-link' href='/'>My Students Grade</a></h2>
                <ul className="nav col-sm-4">
                    <li className='nav-item'>
                        <Link className='nav-link' to='/'>Home</Link>
                    </li>
                    <li onClick={ () => this.handle_logout()}>
                        <Link className='nav-link' to='/'>Logout</Link>
                    </li>
                </ul>
            </div>
            
        )
    }
}



export default connect(null, {sign_in, sign_out})(Nav_Bar);