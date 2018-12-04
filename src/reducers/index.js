import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import userReducer from './user';
import activeSpotReducer from './activeSpot';
import parkinglotReducer from './parkinglot';
import locationReducer from './location';
import activeParkinglotReducer from './activeParkinglot';
import spotReducer from './spot';
import reservationReducer from './reservation';
import configReducer from './config';

const rootReducer = combineReducers({
  user: userReducer,
  parkinglots: parkinglotReducer,
  activeParkinglot: activeParkinglotReducer,
  activeSpot: activeSpotReducer,
  location: locationReducer,
  spots: spotReducer,
  reservations: reservationReducer,
  form: formReducer,
  config: configReducer
});

export default rootReducer;
