import React, {useState} from 'react';
import {TypedUseSelectorHook, useSelector} from 'react-redux';
import type {Film} from '../../types/film';
import Footer from '../../components/footer/footer';
import Logo from '../../components/logo/logo';
import FilmList from '../../components/film-list/film-list';
import GenresList from '../../components/genres-list/genres-list';
import type { store } from '../../store';
import ShowMore from '../../components/show-more/show-more';
import {useAppSelector} from '../../hooks';
import UserInfo from '../../components/user-info/user-info';


const FILM_STEP_COUNT = 8;
const ALL_GENRES = 'All genres';


const MainScreen: React.FC = () => {
  const {films, genre, promoFilm} = useAppSelector((state) => state);

  const [filmsCount, addFilmsCount] = useState(FILM_STEP_COUNT);
  const handleShowMoreClick = () => {
    addFilmsCount(FILM_STEP_COUNT + filmsCount);
  };
  const filmsCurrentGenre = sortFilmsByGenre(films, genre);

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
                <button className="btn btn--play film-card__button" type="button">
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <button className="btn btn--list film-card__button" type="button">
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"></use>
                  </svg>
                  <span>My list</span>
                  <span className="film-card__count">9</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>
          <GenresList genres={extractAvailableGenres(films)} currentGenre={genre}/>


          <div className="catalog__films-list">
            <FilmList films={filmsCurrentGenre.slice(0, filmsCount)}/>
          </div>
          {filmsCurrentGenre.length > filmsCount && <ShowMore onClick={handleShowMoreClick}/>}
        </section>
        <Footer/>
      </div>
    </>
  );
};

function extractAvailableGenres(films: Film[]): string[] {
  const genres = new Set<string>(films.map((film) => film.genre));
  genres.add(ALL_GENRES);
  return Array.from(genres);
}

function sortFilmsByGenre(films: Film[], genre: string): Film[]{
  if (genre === ALL_GENRES){
    return films;
  }
  return films.filter((movies) => movies.genre === genre);
}

export default MainScreen;
