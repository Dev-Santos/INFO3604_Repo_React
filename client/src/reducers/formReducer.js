import { FORM_SUCCESS, ACT_SUCCESS, GET_ER_LISTING, ER_LISTING_LOADING, CLEAR_FORM_LISTING } from '../actions/types';

const initialState = {
    report : null,
    msg : null,
    loading: false,
    listing: null
};

export default function(state = initialState, action){
    switch(action.type){
        case FORM_SUCCESS:
            return{
                report: action.payload,
                msg: 'Successful Submission - Awaiting approval from Admin user'
            };
        case ACT_SUCCESS:
            return{
                report: action.payload,
                msg: 'Successful update of activity record'
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
        case CLEAR_FORM_LISTING:
            return initialState;
        default:
            return state;
    }
}