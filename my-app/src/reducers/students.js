import types from '../actions/types'

const DEFAULT_STATE = { 
    auth: false,
    students: {
        type:'',
        data: []
    },
    assignments: {
        type:'',
        data: []
    },
    grades: {
        type:'',
        data: []
    },
    courses: {
        type:'',
        data: []
    },
    table_assignments: {
        type:'',
        data: [],
        count: null
    },
    user_activity: [],
    selected: {}
 };

export default (state = DEFAULT_STATE, action) => {
    switch(action.type) {
        case types.GET_STUDENTS:
            return {
                ...state,
                students: action.payload
            }
        case types.GET_ASSIGNMENTS:
            return {
                ...state,
                assignments: action.payload
            }
        case types.GET_COURSES:
            return {
                ...state,
                courses: action.payload
            }
        case types.GET_GRADES:
            return {
                ...state,
                grades: action.payload
            }
        case types.GET_ACTIVITY:
            return {
                ...state,
                user_activity: action.payload
            }
        case types.UPDATE_SELECTION:
            return {
                ...state,
                selected: action.payload
            }
        case types.GET_TABLE_ASSIGNMENTS:
            return {
                ...state,
                table_assignments: action.payload
            }
        case types.AUTH:
            return {
                ...state,
                auth: action.payload
            }
        case types.CLEAR_ASSIGNMENTS:
            return {
                ...state,
                user_assignments: action.payload,
            }
        default:
            return state
    }
}