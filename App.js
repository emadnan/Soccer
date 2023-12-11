import React from 'react';
import { StripeProvider } from '@stripe/stripe-react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/lib/integration/react';
import {MainNavigator} from './src/navigation';
import {persister, store} from './src/redux/store';
import {Text} from 'react-native';

export default function App() {
  Text.defaultProps = {};
  Text.defaultProps.color = 'black';
  const stripePublishableKey = 'pk_test_51OCht8FoJsFIRDkiPJD5jMwh8fszPCRLvPftxZmkBVAnDbUFCemwaxOeIkahtPIDjqQ7lgtGC0ArsBEjae9Mhi8E00RRbB5IEY';
  return (
    <>
    <StripeProvider publishableKey={stripePublishableKey}
     
      //  urlScheme="wrr34f4f4gt55f5yg544gffe" // required for 3D Secure and bank redirects
      //  merchantIdentifier="merchant.com.{{YOUR_APP_NAME}}" // required for Apple Pay
    >
      <Provider store={store}>
        <PersistGate persistor={persister}>
          <MainNavigator />
        </PersistGate>
      </Provider>
    </StripeProvider>
  </>
  );
}

