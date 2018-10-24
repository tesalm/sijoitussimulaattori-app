import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import React, { Component } from 'react';

import { name as appName } from './app.json';
import configureStore from './src/redux/store';
import App from './src/App/App.tsx';

// Create the store
const store = configureStore();

class AppView extends Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}

AppRegistry.registerComponent(appName, () => AppView);
