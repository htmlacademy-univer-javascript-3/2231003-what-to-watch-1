import {reviewsData} from './film-reviews-data';
import {ReviewsData} from '../../types/state';
import {fetchReviewsAction,} from '../api-actions';
import {makeFakeComment} from '../../utils/mocks';

describe('Reducer: reviewsData', () => {
  let state: ReviewsData;

  beforeEach(() => {
    state = {
      reviewsFilmId: 0,
      reviewsLoading: false,
      reviews: [],
      isReviewPosting: false
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(reviewsData.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual({
        reviewsFilmId: 0,
        reviewsLoading: false,
        reviews: []
      });
  });

  describe('fetchReviewsAction test', () => {
    it('should update reviews and reviewsLoading to false if fetchReviewsAction fulfilled', () => {
      state.reviewsLoading = true;
      const fakeComment = makeFakeComment()
      const comments = {
        filmId: fakeComment.id,
        comments: [fakeComment]
      }
      expect(reviewsData.reducer(state, {
        type: fetchReviewsAction.fulfilled.type,
        payload: {filmId: fakeComment.id, comments: comments}
      }))
        .toEqual({
          reviews: comments,
          reviewsFilmId: fakeComment.id,
          reviewsLoading: false,
        });
    });
    it('should update reviewsLoading to true if fetchReviewsAction pending', () => {
      expect(reviewsData.reducer(state, {type: fetchReviewsAction.pending.type}))
        .toEqual({
          reviewsFilmId: 0,
          reviewsLoading: true,
          reviews: []
        });
    });
    it('should update reviewsLoading to false if fetchReviewsAction rejected', () => {
      state.reviewsLoading = true;
      expect(reviewsData.reducer(state, {type: fetchReviewsAction.rejected.type}))
        .toEqual({
          reviewsFilmId: 0,
          reviewsLoading: false,
          reviews: []
        });
    });
  });
});
