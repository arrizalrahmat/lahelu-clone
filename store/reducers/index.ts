import {combineReducers} from 'redux';
import memesReducer from './memes';

const reducers = combineReducers({
  // Add reducers here
  memes: memesReducer,
});

export default reducers;
