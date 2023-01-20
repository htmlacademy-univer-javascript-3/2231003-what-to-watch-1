import {Provider} from 'react-redux';
import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import HistoryRouter from '../../components/history/history';
import {AuthorizationStatus} from '../../const';
import MyList from './list-screen';
import {makeFakeFilm} from '../../utils/mocks';

const mockStore = configureMockStore();
const history = createMemoryHistory();
const mockFilms = [makeFakeFilm()];


const store = mockStore({
  AUTH_INFO: {
    authorizationStatus: AuthorizationStatus.Auth
  },
  FAVORITE_DATA: {
    favoriteFilms: mockFilms,
    favoritesCount: mockFilms.length,
    areFavoriteLoading: false,
    areFavoriteOutdated: false,
  }
});

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useEffect: jest.fn()
}));

describe('Component: MyList', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <MyList/>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText('My list')).toBeInTheDocument();
    expect(screen.getByText(/Catalog/i)).toBeInTheDocument();
  });
});
