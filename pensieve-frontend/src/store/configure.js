import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import penderMiddleware from 'redux-pender';
import * as modules from './modules';

import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

const reducers = combineReducers(modules);
const middlewares = [penderMiddleware()];

// 개발 모드일 때만 Redux Devtools를 적용합니다.
// const isDev = process.env.NODE_ENT === 'development';
// const devtools = isDev && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE;
// const composeEnhancers = devtools || compose;

// const configure = (preloadState) => createStore(reducers, preloadState, composeEnhancers(applyMiddleware(...middlewares)));

const configure = (preloadState) => createStore(reducers, preloadState, composeWithDevTools(applyMiddleware(...middlewares)));

export default configure;