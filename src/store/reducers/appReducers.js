import { combineReducers } from 'redux';
import { userReducer } from './userReducer';
import { gameReducer } from './gameReducer';
import { playerReducer } from './playerReducer';

export const appReducers = combineReducers({
  user: userReducer, 
  gameReducer, 
  playerReducer
});