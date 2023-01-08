import {filmData} from './film-data';
import {FilmData} from '../../types/state';
import {
  fetchChangeFavoriteFilmsAction,
  fetchFilmAction,
  fetchSimilarAction,
} from '../api-actions';
import {makeFakeFilm} from '../../utils/mocks';

describe('Reducer: film', () => {
  let state: FilmData;

  beforeEach(() => {
    state = {
      currentFilm: undefined,
      filmLoading: false,
      similarFilms: [],
      similarLoading: false,
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(filmData.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual({
        currentFilm: undefined,
        filmLoading: false,
        similarFilms: [],
        similarLoading: false,
      });
  });

  describe('fetchFilmAction test', () => {
    it('should update  currentFilm and filmLoading to false if fetchFilmAction fulfilled', () => {
      state.filmLoading = true;
      const mockFilm = makeFakeFilm();
      expect(filmData.reducer(state, {type: fetchFilmAction.fulfilled.type, payload: mockFilm}))
        .toEqual({currentFilm: mockFilm, filmLoading: false, similarFilms: [], similarLoading: false});
    });
    it('should update filmLoading to true if fetchFilmAction pending', () => {
      expect(filmData.reducer(state, {type: fetchFilmAction.pending.type}))
        .toEqual({filmLoading: true, similarFilms: [], similarLoading: false, currentFilm: undefined,});
    });
    it('should update filmLoading to false if fetchFilmAction rejected', () => {
      state.filmLoading = true;
      expect(filmData.reducer(state, {type: fetchFilmAction.fulfilled.type}))
        .toEqual({filmLoading: false, similarFilms: [], similarLoading: false, currentFilm: undefined});
    });
  });

  describe('fetchSimilarAction test', () => {
    it('should update similarFilms and similarLoading to false if fetchSimilarAction fulfilled', () => {
      state.similarLoading = true;
      const mockFilm = makeFakeFilm();
      expect(filmData.reducer(state, {type: fetchSimilarAction.fulfilled.type, payload: [mockFilm]}))
        .toEqual({currentFilm: undefined, filmLoading: false, similarFilms: [mockFilm], similarLoading: false,});
    });
    it('should update similarLoading to true if fetchSimilarAction pending', () => {
      expect(filmData.reducer(state, {type: fetchSimilarAction.pending.type}))
        .toEqual({currentFilm: undefined, filmLoading: false, similarFilms: [], similarLoading: true});
    });
  });

  describe('fetchChangeFavoriteFilmsAction test', () => {
    it('should update film favorite status if fetchChangeFavoriteFilmsAction fulfilled and id is similar', () => {
      const mockFilm1 = makeFakeFilm();
      mockFilm1.isFavorite = false;
      const mockFilm2 = makeFakeFilm();
      mockFilm2.isFavorite = true
      mockFilm2.id = mockFilm1.id;
      state.currentFilm = mockFilm1;
      expect(filmData.reducer(state, {
        type: fetchChangeFavoriteFilmsAction.fulfilled.type,
        payload: mockFilm2
      }).currentFilm?.isFavorite)
        .toEqual(true);
    });
    it('should not update film favorite status if fetchChangeFavoriteFilmsAction fulfilled and id is not similar', () => {
      const mockFilm1 = makeFakeFilm();
      mockFilm1.id = 1;
      mockFilm1.isFavorite = false;
      const mockFilm2 = makeFakeFilm();
      mockFilm2.id = 2;
      mockFilm2.isFavorite = true
      state.currentFilm = mockFilm1;
      expect(filmData.reducer(state, {
        type: fetchChangeFavoriteFilmsAction.fulfilled.type,
        payload: mockFilm2
      }).currentFilm?.isFavorite)
        .toEqual(false);
    });
  });
});
