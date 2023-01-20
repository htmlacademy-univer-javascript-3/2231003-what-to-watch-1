import {name, image, random} from 'faker';
import {Film} from '../types/film';
import {Comment} from '../types/comment';

export const makeFakeFilm = (): Film => ({
  id: 2,
  name: name.title(),
  posterImage: image.imageUrl(),
  previewImage: image.imageUrl(),
  backgroundImage: image.imageUrl(),
  backgroundColor: '#ADFDAC',
  videoLink: 'https://10.react.pages.academy/static/film/video/matrix.mp4',
  previewVideoLink: 'https://10.react.pages.academy/static/film/video/dog.mp4',
  description: random.words(),
  rating: 5,
  scoresCount: 666,
  director: name.title(),
  starring: [name.title()],
  runTime: 54,
  genre: random.word(),
  released: 2007,
  isFavorite: true
});

export const makeFakeComment = (): Comment => ({
  comment: random.words(),
  date: 'Fri Jan 06 2023 17:01:45 GMT+0500',
  id: 1,
  rating: 5,
  user: {
    id: 1,
    name: name.title()
  }
});

