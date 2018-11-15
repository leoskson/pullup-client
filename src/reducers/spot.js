import _ from 'lodash';

import { FETCH_SPOTS } from '../actions';

export default function(state = {}, action) {
    switch(action.type) {
    case FETCH_SPOTS:
        return _.mapKeys(action.payload.data, 'SUUID');
    default:
        return state;
    }
}
