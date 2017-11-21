import types from './types';
import axios from 'axios';

/**
 * @function get_students
 * @param {string} fb_id 
 * @returns api call to server that updates redux state students with an object containing an array of students
 * from the database representing user associated students and type 
 */
export function get_students(fb_id) {
    return dispatch => {
        axios.post('/api/students', { fb_id }).then( res => {
            dispatch({
                type: types.GET_STUDENTS,
                payload: {type: 'students', data: res.data}
            })
        })   
    }
}

/**
 * @function sign_in
 * @returns api call to server that retrieves the user from the server through passport service api route and 
 * updates redux auth state with the user object
 */
export function sign_in() {
    return dispatch => {
        axios.get('/api/user_info').then( (res) => {
            dispatch({
                type: types.AUTH,
                payload: res.data
            })
        })
    }
}

/**
 * @function sign_out
 * @returns api call to server that users the passport services api route to logout user out
 */
export function sign_out() {
    return dispatch => {
        axios.get('/api/signout').then( res => {
            dispatch({
                type: types.AUTH,
                payload: res.data
            })
        })
    }
}

/**
 * @function get_activity
 * @param {string} fb_id 
 * @returns api call to server that updates redux state students with an object 
 * containing an array of students from the database representing user associated 
 * students and type 
 */
export function get_activity(fb_id) {
    return dispatch => {
        axios.post('/api/get_activity', {fb_id} ).then( res =>  {
            dispatch({
                type: types.GET_ACTIVITY,
                payload: res.data
            })
        })
    }
}
/**
 * @function get_courses
 * @param {string} fb_id 
 * @returns api call to server that updates redux state courses with an object 
 * containing an array of activity from the database representing user associated activity and type 
 */
export function get_courses(fb_id) {
    return dispatch => {
        axios.post('/api/courses', { fb_id }).then(res => {
            dispatch({
                type: types.GET_COURSES,
                payload: {type: 'courses', data: res.data}
            })
        })
    }
}
/**
 * @function get_assignments
 * @param {string} course_id 
 * @returns api call to server that updates redux state assignments with an object 
 * containing an array of activity from the database representing user associated assignments and type 
 */
export function get_assignments(course_id) {
    return dispatch => {
        axios.post('/api/assignments', {course_id}).then( res => {
            dispatch({
                type: types.GET_ASSIGNMENTS,
                payload: {type: 'assignments', data: res.data}
            })
        })
    }
}
/**
 * @function get_table_assignments
 * @param {string} fb_id
 * @returns api call to server that updates redux state table_assignments with an object 
 * containing an array of assignments from the database for display on the users assignment table 
 */
export function get_table_assignments(fb_id) {
    debugger
    return dispatch => {
        axios.post('/api/assignments/all', {fb_id}).then( res => {
            dispatch({
                type: types.GET_TABLE_ASSIGNMENTS,
                payload: {type: 'table_assignments', data: res.data}
            })
        })
    }
}

/**
* @function clear_assignments
* @returns clears redux state assignments with an empty object
*/
export function clear_assignments() {
    return {
        type: types.CLEAR_ASSIGNMENTS,
        payload: {type: '', data: []}
    }
}

/**
 * @function get_grades
 * @param {string} fb_id
 * @returns api call to server that updates redux state grades with an object 
 * containing an array of grades from the database associated with the user 
 */
export function get_grades(fb_id) {
    return dispatch => {
        axios.post('/api/grades', {fb_id}).then( res => {
            dispatch({
                type: types.GET_GRADES,
                payload: {type: 'grades', data: res.data}
            })
        })
    }
}

/**
 * @function update_selection
 * @param {Object} data 
 * @returns updates redux state selection with the user selected object for editing, 
 * updating in redux form and deleting
 */
export function update_selection(data) {
    return  {
        type: types.UPDATE_SELECTION,
        payload: data
    }
}


/**
 * @function open_close_modal
 * @param {object} modal_info
 * @returns updates redux state modal with data or message to display for the user
 */
export function open_close_modal(modal_info) {
    return {
        type: types.OPEN_CLOSE_MODAL,
        payload: modal_info
    }
}