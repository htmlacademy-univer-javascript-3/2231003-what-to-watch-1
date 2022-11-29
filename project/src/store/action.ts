import { createAction } from '@reduxjs/toolkit';
import { Film } from '../types/film';
import { AuthorizationStatus } from '../const';
import {UserData} from '../types/user-data';

export const Action = {
  GET_FILMS: 'GET_FILMS',
  CHANGE_GENRE: 'CHANGE_GENRE',
  SET_FILMS_LOADED_STATUS: 'SET_FILMS_LOADED_STATUS',
  REQUIRE_AUTHORIZATION: 'REQUIRE_AUTHORIZATION',
  SAVE_USER: 'SAVE_USER'
};

export const getFilms = createAction<{films: Film[]}>(Action.GET_FILMS);
export const changeGenre = createAction<{genre: string}>(Action.CHANGE_GENRE);
export const setFilmsLoadedStatus = createAction<boolean>(Action.SET_FILMS_LOADED_STATUS);
export const requireAuthorization = createAction<AuthorizationStatus>(Action.REQUIRE_AUTHORIZATION);
export const saveUser = createAction<UserData>(Action.SAVE_USER);
