import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../types/state';
import {APIRoute, AuthorizationStatus} from '../const';
import {Film} from '../types/film';
import {
  getFilms,
  setLoadedStatus,
  requireAuthorization,
  saveUser,
  setFilm,
  setFilmReviews,
  setSimilarFilms,
  redirectToRoute,
  setPromoFilm, setLoadedStatusForFilm, setLoadedStatusForComments
} from './action';
import {AuthData} from '../types/auth-data';
import {UserData} from '../types/user-data';
import {saveToken, dropToken} from "../services/token";
import {Comment, SendComment} from "../types/comment";

export const fetchFilmsAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchFilms',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setLoadedStatus(false));
    const filmsResponse = await api.get<Film[]>(APIRoute.Films);
    const promoFilmResponse = await api.get<Film>(APIRoute.Promo)
    dispatch(getFilms({films: filmsResponse.data}));
    dispatch(setPromoFilm(promoFilmResponse.data));
    dispatch(setLoadedStatus(true));
  },
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      const {data: user} = await api.get(APIRoute.Login);
      dispatch(saveUser(user));
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch (error) {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/login',
  async ({login: email, password}, {dispatch, extra: api}) => {
    try {
      const {data: userData} = await api.post<UserData>(APIRoute.Login, {email, password});
      saveToken(userData.token);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch (error) {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    try {
      await api.delete(APIRoute.Logout);
      dropToken();
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    } catch (error) {
    }
  },
);

export const fetchFilmAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchFilm',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setLoadedStatusForFilm(false));
    try {
      const film = await api.get<Film>(`${APIRoute.Films}/${_arg}`)
      const similarFilms = await api.get<Film[]>(`${APIRoute.Films}/${_arg}${APIRoute.Similar}`)
      dispatch(setFilm(film.data));
      dispatch(setSimilarFilms(similarFilms.data));
    } catch {
      dispatch(redirectToRoute('/*'));
    }
    dispatch(setLoadedStatusForFilm(true));
  },
);

export const fetchReviewsAction = createAsyncThunk<void, number, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchReviews',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setLoadedStatusForComments(false));
    try {
      const {data} = await api.get<Comment[]>(`${APIRoute.Reviews}/${_arg}`)
      dispatch(setFilmReviews(data));
    } catch {
      dispatch(redirectToRoute('/*'));
    }
    dispatch(setLoadedStatusForComments(true));
  },
);

export const addReviewAction = createAsyncThunk<void, SendComment, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/addReview',
  async (data, {dispatch, extra: api}) => {
    try {
      await api.post(`/comments/${data.filmId}`, {
        comment: data.comment,
        rating: data.rating
      });
    } catch {
      dispatch(redirectToRoute('/*'));
    }
  },
);
