import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import {getFavoriteFilmsAction} from '../api-actions';
import {FavoriteData} from '../../types/state';


const initialState = {
  favoriteFilms: [],
  favoriteLoading: false,
} as FavoriteData;

export const favoriteData = createSlice({
  name: NameSpace.FilmData,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getFavoriteFilmsAction.pending, (state) => {
        state.favoriteLoading = true;
      })
      .addCase(getFavoriteFilmsAction.fulfilled, (state, action) => {
        state.favoriteFilms = action.payload;
        state.favoriteLoading = false;
      })
      .addCase(getFavoriteFilmsAction.rejected, (state) => {
        state.favoriteLoading = false;
      });
  }
});
