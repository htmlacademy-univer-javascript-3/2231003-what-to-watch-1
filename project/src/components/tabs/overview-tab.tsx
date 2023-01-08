import React from 'react';
import {useAppSelector} from '../../hooks';
import {getFilm} from '../../store/film-data/selector';


const OverviewTab: React.FC = () => {
  const film = useAppSelector(getFilm);

  const getFilmScore = (score: number | undefined) => {
    if (score === undefined){
      return '';
    }
    if (score < 3){
      return 'Bad';
    }
    if (score >= 3 && score < 5){
      return 'Normal';
    }
    if (score >= 5 && score < 8){
      return 'Good';
    }
    if (score >= 8 && score < 10){
      return 'Very good';
    }
    return 'Awesome';
  };

  return (
    <>
      <div className="film-rating">
        <div className="film-rating__score">{film?.rating}</div>
        <p className="film-rating__meta">
          <span className="film-rating__level">{getFilmScore(film?.rating)}</span>
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
