import React from 'react';
import {Film} from '../../types/film';
import {useAppSelector} from "../../hooks";
import {getFilm} from "../../store/film-data/selector";


const OverviewTab: React.FC = (props) => {
  const film = useAppSelector(getFilm);

  return (
    <>
      <div className="film-rating">
        <div className="film-rating__score">{film?.rating}</div>
        <p className="film-rating__meta">
          <span className="film-rating__level">Very good</span>
          <span className="film-rating__count">{film?.scoresCount}</span>
        </p>
      </div>

      <div className="film-card__text">
        {film?.description}
        <p className="film-card__director"><strong>Director: {film?.director}</strong></p>
        <p className="film-card__starring"><strong>{film?.starring.join(',')}</strong></p>
      </div>
    </>
  );
};

export default OverviewTab;
