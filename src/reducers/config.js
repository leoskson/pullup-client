import { POST_LOGIN } from '../actions';

export default function(state = {}, action) {
    switch(action.type) {
    case POST_LOGIN:
        return {
            headers: action.payload.data
        };
    default:
        return state;
    }
}
