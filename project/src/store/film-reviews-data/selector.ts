import { State } from '../../types/state';
import { NameSpace } from '../../const';
import { Comment } from '../../types/comment';

export const getReviewsFilmId = (state: State): number => state[NameSpace.FilmReviewsData].reviewsFilmId;
export const areReviewsLoading = (state: State): boolean => state[NameSpace.FilmReviewsData].reviewsLoading;
export const getReviews = (state: State): Comment[] => state[NameSpace.FilmReviewsData].reviews;
