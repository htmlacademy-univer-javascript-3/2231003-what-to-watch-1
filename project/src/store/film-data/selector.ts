import { State } from '../../types/state';
import { NameSpace } from '../../const';
import {Film} from "../../types/film";

export const getSimilarFilms = (state: State): Film[] => state[NameSpace.FilmData].similarFilms;
export const areSimilarLoading = (state: State): boolean => state[NameSpace.FilmData].similarLoading;
export const getFilm = (state: State): Film | undefined => state[NameSpace.FilmData].currentFilm;
export const isFilmLoading = (state: State): boolean => state[NameSpace.FilmData].filmLoading;
