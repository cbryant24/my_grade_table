import types from './types';
import axios from 'axios';

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

export function clear_assignments() {
    return {
        type: types.CLEAR_ASSIGNMENTS,
        payload: []
    }
}

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

export function update_selection(data) {
    return  {
        type: types.UPDATE_SELECTION,
        payload: data
    }
}

export function update_record(update_data) {
    return dispatch => {
        axios.put(`/api/update`, {update_data}).then( res => {
            dispatch({
                type: types.UPDATE_STUDENT,
                payload: res.data.students
            })
        })
    }
}