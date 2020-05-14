//The axios module is how the front-end component of the system communicates
//with the backend api and database (Express & Nodejs)
import axios from 'axios';

import { GET_CLUBS, CLUBS_LOADING } from './types';

//Imported the returnErrors function from errorActions file
import { returnErrors } from './errorActions';

//This function captures all the club information from the database
export const getClubs = () => dispatch =>{
    
    dispatch(setClubsLoading()); 

    //Access the backend api (Express & Nodejs) to get all club information
    axios
        .get('/api/clubs')
        .then(res => dispatch({
            type: GET_CLUBS,
            payload: res.data
        }))
        .catch(err => //If an error is caught 
            dispatch(returnErrors(err.response.data, err.response.status))
        );
};

export const setClubsLoading = () => {
    return {
        type: CLUBS_LOADING
    };
};