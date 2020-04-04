import { GET_ERRORS, CLEAR_ERRORS } from './types';

//RETURN ERRORS
//This function returns defined errors to the front-end to be displayed (e.g. Please enter all field, User already exists)
export const returnErrors = (msg, status, id = null) => {
    return{
        type: GET_ERRORS,
        payload: {msg, status, id}
    };
};

//CLEAR ERRORS
export const clearErrors = () => {
    return{
        type: CLEAR_ERRORS
    }
};