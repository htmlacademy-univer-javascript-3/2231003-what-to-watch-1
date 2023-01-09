import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import HistoryRouter from '../history/history';
import {AuthorizationStatus, AppRoute} from '../../const';
import App from './app';
import {makeFakeFilm} from '../../utils/mocks';

const mockFilm = makeFakeFilm();
const mockStore = configureMockStore();

const store = mockStore({
  'GENERAL_DATA': {
    allFilms: [],
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
  'FILM_DATA': {
    currentFilm: mockFilm,
    filmLoading: false,
    similarFilms: [],
    similarLoading: false,
  },
  'FILM_REVIEWS_DATA': {
    reviewsFilmId: 0,
    reviewsLoading: false,
    reviews: []
  },
  'AUTH_INFO': {
    authorizationStatus: AuthorizationStatus.Auth,
    user: undefined
  },
  'FAVORITE_DATA': {
    favoriteFilms: [],
    favoriteLoading: false,
  }
});

const history = createMemoryHistory();

const fakeApp = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <App/>
    </HistoryRouter>
  </Provider>
);

describe('Application Routing', () => {
  it('should render "MainScreen" when user navigate to "/"', () => {
    history.push(AppRoute.Root);

    render(fakeApp);

    expect(screen.getByText(/Play/i)).toBeInTheDocument();
    expect(screen.getByText(mockFilm.name)).toBeInTheDocument();
    expect(screen.getByText(mockFilm.genre)).toBeInTheDocument();
    expect(screen.getByText(mockFilm.released)).toBeInTheDocument();
    expect(screen.getByText(/All genres/i)).toBeInTheDocument();
  });

  it('should render "SingInScreen" when user navigate to "/login"', () => {
    history.push(AppRoute.SingIn);

    render(fakeApp);

    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email address/i)).toBeInTheDocument();
  });

  it('should render "MyListScreen" when user navigate to "/mylist"', () => {
    history.push(AppRoute.MyList);

    render(fakeApp);

    expect(screen.getByText(/My list/i)).toBeInTheDocument();
  });

  it('should render "MoviePageScreen" when user navigate to "/films/:id"', () => {
    history.push("/films/0");

    render(fakeApp);

    expect(screen.getByText(/Overview/i)).toBeInTheDocument();
    expect(screen.getByText(/Details/i)).toBeInTheDocument();
    expect(screen.getByText(/Reviews/i)).toBeInTheDocument();
    expect(screen.getByText(/Play/i)).toBeInTheDocument();
    expect(screen.getByText(/My list/i)).toBeInTheDocument();
    expect(screen.getByText(mockFilm.name)).toBeInTheDocument();
    expect(screen.getByText(mockFilm.genre)).toBeInTheDocument();
  });

  it('should render "NotFoundScreen" when user navigate to non-existent route', () => {
    history.push('/non-existent-route');

    render(fakeApp);

    expect(screen.getByText('404. Page not found')).toBeInTheDocument();
    expect(screen.getByText('Вернуться на главную')).toBeInTheDocument();
  });

  it('should render "AddReviewScreen" when user navigate to "/films/:id/review"', () => {
    history.push("/films/0/review");

    render(fakeApp);

    expect(screen.getByText(/Add review/i)).toBeInTheDocument();
  });

  it('should render "PlayerScreen" when user navigate to "/player/:id"', () => {
    history.push("/player/0");

    render(fakeApp);

    expect(screen.getByText(/Transpotting/i)).toBeInTheDocument();
    expect(screen.getByText(/Exit/i)).toBeInTheDocument();
  });
});
