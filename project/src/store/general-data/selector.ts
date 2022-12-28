import { State } from '../../types/state';
import { NameSpace } from '../../const';
import {Film} from "../../types/film";

export const areFilmLoading = (state: State): boolean => state[NameSpace.GeneralData].allFilmsLoading;
export const isPromoLoading = (state: State): boolean => state[NameSpace.GeneralData].promoLoading;
export const getPageFilms = (state: State): Film[] => state[NameSpace.GeneralData].pageFilms;
export const getPromoFilm = (state: State): Film | undefined => state[NameSpace.GeneralData].promo;
export const isPageLast = (state: State): boolean => state[NameSpace.GeneralData].isLastPage;
export const getGenres = (state: State): string[] => state[NameSpace.GeneralData].genresList;
export const getGenre = (state: State): string => state[NameSpace.GeneralData].currentGenre;
