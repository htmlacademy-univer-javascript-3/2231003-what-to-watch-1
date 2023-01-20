import {changeGenreAction, generalData} from './general-data';
import {GeneralData} from '../../types/state';
import {fetchChangeFavoriteFilmsAction, fetchFilmsAction, fetchPromoFilm} from '../api-actions';
import {makeFakeFilm} from '../../utils/mocks';

describe('Reducer: generalData', () => {
  let state: GeneralData;
  const FILMS = [makeFakeFilm(), makeFakeFilm()];

  beforeEach(() => {
    state = {
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
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(generalData.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual({
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
      });
  });

  describe('fetchPromoFilm test', () => {
    it('should update promo and promoLoading to false if fetchPromoFilm fulfilled', () => {
      state.promoLoading = true;
      const fakePromo = makeFakeFilm();
      expect(generalData.reducer(state, {
        type: fetchPromoFilm.fulfilled.type,
        payload: fakePromo
      }))
        .toEqual({
          allFilms: [],
          genresList: ['All genres'],
          genreToFilms: {},
          promo: fakePromo,
          currentGenre: 'All genres',
          pageFilms: [],
          page: 1,
          isLastPage: false,
          allFilmsLoading: false,
          promoLoading: false,
        });
    });
    it('should update promoLoading to true if fetchPromoFilm pending', () => {
      expect(generalData.reducer(state, {type: fetchPromoFilm.pending.type}).promoLoading)
        .toEqual(true);
    });
    it('should update promoLoading to false if fetchPromoFilm rejected', () => {
      state.promoLoading = true;
      expect(generalData.reducer(state, {type: fetchPromoFilm.rejected.type}).promoLoading)
        .toEqual(false);
    });
  });

  describe('fetchChangeFavoriteFilmsAction test', () => {
    it('should update promo favorite status if fetchChangeFavoriteFilmsAction fulfilled and id is similar', () => {
      const mockFilm1 = makeFakeFilm();
      mockFilm1.isFavorite = false;
      const mockFilm2 = makeFakeFilm();
      mockFilm2.isFavorite = true;
      mockFilm2.id = mockFilm1.id;
      state.promo = mockFilm1;
      expect(generalData.reducer(state, {
        type: fetchChangeFavoriteFilmsAction.fulfilled.type,
        payload: mockFilm2
      }).promo?.isFavorite)
        .toEqual(true);
    });
    it('should not update promo favorite status if fetchChangeFavoriteFilmsAction fulfilled and id is not similar', () => {
      const mockFilm1 = makeFakeFilm();
      mockFilm1.id = 1;
      mockFilm1.isFavorite = false;
      const mockFilm2 = makeFakeFilm();
      mockFilm2.id = 2;
      mockFilm2.isFavorite = true;
      state.promo = mockFilm1;
      expect(generalData.reducer(state, {
        type: fetchChangeFavoriteFilmsAction.fulfilled.type,
        payload: mockFilm2
      }).promo?.isFavorite)
        .toEqual(false);
    });
  });

  describe('changeGenreAction test', () => {
    it('should change genre', () => {
      if (FILMS[0].genre === FILMS[1].genre){
        FILMS[0].genre += 'kek';
      }
      state.genresList = ['All genres', FILMS[0].genre, FILMS[1].genre];
      state.genreToFilms = {
        'All genres': FILMS,
      };
      state.genreToFilms[FILMS[0].genre] = [FILMS[0]];
      state.genreToFilms[FILMS[1].genre] = [FILMS[1]];

      expect(generalData.reducer(state, changeGenreAction(FILMS[0].genre)))
        .toEqual({
          allFilms: [],
          genresList: ['All genres', FILMS[0].genre, FILMS[1].genre],
          genreToFilms: state.genreToFilms,
          promo: undefined,
          currentGenre: FILMS[0].genre,
          pageFilms: [FILMS[0]],
          promoLoading: false,
          page: 1,
          isLastPage: true,
          allFilmsLoading: false,
        });
    });
  });

  describe('fetchFilmsAction test', () => {
    it('should update allFilms if fetchFilmsAction fulfilled', () => {
      expect(generalData.reducer(state, {
        type: fetchFilmsAction.fulfilled.type,
        payload: FILMS
      }).allFilms).toEqual(FILMS);
    });
    it('should update allFilmsLoading to true if fetchFilmsAction pending', () => {
      expect(generalData.reducer(state, {type: fetchFilmsAction.pending.type}).allFilmsLoading)
        .toEqual(true);
    });
    it('should update allFilmsLoading to false if fetchFilmsAction rejected', () => {
      state.allFilmsLoading = true;
      expect(generalData.reducer(state, {type: fetchFilmsAction.rejected.type}).allFilmsLoading)
        .toEqual(false);
    });
  });
});
