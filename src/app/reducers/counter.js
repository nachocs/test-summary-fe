import { createReducer } from 'redux-act';

import {
  // lineObtained,
  mixTreeValue,
  mixValue,
} from '../actions/counter';

/**
 * Returns the object used as the initial state.
 * This is the state object used everytime user enters results page.
 * @return {Object} Initial state object.
 */
function getInitialState() {
  return {
    manufacturersByGender:{},
    manufacturersByCountry:{},
    sizesByCountry:{},
    monthsByCountry:{},
    Month:{},
    Manufacturer:{},
    Size:{},
    DeliveryCountry:{},
    Gender:{},
  };
}

// This is Redux reducer that was created with the help of `redux-act`.
// If this seems magical, read more to understand how it works: https://github.com/pauldijou/redux-act
const counterReducer = createReducer({
  // [lineObtained]: (state, action) => ({...state, ...action}),
  [mixTreeValue]: (state, action) => mixValues(state, action),
  [mixValue]: (state, action) => mixSingleValues(state, action),
}, getInitialState());

function mixValues(state, action){
  if(isNaN(action.c)){return state;}
  if(!action.key || !action.value || !action.second){return state;}
  const newstate = Object.assign({},state);
  if(state[action.key][action.value] && state[action.key][action.value][action.second]){
    newstate[action.key][action.value][action.second] = state[action.key][action.value][action.second] + action.c;
  } else {
    newstate[action.key][action.value] = newstate[action.key][action.value] || {};
    newstate[action.key][action.value][action.second] = action.c;
  }
  return Object.assign({}, state, newstate);
  // return mixinDeep(state, newstate);
}
function mixSingleValues(state, action){
  if(isNaN(action.c)){return state;}
  if(!action.key || !action.value){return state;}
  const newstate = Object.assign({},state);
  if(state[action.key][action.value]){
    newstate[action.key][action.value] = state[action.key][action.value] + action.c;
  } else {
    newstate[action.key][action.value] = action.c;
  }
  return Object.assign({}, state, newstate);
  // return mixinDeep(state, newstate);
}


export default counterReducer;
