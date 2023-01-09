import React, {useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import Logo from '../../components/logo/logo';
import UserInfo from '../../components/user-info/user-info';
import ReviewForm from '../../components/review-form/review-form';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {getFilm, isFilmLoading} from '../../store/film-data/selector';
import {fetchFilmAction} from '../../store/api-actions';
import Load from '../../components/load/load';


const AddReviewScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const film = useAppSelector(getFilm);
  const isLoading = useAppSelector(isFilmLoading);
  const {id} = useParams();
  useEffect(() => {
    dispatch(fetchFilmAction(id));
  }, [id]);

  if (isLoading) {
    return <Load/>;
  }

  return (
    <section className="film-card film-card--full">
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src={film?.backgroundImage} alt={film?.name}/>
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header">
          <Logo/>

          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link to={`/films/${film?.id}`} className="breadcrumbs__link">{film?.name}</Link>
              </li>
              <li className="breadcrumbs__item">
                <a className="breadcrumbs__link">Add review</a>
              </li>
            </ul>
          </nav>
          <UserInfo/>
        </header>

        <div className="film-card__poster film-card__poster--small">
          <img src={film?.posterImage} alt={`${film?.name} poster`} width="218" height="327"/>
        </div>
      </div>

      <div className="add-review">
        <ReviewForm/>
      </div>

    </section>
  );
};

export default AddReviewScreen;
