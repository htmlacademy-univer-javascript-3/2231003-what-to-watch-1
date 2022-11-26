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
import { useAppSelector } from '../../hooks/index';
import Load from '../load/load';

type Props = {
  comments: Comment[]
}

const App: React.FC<Props> = (props) => {
  const {comments} = props;
  const { isFilmsLoaded, films } = useAppSelector((state) => state);

  if (!isFilmsLoaded){
    return <Load/>;
  }

  return (
    <Routes>
      <Route
        path={AppRoute.MyList}
        element={
          <PrivateRoute authorizationStatus={AuthorizationStatus.NoAuth}>
            <MyList films={films}/>
          </PrivateRoute>
        }
      />
      <Route
        path={AppRoute.SingIn}
        element={<SignIn/>}
      />
      <Route
        path={AppRoute.Root}
        element={<MainScreen promoFilm={films[0]}/>}
      />
      <Route
        path={AppRoute.Film}
        element={
          <Movie film={films[0]} films={films} comments={comments}/>
        }
      />
      <Route
        path={AppRoute.AddReview}
        element={
          <AddReview film={films[0]}/>
        }
      />
      <Route
        path={AppRoute.Player}
        element={
          <Player film={films[0]}/>
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

