import {createAction} from '@reduxjs/toolkit';
import {Film} from '../types/film';
import {AuthorizationStatus} from '../const';
import {UserData} from '../types/user-data';
import {Comment} from "../types/comment";

export const Action = {
  GET_FILMS: 'GET_FILMS',
  CHANGE_GENRE: 'CHANGE_GENRE',
  SET_FILMS_LOADED_STATUS: 'SET_FILMS_LOADED_STATUS',
  REQUIRE_AUTHORIZATION: 'REQUIRE_AUTHORIZATION',
  SAVE_USER: 'SAVE_USER',
  SET_FILM: 'SET_FILM',
  SET_SIMILAR_FILMS: 'SET_SIMILAR_FILMS',
  SET_FILM_REVIEWS: 'SET_FILM_REVIEWS',
  REDIRECT_TO_ROUTE: 'REDIRECT_TO_ROUTE',
  SET_PROMO_FILM: 'SET_PROMO_FILM',
};

export const getFilms = createAction<{ films: Film[] }>(Action.GET_FILMS);
export const changeGenre = createAction<{ genre: string }>(Action.CHANGE_GENRE);
export const setLoadedStatus = createAction<boolean>(Action.SET_FILMS_LOADED_STATUS);
export const setLoadedStatusForFilm = createAction<boolean>("SET_FILM_LOADED_STATUS");
export const setLoadedStatusForComments = createAction<boolean>("SET_COMMENTS_LOADED_STATUS");
export const setPromoFilm = createAction<Film>(Action.SET_PROMO_FILM);
export const requireAuthorization = createAction<AuthorizationStatus>(Action.REQUIRE_AUTHORIZATION);
export const saveUser = createAction<UserData>(Action.SAVE_USER);
export const setFilm = createAction<Film>(Action.SET_FILM);
export const setSimilarFilms = createAction<Film[]>(Action.SET_SIMILAR_FILMS);
export const setFilmReviews = createAction<Comment[]>(Action.SET_FILM_REVIEWS);
export const redirectToRoute = createAction<string>(Action.REDIRECT_TO_ROUTE);

