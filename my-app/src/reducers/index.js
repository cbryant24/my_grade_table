import students from './students'
import {reducer as form} from 'redux-form';
import { combineReducers } from 'redux'


export default combineReducers({
    students,
    form,
})