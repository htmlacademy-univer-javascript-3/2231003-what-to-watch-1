import React, {useState} from 'react';
import FilmCard from '../film-card/film-card';
import type {Film} from '../../types/film';

type Props = {
  films: Film[],
}

const FilmList: React.FC<Props> = (props) => {
  const {films} = props;
  const [, setActiveFilm] = useState({});

  const activeFilmHandler = (film: Film) => {
    setActiveFilm(film);
  };

  return (
    <div className="catalog__films-list">
      {films.map((film) => <FilmCard key={film.id} film={film} setActiveFilm={activeFilmHandler}/>)}
    </div>
  );
};

export default FilmList;
