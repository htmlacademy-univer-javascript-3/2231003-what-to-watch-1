import {Provider} from 'react-redux';
import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import HistoryRouter from '../../components/history/history';
import {AuthorizationStatus} from '../../const';
import GenresList from './genres-list';
import {makeFakeFilm} from '../../utils/mocks';

const mockStore = configureMockStore();
const history = createMemoryHistory();
const mockFilms = [makeFakeFilm()];


const store = mockStore({
  AUTH_INFO: {
    authorizationStatus: AuthorizationStatus.Auth
  },
  GENERAL_DATA: {
    genresList: ['A', 'B', 'C'],
  },
});

jest.mock('react', () => ({
  ...jest.requireActual("react"),
  useEffect: jest.fn()
}))

describe('Component: MyList', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <GenresList/>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.getByText('B')).toBeInTheDocument();
    expect(screen.getByText('C')).toBeInTheDocument();
  });
});
