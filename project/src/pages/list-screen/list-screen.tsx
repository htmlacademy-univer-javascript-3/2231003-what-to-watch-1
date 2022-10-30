import React from 'react';
import Footer from '../../components/footer/footer';
import Logo from '../../components/logo/logo';
import {Film} from '../../types/film';
import FilmList from '../../components/film-list/film-list';

const FILM_CARDS_COUNT = 9;

type Props = {
  films: Film[],
}

const ListScreen: React.FC<Props> = (props) => {
  const {films} = props;

  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <Logo/>

        <h1 className="page-title user-page__title">My list <span className="user-page__film-count">9</span></h1>
        <ul className="user-block">
          <li className="user-block__item">
            <div className="user-block__avatar">
              <img src="img/avatar.jpg" alt="User avatar" width="63" height="63"/>
            </div>
          </li>
          <li className="user-block__item">
            <a className="user-block__link">Sign out</a>
          </li>
        </ul>
      </header>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <div className="catalog__films-list">
          <FilmList films={films.splice(0, FILM_CARDS_COUNT)}/>
        </div>
      </section>
      <Footer/>
    </div>
  );
};

export default ListScreen;
