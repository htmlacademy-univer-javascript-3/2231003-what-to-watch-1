import React from 'react';
import {Film} from '../../types/film';

type Props = {
  film: Film,
}

const OverviewTab: React.FC<Props> = (props) => {
  const {film} = props;

  return (
    <>
      <div className="film-rating">
        <div className="film-rating__score">{film.rating}</div>
        <p className="film-rating__meta">
          <span className="film-rating__level">Very good</span>
          <span className="film-rating__count">{film.scoresCount}</span>
        </p>
      </div>

      <div className="film-card__text">
        {film.description}
        <p className="film-card__director"><strong>Director: {film.director}</strong></p>
        <p className="film-card__starring"><strong>{film.starring.join(',')}</strong></p>
      </div>
    </>
  );
};

export default OverviewTab;
