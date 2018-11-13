import { combineReducers } from 'redux';

import userReducer from './user';
import parkinglotReducer from './parkinglot';
import locationReducer from './location';
import activeParkinglotReducer from './activeParkinglot';

const rootReducer = combineReducers({
  user: userReducer,
  parkinglots: parkinglotReducer,
  activeParkinglot: activeParkinglotReducer,
  location: locationReducer
});

export default rootReducer;
