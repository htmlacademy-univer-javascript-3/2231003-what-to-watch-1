import React, {useEffect} from 'react';
import {Comment} from '../../types/comment';
import {useAppDispatch, useAppSelector} from "../../hooks";
import {fetchReviewsAction} from "../../store/api-actions";
import Load from "../load/load";
import {getFilm} from "../../store/film-data/selector";
import {getReviews} from "../../store/film-reviews-data/selector";

const ReviewsTab: React.FC = (props) => {
  const reviews = useAppSelector(getReviews);

  return (
    <div className="film-card__reviews film-card__row">
      <div className="film-card__reviews-col">
        {reviews.map((comment) => <div className="review">
            <blockquote className="review__quote">
              <p className="review__text">{comment.comment}</p>

              <footer className="review__details">
                <cite className="review__author">{comment.user.name}</cite>
                <time className="review__date">{comment.date}</time>
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
