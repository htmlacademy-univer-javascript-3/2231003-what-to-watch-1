import {fetchReviewsAction} from "./store/api-actions";

export enum AppRoute {
  SingIn = '/login',
  MyList = '/mylist',
  Root = '/',
  Film = '/films/:id',
  Player = '/player/:id',
  AddReview = '/films/:id/review'
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum Tab {
  Overview = 'Overview',
  Details = 'Details',
  Reviews = 'Reviews',
}

export enum APIRoute {
  Films = '/films',
  Logout = '/logout',
  Login = '/login',
  Reviews = '/comments',
  Similar = '/similar',
  Promo = '/promo',
  MyList = '/mylist',
}

export enum NameSpace {
  AuthInfo = 'AUTH_INFO',
  GeneralData = 'GENERAL_DATA',
  FilmData = 'FILM_DATA',
  FilmReviewsData = 'FILM_REVIEWS_DATA',
  FavoriteData = 'FAVORITE_DATA'
}

export const Months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];


