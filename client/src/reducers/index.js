import {combineReducers} from 'redux';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import clubReducer from './clubReducer';
import regReducer from './regReducer';

export default combineReducers({
    error: errorReducer,
    auth: authReducer,
    club: clubReducer,
    reg: regReducer
})