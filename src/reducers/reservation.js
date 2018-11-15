import _ from 'lodash';

import { FETCH_RESERVATIONS } from '../actions';

export default function(state = {}, action) {
    switch(action.type) {
    case FETCH_RESERVATIONS:
        console.log(action.payload);
        return action.payload;
        // return _.mapKeys(action.payload.data, 'SUUID');
    default:
        return state;s
    }
}
