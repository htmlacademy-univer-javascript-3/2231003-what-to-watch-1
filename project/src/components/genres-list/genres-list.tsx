import React from 'react';
import Genre from './genre';
import { getGenres, getGenre } from '../../store/general-data/selector';
import { changeGenreAction } from '../../store/general-data/general-data';
import {useAppSelector} from "../../hooks";

type Props = {
  currentGenre: string,
  genres: string[],
};

const GenresList: React.FC<Props> = (props) => {
  const genres = useAppSelector(getGenres);
  const currentGenre = useAppSelector(getGenre);

  return (
    <ul className='catalog__genres-list'>
      {genres.map((genre) => <Genre key={genre} isCurrentGenre={currentGenre === genre} genre={genre}/>)}
    </ul>
  );
};

export default GenresList;
