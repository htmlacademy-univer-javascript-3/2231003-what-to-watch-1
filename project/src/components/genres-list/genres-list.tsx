import React from 'react';
import Genre from './genre';

type Props = {
  currentGenre: string,
  genres: string[],
};

const GenresList: React.FC<Props> = (props) => {
  const {currentGenre, genres} = props;

  return (
    <ul className='catalog__genres-list'>
      {genres.map((genre) => <Genre key={genre} isCurrentGenre={currentGenre === genre} genre={genre}/>)}
    </ul>
  );
};

export default GenresList;
