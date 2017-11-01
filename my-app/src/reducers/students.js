import types from '../actions/types'

const DEFAULT_STATE = { 
    auth: false,
    all_students: [],
    user_activity: [],
    user_courses: [],
    user_assignments: [],
    selected_course: '',
    student_grades: []
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
        case types.GET_COURSES:
            return {
                ...state,
                user_courses: action.payload
            }
        case types.SEARCH_COURSES: 
            return {
                ...state,
                selected_course: action.payload
            }
        case types.GET_ASSIGNMENTS:
            return {
                ...state,
                user_assignments: action.payload
            }
        case types.GET_GRADES:
            return {
                ...state,
                student_grades: action.payload
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