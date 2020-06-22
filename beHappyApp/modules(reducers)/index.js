import { combineReducers } from 'redux';
import handleLogin from './auth';
import handleCurrentOnMap from './currentOnMap';
import handleUserInfo from './userInfo';
import handleCenterInfo from './centerInfo';

const rootReducer = combineReducers({
  handleLogin,
  handleCurrentOnMap,
  handleUserInfo,
  handleCenterInfo,
});

export default rootReducer;
