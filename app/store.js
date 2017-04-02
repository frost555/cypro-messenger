/**
 * Create the store with asynchronously loaded reducers
 */

import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import loggerMiddleware from 'redux-logger';
import reducer from './reducers';
import sagas from './features/Chat/sagas';
const sagaMiddleware = createSagaMiddleware();

export default function configureStore(initialState = {}) {
  const store = createStore(
    reducer,
    initialState,
    applyMiddleware(sagaMiddleware, loggerMiddleware)
  );

  // Extensions
  store.runSaga = sagaMiddleware.run(sagas);

  // Make reducers hot reloadable, see http://mxs.is/googmo
  /* istanbul ignore next */
  if (module.hot) {
    // module.hot.accept('./reducers', () => {
    //   import('./reducers').then((reducerModule) => {
    //     const createReducers = reducerModule.default;
    //     const nextReducers = createReducers(store.asyncReducers);
    //
    //     store.replaceReducer(nextReducers);
    //   });
    // });
  }

  return store;
}
