import { createAction } from '@reduxjs/toolkit';
import { Film } from '../types/film';

export const Action = {
  GET_FILMS: 'GET_FILMS',
  CHANGE_GENRE: 'CHANGE_GENRE',
};

export const getFilms = createAction<{films: Film[]}>(Action.GET_FILMS);
export const changeGenre = createAction<{genre: string}>(Action.CHANGE_GENRE);
