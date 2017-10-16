import auth from './students'
import students from './students'
import {reducer as formReducer} from 'redux-form';
import { combineReducers } from 'redux'


export default combineReducers({
    students,
    auth,
    form: formReducer,
})