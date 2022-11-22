import { createReducer } from '@reduxjs/toolkit';
import { changeGenre, getFilms, setFilmsLoadedStatus } from './action';
import {Film} from '../types/film';

const initialState = {
  films: new Array<Film>(),
  genre: 'All genres',
  isFilmsLoaded: false
};

export const updateStore = createReducer(initialState, (builder) => {
  builder
    .addCase(getFilms, (state, action) => {
      const { films } = action.payload;
      state.films = films;
    })
    .addCase(changeGenre, (state, action) => {
      const { genre } = action.payload;
      state.genre = genre;
    })
    .addCase(setFilmsLoadedStatus, (state, action) => {
      state.isFilmsLoaded = action.payload;
    });
});
