import types from '../actions/types'

const DEFAULT_STATE = { 
    auth: false,
    all_students: [],
    user_activity: []
 };

export default (state = DEFAULT_STATE, action) => {
    switch(action.type) {
        case types.GET_STUDENTS:
            return {
                ...state,
                all_students: action.payload
            }
        case types.GET_ACTIVITY:
            return {
                ...state,
                user_activity: action.payload
            }
        case types.AUTH:
            return {
                ...state,
                auth: action.payload
            }
        default:
            return state
    }
}