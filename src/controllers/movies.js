import movies from '../models/movies';

import { Default400Error, NotFoundError, ForbiddenError } from '../utils/Errors';
import {
  DEFAULT_400_DELETE_MOVIE_ERROR,
  FORBIDDEN_DELETE_MOVIE_ERROR,
  NOT_FOUND_MOVIE_ERROR_TEXT,
} from '../utils/constants/ERROR_TEXTS';

export const getMovies = (req, res, next) => {
  const { _id } = req.user;

  movies.find({ owner: _id })
    .then((moviesData) => res.send(moviesData))
    .catch(next);
};

export const getMovieById = (req, res, next) => {
  const { movieId } = req.params;

  movies.findById(movieId)
    .orFail(new NotFoundError(NOT_FOUND_MOVIE_ERROR_TEXT))
    .then((moviesData) => {
      const { _id } = req.user;

      if (_id !== moviesData.owner.toHexString()) {
        next(new ForbiddenError(FORBIDDEN_DELETE_MOVIE_ERROR));
        return;
      }

      movies.deleteOne({ _id: movieId })
        .then(() => res.send({ data: moviesData }))
        .catch(next);
    })
    .catch((err) => {
      if (err === 'CastError') {
        next(new Default400Error(DEFAULT_400_DELETE_MOVIE_ERROR));
        return;
      }
      next(err);
    });
};

export const postMovie = (req, res, next) => {
  const userId = req.user._id;

  movies.create({ ...req.body, owner: userId })
    .then((movie) => res.status(201).send(movie))
    .catch(next);
};
