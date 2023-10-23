import React from 'react';

import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/lib/integration/react';
import {MainNavigator} from './src/navigation';
import {persister, store} from './src/redux/store';
import {Text} from 'react-native';

export default function App() {
  Text.defaultProps = {};
  Text.defaultProps.color = 'black';

  return (
    <>
      <Provider store={store}>
        <PersistGate persistor={persister}>
          <MainNavigator />
        </PersistGate>
      </Provider>
    </>
  );
}
// export {App};
