import MainScreen from '../../pages/main-screen/main-screen';
import AddReview from '../../pages/add-review-screen/add-review-screen';
import SignIn from '../../pages/sign-in-screen/sign-in-screen';
import MyList from '../../pages/list-screen/list-screen';
import Film from '../../pages/movie-page-screen/movie-page-screen';
import Player from '../../pages/player-screen/player-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import type {PromoFilmInfo} from '../../types/promo-film-info';
import {Route, Routes} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const';
import PrivateRoute from '../private-route/private-route';

type Props = {
  promoFilmInfo: PromoFilmInfo,
  children?: JSX.Element;
}

function App(props: Props): JSX.Element {
  return (
    <Routes>
      <Route
        path={AppRoute.MyList}
        element={
          <PrivateRoute authorizationStatus={AuthorizationStatus.NoAuth}>
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
        element={<MainScreen promoFilmInfo={props.promoFilmInfo}/>}
      />
      <Route
        path={AppRoute.Film}
        element={
          <Film/>
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
  );
}

export default App;

