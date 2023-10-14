import movies from '../models/movies';

import { Default400Error, NotFoundError, ForbiddenError } from '../utils/Errors';
import {
  DEFAULT_400_DELETE_MOVIE_ERROR, FORBIDDEN_DELETE_MOVIE_ERROR, NOT_FOUND_MOVIE_ERROR_TEXT,
} from '../utils/constants/ERROR_TEXTS';
import { ERROR_CAST_ERROR } from '../utils/constants/ERROR_CODE';

export const getMovies = (req, res, next) => {
  const { _id } = req.user;

  movies.find({ owner: _id })
    .then((moviesData) => res.send(moviesData))
    .catch(next);
};

export const deleteMovieById = (req, res, next) => {
  const { movieId } = req.params;
  const { _id: userId } = req.user;

  movies.findOne({
    movieId,
    owner: userId,
  })
    .orFail(new NotFoundError(NOT_FOUND_MOVIE_ERROR_TEXT))
    .then((moviesData) => {
      if (userId !== moviesData.owner.toHexString()) {
        next(new ForbiddenError(FORBIDDEN_DELETE_MOVIE_ERROR));
        return;
      }

      movies.deleteOne({ _id: moviesData._id })
        .then(() => res.send({ data: moviesData }))
        .catch(next);
    })
    .catch((err) => {
      if (err === ERROR_CAST_ERROR) {
        next(new Default400Error(DEFAULT_400_DELETE_MOVIE_ERROR));
        return;
      }
      next(err);
    });
};

export const postMovie = (req, res, next) => {
  const userId = req.user._id;

  movies.create({
    ...req.body,
    owner: userId
  })
    .then((movie) => res.status(201)
      .send(movie))
    .catch(next);
};
