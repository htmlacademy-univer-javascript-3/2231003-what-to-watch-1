import React from 'react';
import Genre from './genre';
import {getGenres, getGenre} from '../../store/general-data/selector';
import {useAppSelector} from '../../hooks';

type Props = {
  currentGenre: string,
  genres: string[],
};

const GenresList: React.FC<Props> = (props) => {
  const genres = useAppSelector(getGenres).slice(0, 10);

  return (
    <ul className='catalog__genres-list'>
      {genres.map((genre) => <Genre key={genre} genre={genre}/>)}
    </ul>
  );
};

export default GenresList;
