import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../types/state';
import {APIRoute, AppRoute, AuthorizationStatus} from '../const';
import {Film} from '../types/film';
import {
  redirectToRoute,
} from './action';
import {AuthData} from '../types/auth-data';
import {UserData} from '../types/user-data';
import {saveToken, dropToken} from "../services/token";
import {Comment, Comments, SendComment} from "../types/comment";
import {Navigate} from "react-router-dom";
import React from "react";

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

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    await api.get(APIRoute.Login);
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/login',
  async ({login: email, password}, {dispatch, extra: api}) => {
    const {data: {token}} = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(token);
    dispatch(redirectToRoute('/'));
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
  async (id, { dispatch, extra: api }) => {
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
  async (id, { dispatch, extra: api }) => {
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
  async (id, { dispatch, extra: api }) => {
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
      await api.post(`/comments/${data.filmId}`, {
        comment: data.comment,
        rating: data.rating
      });
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
  async (data, { dispatch, extra: api }) => {
    const response = await api.get<Film[]>('/favorite');
    return response.data;
  },
);
