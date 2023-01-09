import {Provider} from 'react-redux';
import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import HistoryRouter from '../../components/history/history';
import {AuthorizationStatus} from '../../const';
import PlayerScreen from './player-screen';
import {makeFakeFilm} from '../../utils/mocks';

const mockStore = configureMockStore();
const history = createMemoryHistory();
const mockFilms = [makeFakeFilm()];
const mockFilm = makeFakeFilm();


const store = mockStore({
  AUTH_INFO: {
    authorizationStatus: AuthorizationStatus.Auth
  },
  FILM_DATA: {
    currentFilm: mockFilm,
    filmLoading: false,
    similarFilms: [],
    similarLoading: false,
  },
  FAVORITE_DATA: {
    favoriteFilms: [],
    favoritesCount: 0,
    areFavoriteLoading: false,
    areFavoriteOutdated: false,
  }
});

jest.mock('react', () => ({
  ...jest.requireActual("react"),
  useEffect: jest.fn()
}))

describe('Component: MoviePage', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
      <HistoryRouter history={history}>
        <MoviePageScreen/>
        </HistoryRouter>
        </Provider>,
    );

    expect(screen.getByText('Play')).toBeInTheDocument();
    expect(screen.getByText(mockFilm.name)).toBeInTheDocument();
    expect(screen.getByText(/More like this/i)).toBeInTheDocument();
  });
});
