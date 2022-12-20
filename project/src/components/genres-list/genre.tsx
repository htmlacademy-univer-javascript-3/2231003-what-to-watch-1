import React from 'react';
import {store} from '../../store/index';
import {changeGenre} from '../../store/action';

type Props = {
  isCurrentGenre: boolean,
  genre: string,
};

const Genre: React.FC<Props> = (props) => {
  const {genre, isCurrentGenre} = props;
  const handleClick = () => {
    store.dispatch(changeGenre({genre: genre}));
  };

  return (
    <li className={`catalog__genres-item ${isCurrentGenre ? 'catalog__genres-item--active' : ''}`}>
      <a href='#' className='catalog__genres-link' onClick={handleClick}>{genre}</a>
    </li>
  );
};

export default Genre;
