import { combineReducers } from 'redux';
import handleLogin from './auth';
import handleCurrentOnMap from './currentOnMap';

const rootReducer = combineReducers({
  handleLogin,
  handleCurrentOnMap,
});

export default rootReducer;
