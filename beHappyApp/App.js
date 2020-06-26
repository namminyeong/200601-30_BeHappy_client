import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './modules(reducers)';
import { AppRegistry } from 'react-native';

import HomeContainer from './containers/HomeContainer';

const store = createStore(rootReducer);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <HomeContainer />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('BEHAPPYAPP', () => App);
