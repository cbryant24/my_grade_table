const DEFAULT_STATE = { 
    auth: null,
    all_students: []
 };

export default (state = DEFAULT_STATE, action) => {
    switch(action.type) {
        case action.GET_STUDENTS:
            return {
                ...state,
                all_students: action.payload
            }
        case action.AUTH:
            return {
                ...state,
                auth: action.payload
            }
        default:
            return state
    }
}