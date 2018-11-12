import { combineReducers } from 'redux';

import userReducer from './user';
import parkinglotReducer from './parkinglot';
import locationReducer from './location';

const rootReducer = combineReducers({
  user: userReducer,
  parkinglots: parkinglotReducer,
  location: locationReducer
});

export default rootReducer;
