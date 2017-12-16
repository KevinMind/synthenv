import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, applyMiddleware } from 'redux'
import reducers from './reducers/index'
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// log all mutations to console
// const logger = store => next => action => {
//   // console.group(action.type)
//   // console.info('dispatching', action)
//   let result = next(action)
//   // console.log('next state', store.getState())
//   // console.groupEnd(action.type)
//   return result
// }


let store = createStore(
  reducers,
  // applyMiddleware(logger),
  applyMiddleware(thunk)
)


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
