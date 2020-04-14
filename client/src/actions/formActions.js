//The axios module is how the front-end component of the system communicates
//with the backend api and database (Express & Nodejs)
import axios from 'axios';

import { FORM_SUCCESS, GET_ER_LISTING, ER_LISTING_LOADING } from './types';

//Imported the returnErrors and clearErrors functions from errorActions file
import {returnErrors, clearErrors} from './errorActions';

//This function sends the information from the E-Waste Report form on the front-end to the backend database
export const submitEReport = ({ rep_person, email, description, location, classification ,image_url }) => dispatch => {
    
    //Headers
    const config = {
        headers: {
            "Content-type" : "application/json" 
        }
    }

    //Create request body
    const body = JSON.stringify({ rep_person, email, description, location, classification ,image_url });

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


//This function gets the all the e-waste report records from the database
export const getERListing = () => (dispatch, getState) =>{
    
    dispatch(setERListLoading());

    //Access the backend api (Express & Nodejs) to get all the e-waste report records from the database
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

export const setERListLoading = () => {
    return {
        type: ER_LISTING_LOADING
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