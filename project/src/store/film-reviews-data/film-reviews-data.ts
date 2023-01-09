import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import {addReviewAction, fetchReviewsAction} from '../api-actions';
import {ReviewsData} from '../../types/state';

const initialState = {
  reviewsFilmId: 0,
  reviewsLoading: false,
  reviews: [],
  isReviewPosting: false
} as ReviewsData;

export const reviewsData = createSlice({
  name: NameSpace.FilmReviewsData,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchReviewsAction.pending, (state) => {
        state.reviewsLoading = true;
      })
      .addCase(fetchReviewsAction.fulfilled, (state, action) => {
        state.reviewsFilmId = action.payload.filmId;
        state.reviews = action.payload.comments;
        state.reviewsLoading = false;
      })
      .addCase(fetchReviewsAction.rejected, (state) => {
        state.reviewsLoading = false;
      })
      .addCase(addReviewAction.fulfilled, (state) => {
        state.isReviewPosting = false;
      })
      .addCase(addReviewAction.rejected, (state) => {
        state.isReviewPosting = false;
      })
      .addCase(addReviewAction.pending, (state) => {
        state.isReviewPosting = true;
      });
  }
});
