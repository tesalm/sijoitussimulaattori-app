// tslint:disable no-string-literal

import { createStore, applyMiddleware, compose, Middleware } from 'redux';
import thunk from 'redux-thunk';

import { rootReducer } from './reducers';

interface Window {
  [key: string]: any; // Add index signature
}

const middleware = (additionalMiddleware: Middleware[] = []) =>
  (window as Window)['__REDUX_DEVTOOLS_EXTENSION__']
    ? [
        applyMiddleware(thunk, ...additionalMiddleware),
        (window as Window)['__REDUX_DEVTOOLS_EXTENSION__'](),
      ]
    : [applyMiddleware(thunk, ...additionalMiddleware)];

export default function configureStore(additionalMiddleware: Middleware[]) {
  const store = createStore(
    rootReducer,
    compose(...middleware(additionalMiddleware))
  );
  return store;
}
