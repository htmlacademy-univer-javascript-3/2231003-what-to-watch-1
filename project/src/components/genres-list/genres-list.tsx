import React from 'react';
import Genre from './genre';
import {getGenres} from '../../store/general-data/selector';
import {useAppSelector} from '../../hooks';

const MAX_GENRES_COUNT = 10;

const GenresList: React.FC = () => {
  const genres = useAppSelector(getGenres).slice(0, MAX_GENRES_COUNT);

  return (
    <ul className='catalog__genres-list'>
      {genres.map((genre) => <Genre key={genre} genre={genre}/>)}
    </ul>
  );
};

export default GenresList;
