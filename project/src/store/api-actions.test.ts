import {Action} from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createAPI} from '../services/api';
import {
  addReviewAction,
  checkAuthAction, fetchChangeFavoriteFilmsAction,
  fetchFilmAction,
  fetchFilmsAction,
  fetchPromoFilm, fetchReviewsAction, fetchSimilarAction, getFavoriteFilmsAction,
  loginAction,
  logoutAction
} from './api-actions';
import {APIRoute} from '../const';
import {State} from '../types/state';
import {AuthData} from '../types/auth-data';
import {makeFakeFilm, makeFakeComment} from '../utils/mocks';
import {redirectToRoute} from './action';
import {SendComment} from "../types/comment";

describe('Async actions', () => {
  const mockFilm = makeFakeFilm();
  const mockFilms = [makeFakeFilm(), makeFakeFilm()];
  const mockReviews = [makeFakeComment(), makeFakeComment()];
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<State,
    Action<string>,
    ThunkDispatch<State, typeof api, Action>>(middlewares);
  it('should dispatch films when GET /films', async () => {
    mockAPI
      .onGet('/films')
      .reply(200, mockFilms);

    const store = mockStore();

    await store.dispatch(fetchFilmsAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchFilmsAction.pending.type,
      fetchFilmsAction.fulfilled.type
    ]);
  });

  it('should dispatch promo film when GET /promo', async () => {
    mockAPI
      .onGet('/promo')
      .reply(200, mockFilm);

    const store = mockStore();

    await store.dispatch(fetchPromoFilm());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchPromoFilm.pending.type,
      fetchPromoFilm.fulfilled.type
    ]);
  });

  it('should authorization status is «auth» when server return 200', async () => {
    const store = mockStore();
    mockAPI
      .onGet(APIRoute.Login)
      .reply(200, []);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(checkAuthAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      checkAuthAction.pending.type,
      checkAuthAction.fulfilled.type
    ]);
  });

  it('should dispatch RequriedAuthorization and RedirectToRoute when POST /login', async () => {
    const fakeUser: AuthData = {login: 'test@test.ru', password: '123456'};

    mockAPI
      .onPost(APIRoute.Login)
      .reply(200, {token: 'secret'});


    const store = mockStore();
    Storage.prototype.setItem = jest.fn();

    await store.dispatch(loginAction(fakeUser));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      loginAction.pending.type,
      redirectToRoute.type,
      loginAction.fulfilled.type
    ]);

    expect(Storage.prototype.setItem).toBeCalledTimes(1);
    expect(Storage.prototype.setItem).toBeCalledWith('what-to-watch-token', 'secret');
  });

  it('should dispatch Logout when Delete /logout', async () => {
    mockAPI
      .onDelete(APIRoute.Logout)
      .reply(204);

    const store = mockStore();
    Storage.prototype.removeItem = jest.fn();

    await store.dispatch(logoutAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      logoutAction.pending.type,
      redirectToRoute.type,
      logoutAction.fulfilled.type
    ]);

    expect(Storage.prototype.removeItem).toBeCalledTimes(1);
    expect(Storage.prototype.removeItem).toBeCalledWith('what-to-watch-token');
  });

  it('should fetch film film when GET /films/:id', async () => {
    mockAPI
      .onGet('/films/2')
      .reply(200, mockFilm);

    const store = mockStore();

    await store.dispatch(fetchFilmAction('2'));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchFilmAction.pending.type,
      fetchFilmAction.fulfilled.type
    ]);
  });

  it('should fetch similar films film when GET /films/:id/similar', async () => {
    mockAPI
      .onGet('/films/2/similar')
      .reply(200, mockFilms);

    const store = mockStore();

    await store.dispatch(fetchSimilarAction('2'));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchSimilarAction.pending.type,
      fetchSimilarAction.fulfilled.type
    ]);
  });

  it('should fetch similar films film when GET /comments/:id', async () => {
    mockAPI
      .onGet('/comments/2')
      .reply(200, mockReviews);

    const store = mockStore();

    await store.dispatch(fetchReviewsAction(2));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchReviewsAction.pending.type,
      fetchReviewsAction.fulfilled.type
    ]);
  });
  it('test POST /favorite/:id/:status', async () => {
    const postData = {
      filmId: 2,
      status: 1
    }

    mockAPI
      .onPost('/favorite/2/1')
      .reply(200);

    const store = mockStore();

    await store.dispatch(fetchChangeFavoriteFilmsAction(postData));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchChangeFavoriteFilmsAction.pending.type,
      fetchChangeFavoriteFilmsAction.fulfilled.type
    ]);
  });

  it('should fetch favorite films film when GET /favorite', async () => {
    mockAPI
      .onGet('/favorite')
      .reply(200, mockFilms);

    const store = mockStore();

    await store.dispatch(getFavoriteFilmsAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      getFavoriteFilmsAction.pending.type,
      getFavoriteFilmsAction.fulfilled.type
    ]);
  });

  it('test POST /comments/:id', async () => {
    const postData: SendComment = {
      filmId: 2,
      rating: '2',
      comment: 'kek',
    };

    mockAPI
      .onPost(`/comments/${postData.filmId}`, {
        comment: postData.comment,
        rating: postData.rating
      })
      .reply(200);

    const store = mockStore();

    await store.dispatch(addReviewAction(postData));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      addReviewAction.pending.type,
      redirectToRoute.type,
      addReviewAction.fulfilled.type
    ]);
  });
});
