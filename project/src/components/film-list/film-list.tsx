import React, {useState} from 'react';
import FilmCard from '../film-card/film-card';
import type {FilmInfo} from '../../types/film-info';

type Props = {
  filmsInfos: FilmInfo[],
}

const FilmList: React.FC<Props> = (props) => {
  const {filmsInfos} = props;
  const [, setActiveFilm] = useState({});

  const activeFilmHandler = (film: FilmInfo) => {
    setActiveFilm(film);
  };

  return (
    <div className="catalog__films-list">
      {filmsInfos.map((film) => <FilmCard key={film.id} filmInfo={film} setActiveFilm={activeFilmHandler}/>)}
    </div>
  );
};

export default FilmList;
