// tslint:disable no-string-literal

import { createStore, applyMiddleware, Middleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import { rootReducer } from './reducers';

export default function configureStore(
  additionalMiddleware: Middleware[] = []
) {
  return createStore(
    rootReducer,
    composeWithDevTools(
      applyMiddleware(thunk, ...additionalMiddleware)
      // other store enhancers if any
    )
  );
}
