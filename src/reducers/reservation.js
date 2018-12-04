import _ from 'lodash';

import { FETCH_RESERVATIONS, DELETE_RESERVATION } from '../actions';

export default function(state = {}, action) {
    switch(action.type) {
    case FETCH_RESERVATIONS:
        return _.mapKeys(action.payload.data, 'id');

    case DELETE_RESERVATION:
        return _.mapKeys(action.payload.data, 'RUUID');
    default:
        return state;s
    }
}
