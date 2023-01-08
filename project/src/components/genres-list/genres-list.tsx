import React from 'react';
import Genre from './genre';
import {getGenres} from '../../store/general-data/selector';
import {useAppSelector} from '../../hooks';

const GenresList: React.FC = () => {
  const genres = useAppSelector(getGenres).slice(0, 10);

  return (
    <ul className='catalog__genres-list'>
      {genres.map((genre) => <Genre key={genre} genre={genre}/>)}
    </ul>
  );
};

export default GenresList;
