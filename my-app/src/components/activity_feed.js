import React, { Component } from 'react';


class Activity_Feed extends Component {
    // if(this.props.pathna)
    render() {
        const { pathname } = this.props.location
        return (
            <div className={`col-${pathname === '/' ? '12':'6'}`}>
                <h1>Activity Feed - Bottom</h1>
            </div>
            
        ) 
    }
}

export default Activity_Feed