import { combineReducers } from 'redux';

import userReducer from './user';
import parkinglotReducer from './parkinglot';

const rootReducer = combineReducers({
  user: userReducer,
  parkinglots: parkinglotReducer
});

export default rootReducer;
