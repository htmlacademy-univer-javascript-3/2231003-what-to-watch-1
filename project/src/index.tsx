import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import App from './components/app/app';
import {store} from './store';
import {fetchFilmsAction, checkAuthAction, fetchPromoFilm} from './store/api-actions';
import {browserHistory} from './browser-history';
import HistoryRouter from './components/history/history';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

store.dispatch(fetchFilmsAction());
store.dispatch(fetchPromoFilm());
store.dispatch(checkAuthAction());

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HistoryRouter history={browserHistory}>
        <App/>
      </HistoryRouter>
    </Provider>
  </React.StrictMode>,
);
