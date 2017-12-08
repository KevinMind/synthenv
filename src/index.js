import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, applyMiddleware } from 'redux'
import reducers from './reducers/index'
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';




import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

let store = createStore(
  reducers,
  applyMiddleware(thunk)
)


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
