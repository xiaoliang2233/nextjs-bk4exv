import '../styles/globals.css';
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from './store';

function MyApp({ Component, pageProps }) {
  useEffect(() => {});
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
