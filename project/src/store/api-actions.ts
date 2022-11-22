import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../types/state';
import {APIRoute} from '../const';
import {Film} from '../types/film';
import {getFilms, setFilmsLoadedStatus} from './action';

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
