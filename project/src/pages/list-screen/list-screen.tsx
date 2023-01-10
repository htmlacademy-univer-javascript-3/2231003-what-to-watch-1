import React, {useEffect} from 'react';
import Footer from '../../components/footer/footer';
import Logo from '../../components/logo/logo';
import FilmList from '../../components/film-list/film-list';
import UserInfo from '../../components/user-info/user-info';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {getFavoriteFilms, areFavoriteFilmsInLoading} from '../../store/favorite-data/selector';
import Load from '../../components/load/load';
import {getFavoriteFilmsAction} from '../../store/api-actions';
import NotFoundScreen from '../not-found-screen/not-found-screen';


const ListScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getFavoriteFilmsAction());
  }, [dispatch]);

  const films = useAppSelector(getFavoriteFilms);
  const areInLoading = useAppSelector(areFavoriteFilmsInLoading);

  if (films === undefined) {
    return <NotFoundScreen/>;
  }

  if (areInLoading) {
    return <Load/>;
  }

  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <Logo/>

        <h1 className="page-title user-page__title">My list <span className="user-page__film-count">{films.length}</span></h1>
        <UserInfo/>
      </header>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>
        <div className="catalog__films-list">
          <FilmList films={films}/>
        </div>
      </section>
      <Footer/>
    </div>
  );
};

export default ListScreen;
