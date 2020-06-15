import { combineReducers } from 'redux';
import handleLogin from './auth';
import handleCurrentOnMap from './currentOnMap';
import handleUserInfo from './userInfo';

const rootReducer = combineReducers({
  handleLogin,
  handleCurrentOnMap,
  handleUserInfo,
});

export default rootReducer;
