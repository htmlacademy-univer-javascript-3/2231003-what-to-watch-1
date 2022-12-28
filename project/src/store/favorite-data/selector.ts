import { State } from '../../types/state';
import { NameSpace } from '../../const';
import {Film} from "../../types/film";

export const areFavoriteFilmsInLoading = (state: State): boolean => state[NameSpace.FavoriteData].favoriteLoading;
export const getFavoriteFilms = (state: State): Film[] => state[NameSpace.FavoriteData].favoriteFilms;
