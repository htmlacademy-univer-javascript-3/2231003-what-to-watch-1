import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import Footer from '../../components/footer/footer';
import Logo from '../../components/logo/logo';
import FilmList from '../../components/film-list/film-list';
import GenresList from '../../components/genres-list/genres-list';
import ShowMore from '../../components/show-more/show-more';
import {useAppDispatch, useAppSelector} from '../../hooks';
import UserInfo from '../../components/user-info/user-info';
import {
  getPromoFilm,
  isPromoLoading,
  getPageFilms,
  areFilmLoading,
  isPageLast
} from '../../store/general-data/selector';
import Load from '../../components/load/load';
import MovieInList from '../../components/add-movie-in-list/add-movie-in-list';
import {changeGenreAction, turnToNextPageAction} from '../../store/general-data/general-data';
import {areReviewsLoading} from '../../store/film-reviews-data/selector';

const ALL_GENRES = 'All genres';

const MainScreen: React.FC = () => {
  const films = useAppSelector(getPageFilms);
  const promoFilm = useAppSelector(getPromoFilm);
  const promoLoading = useAppSelector(isPromoLoading);
  const isFilmLoading = useAppSelector(areFilmLoading);
  const isLastFilmPage = useAppSelector(isPageLast);
  const areLoading = useAppSelector(areReviewsLoading);
  const dispatch = useAppDispatch();
  const changeGenreHandle = (genre: string) => dispatch(changeGenreAction(genre));
  useEffect(() => {
    changeGenreHandle(ALL_GENRES);
  }, []);
  if (promoLoading || isFilmLoading || areLoading) {
    return <Load/>;
  }

  return (
    <>
      <section className="film-card">
        <div className="film-card__bg">
          <img src={promoFilm?.backgroundImage} alt={promoFilm?.name}/>
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header film-card__head">
          <Logo/>
          <UserInfo/>
        </header>

        <div className="film-card__wrap">
          <div className="film-card__info">
            <div className="film-card__poster">
              <img src={promoFilm?.posterImage} alt={promoFilm?.name} width="218" height="327"/>
            </div>

            <div className="film-card__desc">
              <h2 className="film-card__title">The {promoFilm?.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{promoFilm?.genre}</span>
                <span className="film-card__year">{promoFilm?.released}</span>
              </p>

              <div className="film-card__buttons">
                <Link to={`/player/${promoFilm?.id}`} className="btn btn--play film-card__button" type="button">
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </Link>
                {promoFilm !== undefined && <MovieInList film={promoFilm}/>}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>
          <GenresList/>

          <div className="catalog__films-list">
            <FilmList films={films}/>
          </div>
          {!isLastFilmPage && <ShowMore onClick={() => dispatch(turnToNextPageAction())}/>}
        </section>
        <Footer/>
      </div>
    </>
  );
};

export default MainScreen;
