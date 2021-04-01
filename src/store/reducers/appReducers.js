import { combineReducers } from 'redux';
import { userReducer } from './userReducer';
import { gameReducer } from './gameReducer';
import { playerReducer } from './playerReducer';
import { chatReducer} from './chatReducer'

export const appReducers = combineReducers({
  user: userReducer, 
  gameReducer, 
  playerReducer,
  chatReducer
});