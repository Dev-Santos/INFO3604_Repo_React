//The axios module is how the front-end component of the system communicates
//with the backend api and database (Express & Nodejs)
import axios from 'axios';

//Imported the returnErrors and clearErrors functions from errorActions file
import {returnErrors, clearErrors} from './errorActions';

import {
    REGISTER_SUCCESS_AWAITING,
    REGISTER_FAIL,
    GET_REG_LISTING,
    REG_LISTING_LOADING,
    UPDATE_REG_STATUS,
    FORM_SUCCESS
} from '../actions/types';


//This function sends the information from the 'Beneficiary Register' form on the front-end to the backend database
export const registerBeneficiary = ({comp_name, comp_add, comp_website, comp_email,  comp_tel, comp_cp_fname, comp_cp_lname, comp_pos, comp_cp_tel, comp_cp_email, password}) => dispatch => {
    //Headers
    const config = {
        headers: {
            "Content-type" : "application/json" 
        }
    }

    //Create request body
    const body = JSON.stringify({ comp_name, comp_add, comp_website, comp_email,  comp_tel, comp_cp_fname, comp_cp_lname, comp_pos, comp_cp_tel, comp_cp_email, password});

    //Send headers and request body to the the api endpoints
    //Access the backend api (Express & Nodejs) to post/store the beneficiary registration information to the database
    axios.post('/api/beneficiary/register', body, config)
        .then(res => {
                dispatch(clearErrors());
                dispatch({
                    type: REGISTER_SUCCESS_AWAITING,
                    payload: res.data
                });
            }
        )
        .catch(err => {//If an error is caught
            dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'));
            dispatch({type: REGISTER_FAIL});
        });
}


//This function gets the all the authenticated beneficiary records from the database
export const getBeneficiaryListing = () => (dispatch, getState) => {

    dispatch(setRegListLoading());

    //Access the backend api (Express & Nodejs) to get all the authenticate beneficiary records from the database
    axios
        .get('/api/beneficiary/auth', tokenConfig(getState))
        .then(res => dispatch({
            type: GET_REG_LISTING,
            payload: res.data
        }))
        .catch(err => //If errors are caught
            dispatch(returnErrors(err.response.data, err.response.status))
        );

}

//This function gets the all the beneficiary registration records from the database
export const getBeneficiaryRegListing = () => (dispatch, getState) => {

    dispatch(setRegListLoading());

    //Access the backend api (Express & Nodejs) to get all the beneficiary registration records from the database
    axios
        .get('/api/beneficiary/listing', tokenConfig(getState))
        .then(res => dispatch({
            type: GET_REG_LISTING,
            payload: res.data
        }))
        .catch(err => //If errors are caught
            dispatch(returnErrors(err.response.data, err.response.status))
        );

}


//This function is responsible for changing the status of a beneficiary from 0 (Pending) to 1 (Authenticated)
//in the database based on their registration id
export const updateBeneficiaryStatus = (id) => (dispatch, getState) =>{

    //Create request body
    const body = JSON.stringify({ id });
  
    //Access the backend api (Express & Nodejs) to update the beneficiary information in the database
    axios.post('/api/beneficiary/update', body, tokenConfig(getState))
        .then(res => dispatch({
            type: UPDATE_REG_STATUS,
            payload: res.data
        }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));//If an error is caught
};


export const setRegListLoading = () => {
    return {
        type: REG_LISTING_LOADING
    };
};


//This function sends the information from the Donation Request form on the front-end to the backend database
export const submitDonationRequest = ({name, request, quantity, reason, location}) => (dispatch, getState) => {

    //Create request body
    const body = JSON.stringify({ name, request, quantity, reason, location });

    //Access the backend api (Express & Nodejs) to send the donation request information in the database
    axios.post('/api/beneficiary/request', body, tokenConfig(getState))
        .then(res => dispatch({
            type: FORM_SUCCESS,
            payload: res.data
        }))
        .catch(err => {//If an error is caught
            dispatch(returnErrors(err.response.data, err.response.status, 'FORM_FAIL'));
        });

};


//This function gets the all the submitted donation requests from the database
export const getSubmittedDonationReqs = () => (dispatch, getState) => {

    dispatch(setRegListLoading());

    //Access the backend api (Express & Nodejs) to get all the submitted donation requests from the database
    axios
        .get('/api/beneficiary/requests', tokenConfig(getState))
        .then(res => dispatch({
            type: GET_REG_LISTING,
            payload: res.data
        }))
        .catch(err => //If errors are caught
            dispatch(returnErrors(err.response.data, err.response.status))
        );

}

//This function gets the all the approved donation requests from the database
export const getApprovedDonationReqs = () => (dispatch, getState) => {

    dispatch(setRegListLoading());

    //Access the backend api (Express & Nodejs) to get all the approved donation requests from the database
    axios
        .get('/api/beneficiary/requests_auth', tokenConfig(getState))
        .then(res => dispatch({
            type: GET_REG_LISTING,
            payload: res.data
        }))
        .catch(err => //If errors are caught
            dispatch(returnErrors(err.response.data, err.response.status))
        );

}


//This function is responsible for changing the status of a donation requests from 0 (Pending) to 1 (Approved)
//in the database based on their donation request id
export const approveDonationReq = (id) => (dispatch, getState) =>{

    //Create request body
    const body = JSON.stringify({ id });
  
    //Access the backend api (Express & Nodejs) to update the donation request information in the database
    axios.post('/api/beneficiary/request/update', body, tokenConfig(getState))
        .then(res => dispatch({
            type: UPDATE_REG_STATUS,
            payload: res.data
        }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));//If an error is caught
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