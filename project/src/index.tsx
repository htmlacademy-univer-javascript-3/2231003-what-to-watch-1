import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import App from './components/app/app';
import FILMS from './mocks/films';
import COMMENTS from './mocks/comments';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App promoFilm={FILMS[0]} films={FILMS} comments={COMMENTS}/>
    </BrowserRouter>
  </React.StrictMode>,
);
