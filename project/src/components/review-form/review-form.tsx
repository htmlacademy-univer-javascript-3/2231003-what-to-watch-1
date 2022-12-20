import React, {Fragment, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks";
import {addReviewAction} from "../../store/api-actions";

const STARS_COUNT = 10;

const ReviewForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const {film} = useAppSelector((state) => state);
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState('');

  const commentChangeHandler = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(evt.target.value);
  };
  const ratingChangeHandler = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setRating(evt.target.value);
  };
  const handleSubmit = (evt: React.FocusEvent<HTMLFormElement>) => {
    evt.preventDefault();
    dispatch(addReviewAction({ comment: comment, filmId: film?.id, rating: rating }));
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
          onChange={ratingChangeHandler}
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
          placeholder="Review text"
          onChange={commentChangeHandler}
          value={comment}
        >
        </textarea>
        <div className="add-review__submit">
          <button className="add-review__btn" type="submit">Post</button>
        </div>

      </div>
    </form>
  );
};

export default ReviewForm;
