//The axios module is how the front-end component of the system communicates
//with the backend api and database (Express & Nodejs)
import axios from 'axios';

//Imported the returnErrors function from errorActions file
import {returnErrors} from './errorActions';

import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS
} from '../actions/types';


//Check token and load user
export const loadUser = () => (dispatch, getState) => {
    
    //User loading
    dispatch({ type: USER_LOADING});

    //Access the backend api (Express & Nodejs) to get user information from the database
    axios.get('/api/auth/user', tokenConfig(getState))
        .then(res => dispatch({
            type: USER_LOADED,
            payload: res.data
        })).catch(err => { //If an error is caught
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: AUTH_ERROR,
            });
        });
}

//Login User
export const login = ({ email, password}) => dispatch => {
    
    //Headers
    const config = {
        headers: {
            "Content-type" : "application/json" 
        }
    }

    //Create request body
    const body = JSON.stringify({ email, password});

    //Send headers and request body to the the api endpoints
    //Access the backend api and database (Express & Nodejs) to authenticate a user 
    axios.post('/api/auth', body, config)
        .then(res => dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        }))
        .catch(err => { //If an error is caught
            dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'));
            dispatch({type: LOGIN_FAIL});
        });
}


//Logout User
export const logout = () => {
    return {
        type: LOGOUT_SUCCESS
    };
}


//Setup config/headers and token
export const tokenConfig = (getState) => {
    
    //Get token from local storage
    const token = getState().auth.token;

    //Headers
    const config = {
        headers: {
            "Content-type" : "application/json"
        }
    }

    //If token then add to headers
    if(token){
        config.headers['x-auth-token'] = token;
    }

    return config;
};