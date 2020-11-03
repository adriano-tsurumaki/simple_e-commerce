import React from 'react';

import Routes from './routes/routes';
import AlertMessage from './components/AlertMessage';
import { Provider } from 'react-redux';
import store from './store';

import './styles.css';

function App() {

  return (
    <Provider store={store}>
      <Routes />
      <AlertMessage />
    </Provider>
  )
}

export default App;
