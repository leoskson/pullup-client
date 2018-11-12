import { FETCH_LOCATION } from '../actions';

export default function(state = {}, action) {
    switch(action.type) {
    case FETCH_LOCATION:
        return action.payload.coords;
    default:
        return state;
    }
}
