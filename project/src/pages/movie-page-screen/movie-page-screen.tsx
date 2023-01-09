import React from 'react';
import {useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import Footer from '../../components/footer/footer';
import Logo from '../../components/logo/logo';
import FilmList from '../../components/film-list/film-list';
import Tabs from '../../components/tabs/tabs';
import UserInfo from '../../components/user-info/user-info';
import {useAppDispatch, useAppSelector} from '../../hooks';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import Load from '../../components/load/load';
import {AuthorizationStatus} from '../../const';
import {fetchFilmAction, fetchReviewsAction, fetchSimilarAction} from '../../store/api-actions';
import {getFilm, getSimilarFilms, areSimilarLoading, isFilmLoading} from '../../store/film-data/selector';
import {getAuthorizationStatus} from '../../store/user-process/selector';
import AddMovieInList from '../../components/add-movie-in-list/add-movie-in-list';

const MoviePageScreen: React.FC = () => {
  const {id} = useParams();

  useEffect(() => {
    dispatch(fetchFilmAction(id));
    dispatch(fetchSimilarAction(id));
    if (id !== undefined){
      dispatch(fetchReviewsAction(+id));
    }
  }, [id]);

  const dispatch = useAppDispatch();
  const similarFilms = useAppSelector(getSimilarFilms);
  const areSimilarFilmsLoading = useAppSelector(areSimilarLoading);
  const film = useAppSelector(getFilm);
  const isLoading = useAppSelector(isFilmLoading);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  if (areSimilarFilmsLoading || isLoading) {
    return <Load/>;
  }

  return (
    <>
      <section className="film-card film-card--full">
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src={film?.backgroundImage} alt={film?.name}/>
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header film-card__head">
            <Logo/>
            <UserInfo/>
          </header>

          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">{film?.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{film?.genre}</span>
                <span className="film-card__year">{film?.released}</span>
              </p>

              <div className="film-card__buttons">
                <Link to={`/player/${film?.id}`} className="btn btn--play film-card__button" type="button">
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </Link>
                <AddMovieInList film={film}/>
                {
                  authorizationStatus === AuthorizationStatus.Auth && (
                    <Link to={`/films/${id}/review`} className="btn film-card__button">Add review</Link>
                  )
                }
              </div>
            </div>
          </div>
        </div>

        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img src={film?.posterImage} alt={film?.name} width="218" height="327"/>
            </div>
            <Tabs/>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>
          <FilmList films={similarFilms.slice(0, 4)}/>
        </section>
        <Footer/>
      </div>
    </>
  );
};

export default MoviePageScreen;
