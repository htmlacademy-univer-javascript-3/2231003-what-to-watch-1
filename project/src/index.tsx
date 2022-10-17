import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import App from './components/app/app';
import Films from './mocks/films';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App promoFilmInfo={Films[0]} films={Films}/>
    </BrowserRouter>
  </React.StrictMode>,
);
