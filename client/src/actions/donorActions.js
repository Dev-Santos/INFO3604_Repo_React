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


//This function sends the information from the 'Individual Donor Register' form on the front-end to the backend database
export const registerIndDonor = ({fname, lname, email, tel, type, password}) => dispatch => {
    //Headers
    const config = {
        headers: {
            "Content-type" : "application/json" 
        }
    }

    //Create request body
    const body = JSON.stringify({ fname, lname, email, tel, type, password});

    //Send headers and request body to the the api endpoints
    //Access the backend api (Express & Nodejs) to post/store individual donor registration information to the database
    axios.post('/api/donor/register', body, config)
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

//This function sends the information from the 'Company Donor Register' form on the front-end to the backend database
export const registerCompDonor = ({comp_name, comp_add, comp_website, comp_email,  comp_tel, comp_cp_fname, comp_cp_lname, comp_pos, comp_cp_tel, comp_cp_email, type, password}) => dispatch => {
    //Headers
    const config = {
        headers: {
            "Content-type" : "application/json" 
        }
    }

    //Create request body
    const body = JSON.stringify({ comp_name, comp_add, comp_website, comp_email,  comp_tel, comp_cp_fname, comp_cp_lname, comp_pos, comp_cp_tel, comp_cp_email, type, password});

    //Send headers and request body to the the api endpoints
    //Access the backend api (Express & Nodejs) to post/store the company donor registration information to the database
    axios.post('/api/donor/register', body, config)
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


//This function gets the all the donor registration records from the database
export const getDonorRegListing = () => (dispatch, getState) =>{
    
    dispatch(setRegListLoading());

    //Access the backend api (Express & Nodejs) to get all the donor registration records from the database
    axios
        .get('/api/donor/listing', tokenConfig(getState))
        .then(res => dispatch({
            type: GET_REG_LISTING,
            payload: res.data
        }))
        .catch(err => //If errors are caught
            dispatch(returnErrors(err.response.data, err.response.status))
        );
        
};

//This function gets the all the authenticated donors from the database
export const getDonorListing = () => (dispatch, getState) =>{
    
    dispatch(setRegListLoading());

    //Access the backend api (Express & Nodejs) to get all the donors from the database
    axios
        .get('/api/donor/auth', tokenConfig(getState))
        .then(res => dispatch({
            type: GET_REG_LISTING,
            payload: res.data
        }))
        .catch(err => //If errors are caught
            dispatch(returnErrors(err.response.data, err.response.status))
        );
        
};


export const setRegListLoading = () => {
    return {
        type: REG_LISTING_LOADING
    };
};


//This function is responsible for changing the status of a donor from 0 (Pending) to 1 (Authenticated)
//in the database based on their donor id
export const updateDonorStatus = (id) => (dispatch, getState) =>{

    //Create request body
    const body = JSON.stringify({ id });
  
    //Access the backend api (Express & Nodejs) to update the donor information in the database
    axios.post('/api/donor/update', body, tokenConfig(getState))
        .then(res => dispatch({
            type: UPDATE_REG_STATUS,
            payload: res.data
        }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));//If an error is caught
};

//This function sends the information from the Donation form on the front-end to the backend database
export const submitDonation = ({donor, email, item_type, item_desc, serial_no, units, location, retrieval_loc, classification, image_url}) => (dispatch, getState) => {

    //Create request body
    const body = JSON.stringify({ donor, email, item_type, item_desc, serial_no, units, location, retrieval_loc, classification, image_url });

    //Access the backend api (Express & Nodejs) to send the donation information in the database
    axios.post('/api/donor/donation', body, tokenConfig(getState))
        .then(res => dispatch({
            type: FORM_SUCCESS,
            payload: res.data
        }))
        .catch(err => {//If an error is caught
            dispatch(returnErrors(err.response.data, err.response.status, 'FORM_FAIL'));
        });

};

//This function gets the all the approved donations from the database
export const getApprovedDonations = () => (dispatch, getState) => {

    dispatch(setRegListLoading());

    //Access the backend api (Express & Nodejs) to get all the approved donation from the database
    axios
        .get('/api/donor/donations_auth', tokenConfig(getState))
        .then(res => dispatch({
            type: GET_REG_LISTING,
            payload: res.data
        }))
        .catch(err => //If errors are caught
            dispatch(returnErrors(err.response.data, err.response.status))
        );


}

//This function gets the all the submitted donations from the database
export const getSubmittedDonations = () => (dispatch, getState) => {

    dispatch(setRegListLoading());

    //Access the backend api (Express & Nodejs) to get all the submitted donations from the database
    axios
        .get('/api/donor/donations', tokenConfig(getState))
        .then(res => dispatch({
            type: GET_REG_LISTING,
            payload: res.data
        }))
        .catch(err => //If errors are caught
            dispatch(returnErrors(err.response.data, err.response.status))
        );


}


//This function is responsible for changing the status of a donation from 0 (Pending) to 1 (Approved)
//in the database based on their donation id
export const approveDonation = (id) => (dispatch, getState) =>{

    //Create request body
    const body = JSON.stringify({ id });
  
    //Access the backend api (Express & Nodejs) to update the donation information in the database
    axios.post('/api/donor/donation/update', body, tokenConfig(getState))
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