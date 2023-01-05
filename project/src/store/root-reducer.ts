import {combineReducers} from '@reduxjs/toolkit';
import {NameSpace} from '../const';
import {userProcess} from './user-process/user-process';
import {generalData} from './general-data/general-data';
import {filmData} from './film-data/film-data';
import {reviewsData} from './film-reviews-data/film-reviews-data';
import {favoriteData} from './favorite-data/favorite-data';

export const rootReducer = combineReducers({
  [NameSpace.AuthInfo]: userProcess.reducer,
  [NameSpace.FilmReviewsData]: reviewsData.reducer,
  [NameSpace.FavoriteData]: favoriteData.reducer,
  [NameSpace.GeneralData]: generalData.reducer,
  [NameSpace.FilmData]: filmData.reducer,
});
