import { combineReducers } from 'redux';

// ## Generator Reducer Imports
import app from '../modules/AppState';
import home from '../modules/home/HomeState';

export default combineReducers({
  // ## Generator Reducers
  app,
  home
});
