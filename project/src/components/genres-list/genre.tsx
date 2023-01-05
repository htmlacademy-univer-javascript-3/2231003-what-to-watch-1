import React from 'react';
import {changeGenreAction} from '../../store/general-data/general-data';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {getGenre} from '../../store/general-data/selector';

type Props = {
  genre: string,
};

const Genre: React.FC<Props> = (props) => {
  const {genre} = props;
  const dispatch = useAppDispatch();
  const currentGenre = useAppSelector(getGenre);

  return (
    <li className={`catalog__genres-item ${genre === currentGenre ? 'catalog__genres-item--active' : ''}`}>
      <a href='#' className='catalog__genres-link' onClick={() => dispatch(changeGenreAction(genre))}>{genre}</a>
    </li>
  );
};

export default Genre;
