import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class Side_Bar extends Component {
    render() {
        return (
            <div>
                <div>
                    <Link to='/add_student'>Add Students</Link>
                </div>
                <div>
                    <Link to='/courses'>Courses</Link>
                </div>
                <div>
                    <Link to='/update'>Update/Remove Student</Link>
                </div>
            </div> 
        )
    }
}

export default Side_Bar;