import { FORM_SUCCESS, GET_ER_LISTING, ER_LISTING_LOADING } from '../actions/types';

const initialState = {
    ereport : null,
    msg : null,
    loading: false
};

export default function(state = initialState, action){
    switch(action.type){
        case FORM_SUCCESS:
            return{
                ereport: action.payload
            };
        case GET_ER_LISTING:
            return {
                ...state,
                listing: action.payload,
                loading: false
            };
        case ER_LISTING_LOADING:
            return{
                ...state,
                loading: true
            };
        default:
            return state;
    }
}