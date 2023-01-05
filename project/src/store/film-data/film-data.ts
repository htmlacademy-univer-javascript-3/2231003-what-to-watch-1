import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import {fetchChangeFavoriteFilmsAction, fetchFilmAction, fetchSimilarAction} from '../api-actions';
import {FilmData} from '../../types/state';

const initialState = {
  currentFilm: undefined,
  filmLoading: false,
  similarFilms: [],
  similarLoading: false,
} as FilmData;

export const filmData = createSlice({
  name: NameSpace.FilmData,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchFilmAction.pending, (state) => {
        state.filmLoading = true;
      })
      .addCase(fetchFilmAction.fulfilled, (state, action) => {
        state.currentFilm = action.payload;
        state.filmLoading = false;
      })
      .addCase(fetchFilmAction.rejected, (state) => {
        state.filmLoading = false;
      })
      .addCase(fetchSimilarAction.pending, (state) => {
        state.similarLoading = true;
      })
      .addCase(fetchSimilarAction.fulfilled, (state, action) => {
        state.similarFilms = action.payload;
        state.similarLoading = false;
      })
      .addCase(fetchChangeFavoriteFilmsAction.fulfilled, (state, action) => {
        if (state.currentFilm?.id === action.payload.id) {
          state.currentFilm.isFavorite = action.payload.isFavorite
        }
      });
  }
});
