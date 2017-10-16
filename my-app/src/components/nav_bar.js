import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import FaBook from 'react-icons/lib/fa/book'

class Nav_Bar extends Component {
    render() {
        return(
            <div className='container nav-bar'>
                <div className='row'>
                <h2 className='col-8'>My Students Grade</h2>
                    <ul className="nav col-4">
                        <li className='nav-item'>
                            <Link className='nav-link' to='/'>Home</Link>
                        </li>
                        <li>
                            <Link className='nav-link' to='/login'>Login</Link>
                        </li>
                    </ul>
                </div>
            </div>
            
        )
    }
}

export default Nav_Bar;