import React from 'react';
import {Link} from 'react-router-dom';
import {Film} from '../../types/film';

type Props = {
  film: Film,
  setActiveFilm: (film: Film) => void,
}

const FilmCard: React.FC<Props> = (props) => {
  const {film, setActiveFilm} = props;

  return (
    <article
      className="small-film-card catalog__films-card"
      onMouseEnter={() => setActiveFilm(film)}
      onMouseLeave={() => setActiveFilm({} as Film)}
    >
      <div className="small-film-card__image">
        <img src={film.previewImage} alt={film.name} width="280" height="175"/>
      </div>
      <h3 className="small-film-card__title">
        <Link className="small-film-card__link" to={`/films/${film.id}`}>{film.name}</Link>
      </h3>
    </article>
  );
};

export default FilmCard;
