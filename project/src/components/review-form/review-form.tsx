import React, {Fragment, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {addReviewAction} from '../../store/api-actions';
import {getFilm} from '../../store/film-data/selector';
import {isReviewPosting} from '../../store/film-reviews-data/selector';

const STARS_COUNT = 10;
const MAX_COMMENT_LEN = 400;
const MIN_COMMENT_LEN = 50;

const ReviewForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const film = useAppSelector(getFilm);
  const isCommentPosting = useAppSelector(isReviewPosting);
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState('');

  const handleCommentChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(evt.target.value);
  };
  const handleRatingChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setRating(evt.target.value);
  };
  const handleSubmit = (evt: React.FocusEvent<HTMLFormElement>) => {
    evt.preventDefault();
    dispatch(addReviewAction({comment: comment, filmId: film?.id, rating: rating}));
  };

  const ratingStars = [...Array(STARS_COUNT)].map((_, index) => {
    const currentStar = STARS_COUNT - index;

    return (
      <Fragment key={currentStar}>
        <input
          className="rating__input"
          id={`star-${currentStar}}`}
          type="radio"
          name="rating"
          value={currentStar}
          onChange={handleRatingChange}
          required
        />
        <label
          className="rating__label"
          htmlFor={`star-${currentStar}}`}
        >Rating {index}
        </label>
      </Fragment>
    );
  });

  return (
    <form className="add-review__form" onSubmit={handleSubmit}>
      <div className="rating">
        <div className="rating__stars">
          {ratingStars}
        </div>
      </div>

      <div className="add-review__text">
        <textarea
          className="add-review__textarea"
          name="review-text"
          id="review-text"
          data-testid='textarea'
          placeholder="Review text"
          onChange={handleCommentChange}
          value={comment}
          maxLength={MAX_COMMENT_LEN}
          minLength={MIN_COMMENT_LEN}
          required
        >
        </textarea>
        <div className="add-review__submit">
          <button
            className="add-review__btn" type="submit"
            disabled={comment.length < MIN_COMMENT_LEN || comment.length > MAX_COMMENT_LEN || isCommentPosting}
          >
            Post
          </button>
        </div>

      </div>
    </form>
  );
};

export default ReviewForm;
