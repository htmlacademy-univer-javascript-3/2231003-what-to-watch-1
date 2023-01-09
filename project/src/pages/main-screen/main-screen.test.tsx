import {Provider} from 'react-redux';
import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import HistoryRouter from '../../components/history/history';
import {AuthorizationStatus} from '../../const';
import MainScreen from './main-screen';
import {makeFakeFilm} from '../../utils/mocks';

const mockStore = configureMockStore();
const history = createMemoryHistory();
const mockFilms = [makeFakeFilm()];
const mockFilm = makeFakeFilm();


const store = mockStore({
  AUTH_INFO: {
    authorizationStatus: AuthorizationStatus.Auth
  },
  GENERAL_DATA: {
    allFilms: mockFilms,
    genresList: ['All genres'],
    genreToFilms: {},
    promo: mockFilm,
    currentGenre: 'All genres',
    pageFilms: [],
    page: 1,
    isLastPage: false,
    allFilmsLoading: false,
    promoLoading: false,
  },
  FILM_REVIEWS_DATA: {
    reviewsFilmId: 0,
    reviewsLoading: false,
    reviews: []
  },
  FAVORITE_DATA: {
    favoriteFilms: [],
    favoriteLoading: false,
  }
});

jest.mock('react', () => ({
  ...jest.requireActual("react"),
  useEffect: jest.fn()
}))

describe('Component: Main', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <MainScreen/>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText('Play')).toBeInTheDocument();
    expect(screen.getByText(/Catalog/i)).toBeInTheDocument();
    expect(screen.getByText(mockFilm.genre)).toBeInTheDocument();
    expect(screen.getByText(mockFilm.released)).toBeInTheDocument();
  });
});
