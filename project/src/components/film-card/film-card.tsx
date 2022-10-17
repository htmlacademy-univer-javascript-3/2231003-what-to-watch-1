import React from 'react';
import {Link} from 'react-router-dom';
import {FilmInfo} from '../../types/film-info';

type Props = {
  filmInfo: FilmInfo,
  setActiveFilm: (film: FilmInfo) => void,
}

const FilmCard: React.FC<Props> = (props) => {
  const {filmInfo, setActiveFilm} = props;
  return (
    <article
      className="small-film-card catalog__films-card"
      onMouseEnter={() => setActiveFilm(filmInfo)}
      onMouseLeave={() => setActiveFilm({} as FilmInfo)}
    >
      <div className="small-film-card__image">
        <img src={filmInfo.previewImage} alt={filmInfo.name} width="280" height="175"/>
      </div>
      <h3 className="small-film-card__title">
        <Link className="small-film-card__link" to={`/films/${filmInfo.id}`}>{filmInfo.name}</Link>
      </h3>
    </article>
  );
};

export default FilmCard;
