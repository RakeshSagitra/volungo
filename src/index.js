import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

import createSagaMiddleware from 'redux-saga'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { logger } from 'redux-logger'
import reducer from './reducers/index'
import rootSaga from './sagas'
const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  reducer,
  applyMiddleware(sagaMiddleware, logger),
)
sagaMiddleware.run(rootSaga)
ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
)
if (module.hot) { module.hot.accept(App) }