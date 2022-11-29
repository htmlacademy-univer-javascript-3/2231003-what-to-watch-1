import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../types/state';
import {APIRoute, AuthorizationStatus} from '../const';
import {Film} from '../types/film';
import {getFilms, setFilmsLoadedStatus, requireAuthorization, saveUser} from './action';
import {AuthData} from '../types/auth-data';
import {UserData} from '../types/user-data';
import {saveToken, dropToken} from "../services/token";

export const fetchFilmsAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchFilms',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setFilmsLoadedStatus(false));
    const {data} = await api.get<Film[]>(APIRoute.Films)
    dispatch(getFilms({films: data}));
    dispatch(setFilmsLoadedStatus(true));
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
