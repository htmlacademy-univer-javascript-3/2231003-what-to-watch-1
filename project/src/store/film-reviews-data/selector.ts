import { State } from '../../types/state';
import { NameSpace } from '../../const';
import { Comment } from '../../types/comment';

export const areReviewsLoading = (state: State): boolean => state[NameSpace.FilmReviewsData].reviewsLoading;
export const getReviews = (state: State): Comment[] => state[NameSpace.FilmReviewsData].reviews;
