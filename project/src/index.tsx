import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <App genre={'Drama'} name={'The Grand Budapest Hotel'} releaseDate={2014}/>
  </React.StrictMode>,
);
