import { applyMiddleware, createStore, compose } from 'redux';
import { appReducers } from './reducers/appReducers';
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(applyMiddleware(thunk));

export const store = createStore(
    appReducers,
    enhancer
);