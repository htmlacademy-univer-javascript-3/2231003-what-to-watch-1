import React from 'react';
import {useAppSelector} from '../../hooks';
import {getFilm} from '../../store/film-data/selector';


const DetailsTab: React.FC = () => {
  const film = useAppSelector(getFilm);

  const getFormatRunTime = (minutes: number | undefined) => {
    if (minutes === undefined){
      return '';
    }
    if (minutes >= 60){
      return `${Math.floor(minutes / 60)}h ${minutes % 60}m`;
    }
    return `${minutes % 60}m`;

  };

  return (
    <div className="film-card__text film-card__row">
      <div className="film-card__text-col">
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Director</strong>
          <span className="film-card__details-value">{film?.director}</span>
        </p>
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Starring</strong>
          <span className="film-card__details-value">
            {film?.starring.map((actor) => <>{actor}, <br/></>)}
          </span>
        </p>
      </div>

      <div className="film-card__text-col">
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Run Time</strong>
          <span className="film-card__details-value">{getFormatRunTime(film?.runTime)}</span>
        </p>
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Genre</strong>
          <span className="film-card__details-value">{film?.genre}</span>
        </p>
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Released</strong>
          <span className="film-card__details-value">{film?.released}</span>
        </p>
      </div>
    </div>
  );
};

export default DetailsTab;
