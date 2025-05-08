import React, { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import router from './router';
import store from './store';
import './styles/global.css';
import Loader from './components/common/Loader';
import ThemeProvider from './components/theme/ThemeProvider';

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider>
      <Suspense fallback={<Loader />}>
        <RouterProvider router={router} />
      </Suspense>
      </ThemeProvider>
    </Provider>
  );
};

export default App ;