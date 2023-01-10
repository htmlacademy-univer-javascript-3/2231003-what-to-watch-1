import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import {fetchPromoFilm, fetchFilmsAction, fetchChangeFavoriteFilmsAction} from '../api-actions';
import {GeneralData} from '../../types/state';
import {Film} from '../../types/film';

const FILMS_ON_PAGE_COUNT = 8;

const initialState = {
  allFilms: [],
  genresList: ['All genres'],
  genreToFilms: {},
  promo: undefined,
  currentGenre: 'All genres',
  pageFilms: [],
  page: 1,
  promoLoading: false,
  isLastPage: false,
  allFilmsLoading: false,
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
    showMoreFilmsAction: (state) => {
      if (!state.isLastPage) {
        const genreFilms = state.genreToFilms[state.currentGenre];
        state.page += 1;
        state.pageFilms = [...genreFilms.slice(0, state.page * FILMS_ON_PAGE_COUNT)];
        state.isLastPage = genreFilms.length <= (state.page * FILMS_ON_PAGE_COUNT);
      }
    },
    changeGenreAction: (state, action) => {
      const genreFilms = state.genreToFilms[action.payload];
      state.page = 1;
      state.currentGenre = action.payload;
      state.pageFilms = genreFilms.slice(0, FILMS_ON_PAGE_COUNT);
      state.isLastPage = genreFilms.length <= FILMS_ON_PAGE_COUNT;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchFilmsAction.pending, (state) => {
        state.allFilmsLoading = true;
      })
      .addCase(fetchFilmsAction.fulfilled, (state, action) => {
        state.allFilmsLoading = false;
        state.allFilms = action.payload;
        state.genresList = extractAvailableGenres(action.payload);
        state.genreToFilms = {'All genres': action.payload};
        for (const genre of state.genresList) {
          state.genreToFilms[genre] = sortFilmsByGenre(action.payload, genre);
        }
        state.isLastPage = action.payload.length <= FILMS_ON_PAGE_COUNT;
        state.pageFilms = action.payload.slice(0, FILMS_ON_PAGE_COUNT);
      })
      .addCase(fetchFilmsAction.rejected, (state, action) => {
        state.allFilmsLoading = false;
      })
      .addCase(fetchChangeFavoriteFilmsAction.fulfilled, (state, action) => {
        if (state.promo?.id === action.payload.id) {
          state.promo.isFavorite = action.payload.isFavorite;
        }
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

export const {changeGenreAction, showMoreFilmsAction} = generalData.actions;
