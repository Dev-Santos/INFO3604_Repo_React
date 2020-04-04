import { GET_CLUBS, CLUBS_LOADING } from '../actions/types';

const initialState = {
    clubs: [],
    loading: false
};

export default function(state = initialState, action){
    switch(action.type){
        case GET_CLUBS:
            return {
                ...state,
                clubs: action.payload,
                loading: false
            };
        case CLUBS_LOADING:
            return{
                ...state,
                loading: true
            }
        default:
            return state;
    }
}