import { SELECT_PARKINGLOT } from '../actions';

export default function(state=null, action) {
    switch(action.type) {
    case SELECT_PARKINGLOT: 
        return action.payload;
    default:
        return state;
    }
}
