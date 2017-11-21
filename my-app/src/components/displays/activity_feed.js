import React, { Component } from 'react';
import { get_activity } from '../../actions';
import { connect } from 'react-redux';


/**
 * @class
 * @classdesc renders a react class component that displays users activity
 */
class Activity_Feed extends Component {
    /**
     * @function componentWillMount
     * @returns updates state activity_feed by calling action creator get_activity with user id 
     */
    componentWillMount() {
        this.props.get_activity(this.props.auth.fb_id)
    }

    render_activity() {
        const { activity_feed } = this.props

        if(activity_feed.length > 0) {
            const activity_list = activity_feed.map( (item, idx) => {
                return <li key={idx}>{item.transaction} </li>
            })
            return activity_list
        }
        return <li>No Activity</li>
    }

    render() {
        const { pathname } = this.props.location
        return (
            <div className={`activity-feed col-xs-12 col-sm-${pathname === '/' ? '12':'5'}`}>
                <h4>Activity Feed</h4>
                <ul>
                    {this.render_activity()}
                </ul>
            </div>
            
        ) 
    }
}

/**
 * @function mapStateToProps
 * @param {Object} state 
 * @returns 
 *  adds state auth to props to retrieve users activity history from database
 *  adds state activity_feed to props to retrieve user acitivity after each update
 */

function mapStateToProps(state) {
    return {
        activity_feed: state.students.user_activity,
        auth: state.students.auth
    }
}

export default connect(mapStateToProps, { get_activity })(Activity_Feed);