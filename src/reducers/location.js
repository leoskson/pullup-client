import { FETCH_LOCATION } from '../actions';

const DEFAULT_LOCATION = {
    latitude: 37.3861,
    longitude: -122.0839
}

export default function(state = DEFAULT_LOCATION, action) {
    switch(action.type) {
    case FETCH_LOCATION:
        return action.payload.coords;
    default:
        return state;
    }
}
