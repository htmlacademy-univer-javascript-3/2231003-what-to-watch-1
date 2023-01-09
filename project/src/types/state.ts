import {store} from '../store/index.js';
import {AuthorizationStatus} from '../const';
import {Film} from "./film";
import {Comment} from "./comment";
import {UserData} from "./user-data";

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
  user: UserData | undefined;
};

export type FavoriteData = {
  favoriteFilms: Film[];
  favoriteLoading: boolean;
};

export type FilmData = {
  currentFilm: Film | undefined;
  filmLoading: boolean;
  similarFilms: Film[];
  similarLoading: boolean;
};

export type ReviewsData = {
  reviewsFilmId: number;
  reviewsLoading: boolean;
  reviews: Comment[];
  isReviewPosting: boolean,
};

export type GeneralData = {
  allFilms: Film[];
  genresList: string[];
  genreToFilms: { [id: string]: Film[] };
  promo: Film | undefined;
  currentGenre: string;
  pageFilms: Film[];
  page: number;
  isLastPage: boolean;
  allFilmsLoading: boolean;
  promoLoading: boolean;
};


export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
