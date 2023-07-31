const movies = require('../models/movies');

const NOT_FOUND_MOVIE_ERROR_TEXT = 'Фильм не найден';

const {
  Default400Error, NotFoundError, ForbiddenError,
} = require('../utils/Errors');

const getMovies = (req, res, next) => {
  movies.find({})
    .then((moviesData) => res.send(moviesData))
    .catch(next);
};

const getMovieById = (req, res, next) => {
  const { movieId } = req.params;

  movies.findById(movieId)
    .orFail(new NotFoundError(NOT_FOUND_MOVIE_ERROR_TEXT))
    .then((moviesData) => {
      const { _id } = req.user;

      if (_id !== moviesData.owner.toHexString()) {
        next(new ForbiddenError('Вы пытаетесь удалить фильм другого пользователя'));
        return;
      }

      movies.deleteOne({ _id: movieId })
        .then(() => res.send({ data: moviesData }))
        .catch(next);
    })
    .catch((err) => {
      if (err === 'CastError') {
        next(new Default400Error('Ошибка удаления фильма'));
        return;
      }
      next(err);
    });
};

const postMovie = (req, res, next) => {
  const userId = req.user._id;

  movies.create({ ...req.body, owner: userId })
    .then((movie) => res.status(201).send(movie))
    .catch(next);
};

module.exports = {
  getMovies,
  postMovie,
  getMovieById,
};