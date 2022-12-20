import {Route, Routes} from 'react-router-dom';
import React from 'react';
import MainScreen from '../../pages/main-screen/main-screen';
import AddReview from '../../pages/add-review-screen/add-review-screen';
import SignIn from '../../pages/sign-in-screen/sign-in-screen';
import MyList from '../../pages/list-screen/list-screen';
import Movie from '../../pages/movie-page-screen/movie-page-screen';
import Player from '../../pages/player-screen/player-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import {AppRoute, AuthorizationStatus} from '../../const';
import PrivateRoute from '../private-route/private-route';
import {Comment} from '../../types/comment';
import {useAppSelector} from '../../hooks/index';
import Load from '../load/load';
import {browserHistory} from '../../browser-history';
import {HistoryRouter} from '../history/history';


const App: React.FC = () => {
  const {isLoaded, authorizationStatus} = useAppSelector((state) => state);

  if (!isLoaded) {
    return <Load/>;
  }

  return (
    <HistoryRouter history={browserHistory}>
      <Routes>
        <Route
          path={AppRoute.MyList}
          element={
            <PrivateRoute authorizationStatus={authorizationStatus}>
              <MyList/>
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.SingIn}
          element={<SignIn/>}
        />
        <Route
          path={AppRoute.Root}
          element={<MainScreen/>}
        />
        <Route
          path={AppRoute.Film}
          element={
            <Movie/>
          }
        />
        <Route
          path={AppRoute.AddReview}
          element={
            <AddReview/>
          }
        />
        <Route
          path={AppRoute.Player}
          element={
            <Player/>
          }
        />
        <Route
          path="*"
          element={<NotFoundScreen/>}
        />
      </Routes>
    </HistoryRouter>
  );
};

export default App;

