import React, {useEffect, useState,} from 'react';
import {useNavigate} from 'react-router-dom';
import {Film} from '../../types/film';
import Player from '../player/player';

const TIME_PLAYING = 1000;

type Props = {
  film: Film,
  setActiveFilm: (film: Film) => void,
}

const FilmCard: React.FC<Props> = (props) => {
  const {film, setActiveFilm} = props;
  const [isPlay, setPlay] = useState(false);
  const [needPlay, setNeedPlay] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let needUpdate = true;

    if (needPlay) {
      setTimeout(() => needUpdate && setPlay(true), TIME_PLAYING);
    }

    return () => {
      needUpdate = false;
    };
  }, [needPlay]);

  const handleUnsetActiveFilm = () => {
    setActiveFilm({} as Film);
    setNeedPlay(false);
    setPlay(false);
  };

  return (
    <article
      className="small-film-card catalog__films-card"
      onMouseEnter={() => {
        setActiveFilm(film);
        setNeedPlay(true);
      }}
      onMouseLeave={handleUnsetActiveFilm}
      onClick={() => navigate(`/films/${film.id}`)}
    >
      <div className="small-film-card__image">
        <Player film={film} isPlaying={isPlay}/>
      </div>
      <h3 className="small-film-card__title">
        {film.name}
      </h3>
    </article>
  );
};

export default FilmCard;
