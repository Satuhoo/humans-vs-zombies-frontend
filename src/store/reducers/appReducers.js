import { combineReducers } from 'redux';
import { gameReducer } from './gameReducer';

export const appReducers = combineReducers({gameReducer});