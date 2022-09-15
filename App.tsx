import Navigation from '@src/screens';
import store from '@src/store';
import React from 'react';
import { LogBox } from 'react-native';
import 'react-native-gesture-handler';
import { Provider } from 'react-redux';

LogBox.ignoreLogs(['Sending `expo-file-system.downloadProgress` with no listeners registered.']);
const App = () => {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
};

export default App;
