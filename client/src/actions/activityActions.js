//The axios module is how the front-end component of the system communicates
//with the backend api and database (Express & Nodejs)
import axios from 'axios';

import { FORM_SUCCESS, ACT_SUCCESS, GET_REG_LISTING, REG_LISTING_LOADING } from './types';

//Imported the returnErrors and clearErrors functions from errorActions file
import {returnErrors, clearErrors} from './errorActions';

//This function sends the information from the Create Activity Report form on the front-end to the backend database
export const submitActivity = ({ cm_id, assignment_type_id, record_id, date }) => (dispatch, getState) => {
 
    //Create request body
    const body = JSON.stringify({ cm_id, assignment_type_id, record_id, date });

    //Send headers and request body to the the api endpoints
    //Access the backend api (Express & Nodejs) to post/store activity report to the database
    axios.post('/api/assignment', body, tokenConfig(getState))
        .then(res => {
                dispatch(clearErrors());
                dispatch({
                    type: FORM_SUCCESS,
                    payload: res.data
                });
            }
        )
        .catch(err => {//If an error is caught
            dispatch(returnErrors(err.response.data, err.response.status, 'FORM_FAIL'));
        });
}


//This function gets all the activity records (pending and completed) from the database
export const getActivityListing = () => (dispatch, getState) => {

    dispatch(setRegListLoading());

    //Access the backend api (Express & Nodejs) to get all the activity records from the database
    axios
        .get('/api/assignment/listing', tokenConfig(getState))
        .then(res => dispatch({
            type: GET_REG_LISTING,
            payload: res.data
        }))
        .catch(err => //If errors are caught
            dispatch(returnErrors(err.response.data, err.response.status))
        );

    }
    
    
//This function gets the all the elapsed activity records from the database based on the
//club member's user id
export const getPastActivities = (cm_id) => (dispatch, getState) =>{

    //Create request body
    const body = JSON.stringify({ cm_id });

    dispatch(setRegListLoading());

    //Access the backend api (Express & Nodejs) to get all the activity records from the database
    axios
        .post('/api/assignment/cm_completed', body, tokenConfig(getState))
        .then(res => dispatch({
            type: GET_REG_LISTING,
            payload: res.data
        }))
        .catch(err => //If errors are caught
            dispatch(returnErrors(err.response.data, err.response.status))
        );

}


//This function gets the all the upcoming activity records from the database based on the
//club member's user id
export const getUpcomingActivities = (cm_id) => (dispatch, getState) =>{

    //Create request body
    const body = JSON.stringify({ cm_id });

    dispatch(setRegListLoading());

    //Access the backend api (Express & Nodejs) to get all the activity records from the database
    axios
        .post('/api/assignment/cm_listing', body, tokenConfig(getState))
        .then(res => dispatch({
            type: GET_REG_LISTING,
            payload: res.data
        }))
        .catch(err => //If errors are caught
            dispatch(returnErrors(err.response.data, err.response.status))
        );

}

//This function updates the activity table record and other associated table record
// to indicate that they're be completed
export const updateActivityRec = ({ comments, type, a_id, record_id }) => (dispatch, getState) => {

    //Create request body
    const body = JSON.stringify({ comments, type, a_id, record_id });
    dispatch(setRegListLoading());

    //Access the backend api (Express & Nodejs) to update all the associated records in the database
    axios
        .post('/api/assignment/update', body, tokenConfig(getState))
        .then(res => dispatch({
            type: ACT_SUCCESS,
            payload: res.data
        }))
        .catch(err => //If errors are caught
            dispatch(returnErrors(err.response.data, err.response.status, 'ACT_FAIL'))
        );

}


export const setRegListLoading = () => {
    return {
        type: REG_LISTING_LOADING
    };
};


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