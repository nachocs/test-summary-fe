import { combineReducers } from 'redux';
import counter from './counter';
import ui from './ui';

const rootReducer = combineReducers({
  counter,
  ui,
});

export default rootReducer;
