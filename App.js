import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise';
import Navigators from './src/navigators';

import reducers from './src/app/reducers';
const store = createStore(reducers, applyMiddleware(promiseMiddleware))

export default class App extends React.Component {
  render() {
  return (
    <Provider store={store}>
      <Navigators />
    </Provider>
    );
  }
}

