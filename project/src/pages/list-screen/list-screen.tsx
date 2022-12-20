import React from 'react';
import Footer from '../../components/footer/footer';
import Logo from '../../components/logo/logo';
import {Film} from '../../types/film';
import FilmList from '../../components/film-list/film-list';
import UserInfo from "../../components/user-info/user-info";
import {useAppSelector} from "../../hooks";

const FILM_CARDS_COUNT = 9;

const ListScreen: React.FC = () => {
  const {films} = useAppSelector((state) => state);

  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <Logo/>

        <h1 className="page-title user-page__title">My list <span className="user-page__film-count">9</span></h1>
        <UserInfo/>
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
