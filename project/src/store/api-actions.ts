import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../types/state';
import {APIRoute} from '../const';
import {Film} from '../types/film';
import {
  redirectToRoute,
} from './action';
import {AuthData} from '../types/auth-data';
import {UserData} from '../types/user-data';
import {saveToken, dropToken} from '../services/token';
import {Comment, Comments, SendComment} from '../types/comment';

export const fetchFilmsAction = createAsyncThunk<Film[], undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchFilms',
  async (_arg, {dispatch, extra: api}) => {
    const response = await api.get<Film[]>(APIRoute.Films);
    return response.data;
  },
);

export const fetchPromoFilm = createAsyncThunk<Film, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchPromoFilm',
  async (_arg, {dispatch, extra: api}) => {
    const response = await api.get<Film>(APIRoute.Promo);
    return response.data;
  },
);

export const checkAuthAction = createAsyncThunk<UserData, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get(APIRoute.Login);
    return data;
  },
);

export const loginAction = createAsyncThunk<UserData, AuthData, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/login',
  async ({login: email, password}, {dispatch, extra: api}) => {
    const {data} = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(data.token);
    dispatch(redirectToRoute('/'));
    return data;
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete('/logout');
    dropToken();
    dispatch(redirectToRoute('/'));
  },
);

export const fetchFilmAction = createAsyncThunk<Film, string | undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchFilm',
  async (id, {dispatch, extra: api}) => {
    const response = await api.get<Film>(`/films/${id}`);
    return response.data;
  },
);

export const fetchSimilarAction = createAsyncThunk<Film[], string | undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchSimilarFilms',
  async (id, {dispatch, extra: api}) => {
    const response = await api.get<Film[]>(`${APIRoute.Films}/${id}${APIRoute.Similar}`);
    return response.data;
  },
);

export const fetchReviewsAction = createAsyncThunk<Comments, number, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'FETCH_FILM_REVIEWS',
  async (id, {dispatch, extra: api}) => {
    const response = await api.get<Comment[]>(`/comments/${id}`);
    return {
      filmId: id,
      comments: response.data
    } as Comments;
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
      const result = await api.post(`/comments/${data.filmId}`, {
        comment: data.comment,
        rating: data.rating
      });
      if (result.status === 200) {
        dispatch(redirectToRoute(`/films/${data.filmId}`));
      }
    } catch {
      dispatch(redirectToRoute('/*'));
    }
  },
);

export const getFavoriteFilmsAction = createAsyncThunk<Film[], undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchFavoriteFilms',
  async (data, {dispatch, extra: api}) => {
    const response = await api.get<Film[]>('/favorite');
    return response.data;
  },
);

export const fetchChangeFavoriteFilmsAction = createAsyncThunk<Film, { filmId: number | undefined, status: number }, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchChange',
  async ({filmId, status}, {extra: api}) => {
    const {data} = await api.post<Film>(`/favorite/${filmId}/${status}`);
    return data;
  },
);
