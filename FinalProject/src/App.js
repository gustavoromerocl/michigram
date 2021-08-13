/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import RootNavigation from './routes/RootNavigation';
import {Provider} from 'react-redux';
import store from './redux/store';
import UserHandler from './context/User';
import Theme from './context/Theme';
import LoadApi from './context/LoadApi';

const App: () => React$Node = () => {
  return (
    <Provider store={store}>
      <Theme>
        <UserHandler>
          <LoadApi>
            <RootNavigation />
          </LoadApi>
        </UserHandler>
      </Theme>
    </Provider>
  );
};

export default App;
