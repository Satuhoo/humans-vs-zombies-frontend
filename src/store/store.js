import { applyMiddleware, createStore, compose } from 'redux';
import { appReducers } from './reducers/appReducers';
import thunk from 'redux-thunk';

const tools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
const composedEnhancers = compose(applyMiddleware(thunk), tools);

export const store = createStore(
    appReducers,
    composedEnhancers
);