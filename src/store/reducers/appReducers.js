import { combineReducers } from 'redux';
import { userReducer } from './userReducer';
import { gameReducer } from './gameReducer';
import { playerReducer } from './playerReducer';
import { chatReducer} from './chatReducer'
import errorReducer from './errorReducer';

export const appReducers = combineReducers({
  user: userReducer, 
  gameReducer, 
  playerReducer,
  chatReducer,
  error: errorReducer
});