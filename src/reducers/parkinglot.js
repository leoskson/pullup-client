import _ from 'lodash';

import { FETCH_PARKINGLOTS } from '../actions';

export default function(state = {}, action) {
    switch(action.type) {
    case FETCH_PARKINGLOTS:
        return _.mapKeys(action.payload.data, 'PUUID');
    default:
        return state;
    }
}
