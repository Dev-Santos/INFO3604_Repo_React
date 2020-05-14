//The axios module is how the front-end component of the system communicates
//with the backend api and database (Express & Nodejs)
import axios from 'axios';

import { FORM_SUCCESS, GET_ER_LISTING, ER_LISTING_LOADING, UPDATE_REG_STATUS, CLEAR_FORM_LISTING } from './types';

//Imported the returnErrors and clearErrors functions from errorActions file
import {returnErrors, clearErrors} from './errorActions';

//This function sends the information from the E-Waste Report form on the front-end to the backend database
export const submitEReport = ({ rep_person, email, telephone, description, location, classification ,image_url }) => dispatch => {
    
    //Headers
    const config = {
        headers: {
            "Content-type" : "application/json" 
        }
    }

    //Create request body
    const body = JSON.stringify({ rep_person, email, telephone, description, location, classification ,image_url });

    //Send headers and request body to the the api endpoints
    //Access the backend api (Express & Nodejs) to post/store e-waste report to the database
    axios.post('/api/ereport', body, config)
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


//This function gets all the pending e-waste report records from the database
export const getERListing = () => (dispatch, getState) =>{
    
    dispatch(setERListLoading());

    //Access the backend api (Express & Nodejs) to get the e-waste report records from the database
    axios
        .get('/api/ereport/listing', tokenConfig(getState))
        .then(res => dispatch({
            type: GET_ER_LISTING,
            payload: res.data
        }))
        .catch(err => //If errors are caught
            dispatch(returnErrors(err.response.data, err.response.status))
        );
};


//This function gets the all the collected e-waste report records from the database
export const getCollectedERListing = () => (dispatch, getState) =>{
    
    dispatch(setERListLoading());

    //Access the backend api (Express & Nodejs) to get all the collected e-waste report records
    axios
        .get('/api/ereport/listing_comp', tokenConfig(getState))
        .then(res => dispatch({
            type: GET_ER_LISTING,
            payload: res.data
        }))
        .catch(err => //If errors are caught
            dispatch(returnErrors(err.response.data, err.response.status))
        );
};

export const setERListLoading = () => {
    return {
        type: ER_LISTING_LOADING
    };
};


//This function is responsible for changing the status of a e-waste report from 0 (Pending) to 1 (Collected)
//in the database based on its id
export const updateEReport = (id) => (dispatch, getState) =>{

    //Create request body
    const body = JSON.stringify({ id });
    
    //Access the backend api (Express & Nodejs) to update the e-waste report information in the database
    axios.post('/api/ereport/update', body, tokenConfig(getState))
        .then(res => dispatch({
            type: UPDATE_REG_STATUS,
            payload: res.data
        }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));//If an error is caught
};

//This function sets the form reducer to its initial state
export const clearFormListing = () =>{
    return{
        type: CLEAR_FORM_LISTING
    }
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