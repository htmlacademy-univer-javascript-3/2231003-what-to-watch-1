import React from 'react';
import {useAppSelector} from '../../hooks';
import {getReviews} from '../../store/film-reviews-data/selector';
import {Months} from '../../const';

const ReviewsTab: React.FC = () => {
  const reviews = useAppSelector(getReviews);

  const getFormatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${Months[date.getMonth()]} ${date.getDay()}, ${date.getFullYear()}`;
  };

  return (
    <div className="film-card__reviews film-card__row">
      <div className="film-card__reviews-col">
        {reviews.map((comment) => <div className="review">
            <blockquote className="review__quote">
              <p className="review__text">{comment.comment}</p>

              <footer className="review__details">
                <cite className="review__author">{comment.user.name}</cite>
                <time className="review__date">{getFormatDate(comment.date)}</time>
              </footer>
            </blockquote>

            <div className="review__rating">{comment.rating}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewsTab;
