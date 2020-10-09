import React from 'react'
import { Provider } from 'react-redux'
import { store, persistor } from './store/store'
import { PersistGate } from 'redux-persist/integration/react'
import MainContainer from './main-container/main-container'

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <MainContainer />
      </PersistGate>
    </Provider>
  );
};

export default App;
