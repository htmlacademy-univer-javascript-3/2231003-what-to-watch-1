import { createReducer } from '@reduxjs/toolkit';
import Films from '../mocks/films';
import { changeGenre, getFilms } from './action';

const initialState = {
  films: Films,
  genre: 'All genres',
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
    });
});
