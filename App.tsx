import Navigation from '@src/screens';
import store from '@src/store';
import React from 'react';
import 'react-native-gesture-handler';
import { Provider } from 'react-redux';

const App = () => {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
};

export default App;
