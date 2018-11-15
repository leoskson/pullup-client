import { FETCH_LOCATION } from '../actions';

const ATLANTA_LOCATION = {
    latitude: 33.7749,
    longitude: -84.3964
}

const NY_LOCATION = {
    latitude: 40.725910,
    longitude: -74.004750
}
//33.7749° N, 84.3964° W
export default function(state = NY_LOCATION, action) {
    switch(action.type) {
    case FETCH_LOCATION:
        return action.payload.coords;
    default:
        return state;
    }
}
