import {createReducer} from '@reduxjs/toolkit';
import {changeGenre, getFilms, saveUser, requireAuthorization, setFilmsLoadedStatus} from './action';
import {Film} from '../types/film';
import {AuthorizationStatus} from '../const';
import {UserData} from "../types/user-data";

type State ={
  films: Film[];
  genre: string;
  isFilmsLoaded: boolean;
  authorizationStatus: AuthorizationStatus;
  userDate: UserData | null;
}

const initialState: State = {
  films: new Array<Film>(),
  genre: 'All genres',
  isFilmsLoaded: false,
  authorizationStatus: AuthorizationStatus.Unknown,
  userDate: null
};

export const updateStore = createReducer(initialState, (builder) => {
  builder
    .addCase(getFilms, (state, action) => {
      const {films} = action.payload;
      state.films = films;
    })
    .addCase(changeGenre, (state, action) => {
      const {genre} = action.payload;
      state.genre = genre;
    })
    .addCase(setFilmsLoadedStatus, (state, action) => {
      state.isFilmsLoaded = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(saveUser, (state, action) => {
      state.userDate = action.payload;
    });
});
