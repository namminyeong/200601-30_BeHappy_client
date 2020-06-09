import { combineReducers } from 'redux';
import handleLogin from './auth';
import handleSearchWithGeo from './currentOnMap';

const rootReducer = combineReducers({
  handleLogin,
  handleSearchWithGeo,
});

export default rootReducer;
