import {favoriteData} from './favorite-data';
import {FavoriteData} from '../../types/state';
import {getFavoriteFilmsAction} from '../api-actions';
import {makeFakeFilm} from '../../utils/mocks';

describe('Reducer: favorite', () => {
  let state: FavoriteData;

  beforeEach(() => {
    state = {
      favoriteFilms: [],
      favoriteLoading: false,
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(favoriteData.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual({favoriteFilms: [], favoriteLoading: false,});
  });

  describe('getFavoriteFilmsAction test', () => {
    it('should update favoriteFilms and favoriteLoading to false if getFavoriteFilmsAction fulfilled', () => {
      state.favoriteLoading = true;
      const mockFilm = makeFakeFilm();
      expect(favoriteData.reducer(state, {type: getFavoriteFilmsAction.fulfilled.type, payload: [mockFilm]}))
        .toEqual({favoriteFilms: [mockFilm], favoriteLoading: false,});
    });
    it('should update favoriteLoading to true if getFavoriteFilmsAction pending', () => {
      expect(favoriteData.reducer(state, {type: getFavoriteFilmsAction.pending.type}))
        .toEqual({favoriteFilms: [], favoriteLoading: true,});
    });
    it('should update favoriteLoading to false if getFavoriteFilmsAction rejected', () => {
      state.favoriteLoading = true;
      expect(favoriteData.reducer(state, {type: getFavoriteFilmsAction.fulfilled.type}))
        .toEqual({favoriteLoading: false,});
    });
  });
});
