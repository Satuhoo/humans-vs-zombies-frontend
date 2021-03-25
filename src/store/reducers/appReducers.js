import { combineReducers } from 'redux';
import { gameReducer } from './gameReducer';
import { playerReducer } from './playerReducer';

export const appReducers = combineReducers({gameReducer, playerReducer});