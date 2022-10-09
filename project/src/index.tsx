import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

const promoFilmInfo = {
  genre: 'Drama',
  name: 'The Grand Budapest Hotel',
  releaseDate: 2014
};

root.render(
  <React.StrictMode>
    <App promoFilmInfo={promoFilmInfo}/>
  </React.StrictMode>,
);
