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
  Promo = '/promo'
}
