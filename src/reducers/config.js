import { POST_LOGIN, POST_USER } from '../actions';

export default function(state = {}, action) {
    switch(action.type) {
    case POST_LOGIN:
        return {
            headers: action.payload.data
        };
    case POST_USER:
        return {
            headers: action.payload.data
        };
    default:
        return state;
    }
}
