import types from './types';
import axios from 'axios';

export function get_students(fb_id) {
    return dispatch => {
        axios.post('/api/students', { fb_id }).then( res => {
            console.log('this is the res from the students call', res)
            dispatch({
                type: types.GET_STUDENTS,
                payload: res.data
            })
        })   
    }
}

export function sign_in() {
    return dispatch => {
        axios.get('/api/user_info').then( (res) => {
            console.log('this is the signin data', res.data)
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
                payload: res.data
            })
        })
    }
}

export function search_courses(fb_id, course) {
    return dispatch => {
        axios.post('/api/courses/search', {fb_id, course }).then( res => {
            dispatch({
                type: types.SEARCH_COURSES,
                payload: res.data
            })
        })
    }
}