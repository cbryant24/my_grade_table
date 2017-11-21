import React, { Component } from 'react';
import { Link } from 'react-router-dom';

/**
 * @class
 * @classdesc renders a react class component the displays the side bar links
 */
class Side_Bar extends Component {
    render() {
        return (
            <div>
                <div>
                    <Link className='nav-link' to='/my-students'>Students</Link>
                </div>
                <div>
                    <Link className='nav-link' to='/my-courses'>Courses</Link>
                </div>
                <div>
                    <Link className='nav-link' to='/my-assignments'>Assignments</Link>
                </div>
                <div>
                    <Link className='nav-link' to='/my-grades'>Grades</Link>
                </div>
            </div> 
        )
    }
}

export default Side_Bar;