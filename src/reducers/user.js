import { FETCH_USER, POST_USER } from '../actions';

export default function(state = {}, action) {
    switch(action.type) {
    case FETCH_USER:
        return action.payload.data;
    case POST_USER:
        console.log(action.payload);
    default:
        return state;
    }
}
