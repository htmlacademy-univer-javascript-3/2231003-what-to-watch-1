import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { fetchPromoFilm, fetchFilmsAction } from '../api-actions';
import {GeneralData} from "../../types/state";
import {Film} from "../../types/film";

const PAGE_SIZE = 8;


const initialState = {
  allFilms: [],
  genresList: ['All genres'],
  genreToFilms: {},
  promo: undefined,
  currentGenre: 'All genres',
  pageFilms: [],
  page: 1,
  isLastPage: false,
  allFilmsLoading: false,
  promoLoading: false,
} as GeneralData;

function sortFilmsByGenre(allFilms: Film[], genre: string) {
  if (genre === 'All genres') {
    return allFilms;
  }
  return allFilms.filter((movies) => movies.genre === genre);
}

function extractAvailableGenres(films: Film[]) {
  const genres = new Set<string>(films.map((film) => film.genre));
  genres.add('All genres');
  return Array.from(genres);
}

export const generalData = createSlice({
  name: NameSpace.GeneralData,
  initialState,
  reducers: {
    changeGenreAction: (state, action) => {
      state.currentGenre = action.payload;
      state.page = 1;
      const genreFilms = state.genreToFilms[action.payload];
      state.pageFilms = genreFilms.slice(0, PAGE_SIZE);
      state.isLastPage = genreFilms.length <= PAGE_SIZE;
    },
    turnToNextPageAction: (state) => {
      if (!state.isLastPage) {
        const genreFilms = state.genreToFilms[state.currentGenre];
        state.pageFilms = [...state.pageFilms, ...genreFilms.slice(state.page * PAGE_SIZE, (state.page + 1) * PAGE_SIZE)];
        state.page += 1;
        state.isLastPage = genreFilms.length <= (state.page * PAGE_SIZE);
      }
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchFilmsAction.pending, (state) => {
        state.allFilmsLoading = true;
      })
      .addCase(fetchFilmsAction.fulfilled, (state, action) => {
        state.allFilms = action.payload;
        state.genresList = extractAvailableGenres(action.payload);
        state.genreToFilms = { 'All genres': action.payload };
        for (const genre of state.genresList) {
          state.genreToFilms[genre] = sortFilmsByGenre(action.payload, genre);
        }
        state.pageFilms = action.payload.slice(0, PAGE_SIZE);
        state.isLastPage = action.payload.length <= PAGE_SIZE;
        state.allFilmsLoading = false;
      })
      .addCase(fetchFilmsAction.rejected, (state, action) => {
        state.allFilmsLoading = false;
      })
      .addCase(fetchPromoFilm.pending, (state) => {
        state.promoLoading = true;
      })
      .addCase(fetchPromoFilm.fulfilled, (state, action) => {
        state.promo = action.payload;
        state.promoLoading = false;
      })
      .addCase(fetchPromoFilm.rejected, (state, action) => {
        state.promoLoading = false;
      });
  }
});

export const { changeGenreAction, turnToNextPageAction } = generalData.actions;
