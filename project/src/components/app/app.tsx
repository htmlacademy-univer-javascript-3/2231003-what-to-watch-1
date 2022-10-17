import {Route, Routes} from 'react-router-dom';
import React from 'react';
import MainScreen from '../../pages/main-screen/main-screen';
import AddReview from '../../pages/add-review-screen/add-review-screen';
import SignIn from '../../pages/sign-in-screen/sign-in-screen';
import MyList from '../../pages/list-screen/list-screen';
import Film from '../../pages/movie-page-screen/movie-page-screen';
import Player from '../../pages/player-screen/player-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import type {FilmInfo} from '../../types/film-info';
import {AppRoute, AuthorizationStatus} from '../../const';
import PrivateRoute from '../private-route/private-route';

type Props = {
  promoFilmInfo: FilmInfo,
  films: FilmInfo[]
}

const App: React.FC<Props> = (props) => {
  const {films, promoFilmInfo} = props;
  return (
    <Routes>
      <Route
        path={AppRoute.MyList}
        element={
          <PrivateRoute authorizationStatus={AuthorizationStatus.NoAuth}>
            <MyList filmsInfos={films}/>
          </PrivateRoute>
        }
      />
      <Route
        path={AppRoute.SingIn}
        element={<SignIn/>}
      />
      <Route
        path={AppRoute.Root}
        element={<MainScreen promoFilmInfo={promoFilmInfo} filmsInfos={films}/>}
      />
      <Route
        path={AppRoute.Film}
        element={
          <Film filmInfo={films[0]} filmsInfos={films}/>
        }
      />
      <Route
        path={AppRoute.AddReview}
        element={
          <AddReview filmInfo={films[0]}/>
        }
      />
      <Route
        path={AppRoute.Player}
        element={
          <Player filmInfo={films[0]}/>
        }
      />
      <Route
        path="*"
        element={<NotFoundScreen/>}
      />
    </Routes>
  );
};

export default App;

