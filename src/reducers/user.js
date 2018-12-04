import { FETCH_USER, POST_USER, POST_LOGIN } from '../actions';

export default function(state = {}, action) {
    switch(action.type) {
    case FETCH_USER:
        return {
            ...state,
            ...action.payload.data
        }
    default:
        return state;
    }
}
