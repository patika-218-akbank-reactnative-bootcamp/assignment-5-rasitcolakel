import Navigation from '@src/screens';
import store from '@src/store';
import React from 'react';
import { LogBox } from 'react-native';
import 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';

LogBox.ignoreLogs(['Sending `expo-file-system.downloadProgress` with no listeners registered.']);
const App = () => {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <Navigation />
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;
