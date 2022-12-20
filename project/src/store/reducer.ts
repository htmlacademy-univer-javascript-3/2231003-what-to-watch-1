import {createReducer} from '@reduxjs/toolkit';
import {
  changeGenre,
  getFilms,
  saveUser,
  requireAuthorization,
  setLoadedStatus,
  setSimilarFilms,
  setFilmReviews,
  setFilm,
  setPromoFilm, setLoadedStatusForFilm, setLoadedStatusForComments
} from './action';
import {Film} from '../types/film';
import {AuthorizationStatus} from '../const';
import {UserData} from "../types/user-data";
import {Comment} from "../types/comment";

type State ={
  films: Film[];
  genre: string;
  isLoaded: boolean;
  isFilmLoaded: boolean;
  isCommentsLoaded: boolean;
  authorizationStatus: AuthorizationStatus;
  userDate: UserData | null;
  reviews: Comment[];
  film: Film | null;
  similarFilms: Film[] | null;
  error: string | null;
  promoFilm: Film | null;
}

const initialState: State = {
  films: new Array<Film>(),
  genre: 'All genres',
  isLoaded: false,
  isFilmLoaded: false,
  isCommentsLoaded: false,
  authorizationStatus: AuthorizationStatus.Unknown,
  userDate: null,
  film: null,
  reviews: [],
  similarFilms: [],
  error: null,
  promoFilm: null
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
    .addCase(setLoadedStatus, (state, action) => {
      state.isLoaded = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(saveUser, (state, action) => {
      state.userDate = action.payload;
    })
    .addCase(setFilm, (state, action) => {
      state.film = action.payload;
    })
    .addCase(setFilmReviews, (state, action) => {
      state.reviews = action.payload;
    })
    .addCase(setSimilarFilms, (state, action) => {
      state.similarFilms = action.payload;
    })
    .addCase(setPromoFilm, (state, action) => {
      state.promoFilm = action.payload;
    })
    .addCase(setLoadedStatusForFilm, (state, action) => {
      state.isFilmLoaded = action.payload;
    })
    .addCase(setLoadedStatusForComments, (state, action) => {
      state.isCommentsLoaded = action.payload;
    });
});
