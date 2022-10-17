import React from 'react';
import {Link} from 'react-router-dom';
import Logo from '../../components/logo/logo';
import {FilmInfo} from '../../types/film-info';
import ReviewForm from '../../components/review-form/review-form';

type Props = {
  filmInfo: FilmInfo,
}

const AddReviewScreen: React.FC<Props> = (props) => {
  const {filmInfo} = props;
  return (
    <section className="film-card film-card--full">
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src={filmInfo.backgroundImage} alt={filmInfo.name}/>
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header">
          <Logo/>

          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link to={`/films/${filmInfo.id}`} className="breadcrumbs__link">{filmInfo.name}</Link>
              </li>
              <li className="breadcrumbs__item">
                <a className="breadcrumbs__link">Add review</a>
              </li>
            </ul>
          </nav>

          <ul className="user-block">
            <li className="user-block__item">
              <div className="user-block__avatar">
                <img src="img/avatar.jpg" alt="User avatar" width="63" height="63"/>
              </div>
            </li>
            <li className="user-block__item">
              <a className="user-block__link">Sign out</a>
            </li>
          </ul>
        </header>

        <div className="film-card__poster film-card__poster--small">
          <img src={filmInfo.posterImage} alt={`${filmInfo.name} poster`} width="218" height="327"/>
        </div>
      </div>

      <div className="add-review">
        <ReviewForm />
      </div>

    </section>
  );
};

export default AddReviewScreen;
