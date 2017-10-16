import types from './types';
import axios from 'axios';

export function get_students() {
    return dispatch => {
        axios.get('/students').then( res => {

            dispatch({
                type: types.GET_STUDENTS,
                payload: res.data
            })
        })   
    }
}

// export function login(form_vals) {
//     return dispatch => {
//         axios.post('/login').then( res => {
//             console.log('we signed in yall', form_vals)

//             // localStorage.setItem('token', res.data.token)

//             dispatch({
//                 type: types.AUTH
//             }).catch( (err) => {
//                 console.log('yo you errored out bro', err.response )

//                 dispatch(send_error('Invalid Email or Password'))
//             })
//         })
//     }
// }

function send_error(msg) {
    return {
        type: types.ERROR,
        payload: msg
    }
} 