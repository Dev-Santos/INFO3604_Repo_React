import {
    REGISTER_SUCCESS_AWAITING,
    CLEAR_REG_MESSAGE,
    REGISTER_FAIL,
    GET_REG_LISTING,
    REG_LISTING_LOADING,
    UPDATE_REG_STATUS,
    REGISTER_SUCCESS
} from '../actions/types';

const initialState = {
    listing: [],
    msg: null,
    loading: false,
    regRecord: null,
    newUser: null
};

export default function(state = initialState, action){
    switch(action.type){
        case REGISTER_SUCCESS_AWAITING:
            return{
                msg: "Awaiting approval from Admin user",
            };
        case CLEAR_REG_MESSAGE:
            return{
                msg: null
            };
        case REGISTER_SUCCESS:
            return{
                ...state,
                ...action.payload,
                loading: false,
                newUser: action.payload
            };
        case REGISTER_FAIL:
            return{ 
                msg: null
            };
        case GET_REG_LISTING:
            return {
                ...state,
                listing: action.payload,
                loading: false
            };
        case REG_LISTING_LOADING:
            return{
                ...state,
                loading: true
            };
        case UPDATE_REG_STATUS:
            return{
                ...state,
                regRecord: action.payload
            };
        default:
            return state;
    }   
};