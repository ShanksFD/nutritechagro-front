import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';

import App from './App';
import store from './store';
import './i18n';
import { WebsiteLoader } from './components/Utils/UIUtils';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <HelmetProvider>
        <Suspense fallback={<WebsiteLoader />}>
          <App />
        </Suspense>
      </HelmetProvider>
    </BrowserRouter>
  </Provider>
);
