import { combineReducers } from 'redux';

import userReducer from './user';
import parkinglotReducer from './parkinglot';
import locationReducer from './location';
import activeParkinglotReducer from './activeParkinglot';
import spotReducer from './spot';
import reservationReducer from './reservation';

const rootReducer = combineReducers({
  user: userReducer,
  parkinglots: parkinglotReducer,
  activeParkinglot: activeParkinglotReducer,
  location: locationReducer,
  spots: spotReducer,
  reservations: reservationReducer
});

export default rootReducer;
